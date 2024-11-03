import User from './user.model.js' // Import the User model
import { encrypt, checkPassword } from '../utils/validator.js' // Import encryption and password checking functions
import { generateJwt } from '../utils/jwt.js' // Import JWT generation function
import Account from '../Account/account.model.js'


// ------------------------- FUNCTIONS FOR USER -------------------------
// Function to register
export let register = async (req, res) => {
    try {
        const generateUniqueAccountNumber = async () => {
            let accountNumber;
            let accountExists = true;

            while (accountExists) {
                accountNumber = Math.floor(Math.random() * 10 ** 20).toString().padStart(20, '0');
                accountExists = await Account.findOne({ accountNumber });
            }

            return accountNumber;
        }

        let data = req.body
        data.ROL = 'CLIENT'
        if (!data) return res.status(409).send({ msg: 'Data is required' })

       

        // Check for existing records in the database
        let usernameExists = await User.findOne({ username: data.username })
        let dpiExists = await User.findOne({ dpi: data.dpi })
        let emailExists = await User.findOne({ email: data.email })
        let phoneExists = await User.findOne({ phone: data.phone })

        // Send conflict response if any field already exists
        if (usernameExists) return res.status(409).send({ msg: 'Username registered with a user' })
        if (dpiExists) return res.status(409).send({ msg: 'DPI registered with a user' })
        if (emailExists) return res.status(409).send({ msg: 'Email registered with a user' })
        if (phoneExists) return res.status(409).send({ msg: 'Phone registered with a user' })
        if (data.monthlyIncome < 100) return res.status(409).send({ msg: 'Your monthly income must be greater than 100 quetzales.' })
        if (data.phone.length < 8) return res.status(409).send({ msg: 'Please enter a valid phone number' })
        if (data.dpi.length < 13) return res.status(409).send({ msg: 'Please enter a valid dpi number' })

        // Encrypt the password
        data.password = await encrypt(data.password)

        // Generate a unique account number
        let accountNumber = await generateUniqueAccountNumber()

        // Create the account
        let account = new Account({
            accountNumber: accountNumber,
            balance: data.balance
        })

        // Save account
        await account.save()

        // Associate account with user
        data.accountNumber = account._id

        // Create and save the new user
        let user = new User(data)
        await user.save()
        return res.status(201).send({ msg: 'User created successfully' })
    } catch (error) {
        return res.status(500).send({ msg: 'Error in function register', error })
    }
}

// Function to login
export let login = async (req, res) => {
    try {
        let { username, password } = req.body
        if (!username || !password) return res.status(409).send({ msg: 'Username and password are required' })

        // Find the user by username
        let user = await User.findOne({ username })

        // Check password validity and generate token if valid
        if (user && (await checkPassword(password, user.password))) {
            let loggedUser = {
                uid: user._id,
                ROL: user.ROL
            }
            let token = await generateJwt(loggedUser)
            return res.send({ msg: `Welcome ${user.name}`, loggedUser, token })
        }

        // Send unauthorized response if credentials are invalid
        return res.status(401).send({ msg: 'Invalid credentials' })
    } catch (error) {
        return res.status(500).send({ msg: 'Error in function login', error })
    }
}

// Function to view my profile
export let viewProfile = async (req, res) => {
    try {
        let userId = req.user._id
        let profile = await User.findById(userId).select('-_id -password -ROL').populate({ path: 'accountNumber', select: '-_id accountNumber' })
        if (!profile) return res.status(409).send({ msg: 'You are not logged in' })
        return res.status(200).send({ msg: `Hi ${profile.username}`, profile })
    } catch (error) {
        return res.status(500).send({ msg: 'Error in function viewProfile' })
    }
}

// Functio to view my balance
export const viewMyBalance = async (req, res) => {
    try {
        let author = req.user._id
        let profile = await User.findById(author).select('username accountNumber').populate({ path: 'accountNumber', select: '-_id balance' })
        if (!profile) return res.status(404).send({ msg: 'You need to be logged to view your balance' })
        return res.status(200).send({ msg: `${profile.username}, tu saldo es de Q.${profile.accountNumber.balance}.00` })
    } catch (error) {
        return res.status(500).send({ msg: 'Error in function viewBalance', error: error.message })
    }
}

// Function to format date
const formatDate = (date) => {
    return new Intl.DateTimeFormat('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(date))
}

// Function to view my account and history
export const viewMyAccount = async (req, res) => {
    try {
        const author = req.user._id
        
        const profile = await User.findById(author)
            .select('-_id username accountNumber')
            .populate({
                path: 'accountNumber',
                select: '-_id accountNumber balance transfer purchase',
                populate: [{
                    path: 'transfer',
                    select: 'amount date description transferAccount',
                    populate: {
                        path: 'transferAccount',
                        select: '-_id accountNumber'
                    }
                },{
                    path: 'purchase',
                    select: '-_id product date',
                    populate: {
                        path: 'product',
                        select: '-_id name price description'
                    }
                }],
            })

        if (!profile) {
            return res.status(409).send({ msg: 'Inicia sesion para poder ver tu historial.' })
        }

        // Formatear las fechas de los depósitos
        const formattedProfile = profile.toObject()
        if (formattedProfile.accountNumber && formattedProfile.accountNumber.deposit) {
            formattedProfile.accountNumber.deposit = formattedProfile.accountNumber.deposit.map(deposit => {
                deposit.date = formatDate(deposit.date)
                return deposit
            })
        }

        return res.status(200).send({
            msg: `Hola ${profile.username}, estos son tus últimos movimientos:`,
            profile: formattedProfile
        })
    } catch (error) {
        return res.status(500).send({ msg: 'Error in function viewMyAccount', error: error.message })
    }
}

// Function to update my password
export let updateMyPassword = async (req, res) => {
    try {
        let userId = req.user._id
        let profile = await User.findById(userId)
        let { passwordOld, passwordNew, passwordConfirm } = req.body

        if (!profile) return res.status(409).send({ msg: 'You are not logged in' })

        // Verificar que la contraseña antigua es correcta
        if (!await checkPassword(passwordOld, profile.password))
            return res.status(403).send({ msg: 'The old password is incorrect' })

        // Verificar que la nueva contraseña no sea la misma que la antigua
        if (passwordOld === passwordNew) return res.status(403).send({ msg: 'Your new password is the same as your old password' })

        // Verificar que la nueva contraseña y la confirmación sean iguales
        if (passwordNew !== passwordConfirm) return res.status(403).send({ msg: 'The new password and the confirmation password do not match' })

        // Validar la nueva contraseña con la expresión regular
        let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        if (!passwordRegex.test(passwordNew)) {
            return res.status(409).send({ msg: 'Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character.' })
        }

        // Encriptar la nueva contraseña
        let encryptedPassword = await encrypt(passwordNew)

        // Actualizar la contraseña en la base de datos
        await User.findOneAndUpdate({ _id: userId }, { password: encryptedPassword })

        return res.status(200).send({ msg: 'Your password has been updated' })
    } catch (error) {
        return res.status(500).send({ msg: 'Error in function updateMyPassword', error })
    }
}

// Function to update my profile
export const updateMyProfile = async (req, res) => {
    try {
        let author = req.user._id
        let data = req.body
        let profile = await User.findById(author)
        if (!profile) return res.status(404).send({ msg: 'You need to be logged in to update your profile' })

        if (data.dpi || data.password || data.name) return res.status(409).send({ msg: 'You cant update your DPI, name and password here' })

        if (data.username !== profile.username) {
            let usernameExists = await User.findOne({ username: data.username })
            if (usernameExists) return res.status(409).send({ msg: 'Username registered with a user' })
        }

        if (data.email !== profile.email) {
            let emailExists = await User.findOne({ email: data.email })
            if (emailExists) return res.status(409).send({ msg: 'Email registered with a user' })
        }

        if (data.phone !== profile.phone) {
            let phoneExists = await User.findOne({ phone: data.phone })
            if (phoneExists) return res.status(409).send({ msg: 'Phone registered with a user' })
        }

        if (data.monthlyIncome < 100) {
            return res.status(409).send({ msg: 'Your monthly income must be greater than 100 quetzales.' })
        }

        if (data.phone && data.phone.length < 8) {
            return res.status(409).send({ msg: 'Please enter a valid phone number' })
        }

        let updatedProfile = await User.findByIdAndUpdate(author, data).select('-_id -password -ROL -dpi -name').populate({ path: 'accountNumber', select: '-_id accountNumber' })
        return res.status(200).send({ msg: 'Your profile has been updated', updatedProfile })
    } catch (error) {
        return res.status(500).send({ msg: 'Error in function updateMyProfile', error: error.message })
    }
}

// Function to delete my profile
export const deleteMyProfile = async (req, res) => {
    try {
        const author = req.user._id
        const profile = await User.findById(author)
        
        if (!profile) {
            return res.status(404).send({ msg: 'You need to be logged in to delete your profile' })
        }

        const accountToDelete = await Account.findById(profile.accountNumber)
        if (!accountToDelete) {
            return res.status(409).send({ msg: 'Account not found' })
        }

        // Delete user profile
        const profileToDelete = await User.findByIdAndDelete(author).select('-_id -password')

        // Delete associated account
        const accountDeleted = await Account.findByIdAndDelete(profile.accountNumber)

        return res.status(200).send({ 
            msg: `Your profile and associated account have been deleted`, 
            profile: profileToDelete, 
            account: accountDeleted 
        })
    } catch (error) {
        return res.status(500).send({ msg: 'Error in function deleteMyProfile', error: error.message })
    }
}

// ------------------------- FUNCTIONS FOR ADMIN -------------------------

export const updateUser = async (req, res) => {
    try {
        let idUser = req.params.id
        let data = req.body
        let userProfile = await User.findById(idUser)
        if (userProfile.ROL === 'ADMIN') return res.status(409).send({ msg: 'You cant update to a user ADMIN' })
        if (data.dpi) return res.status(409).send({ msg: 'You cant update the dpi of a user' })
        if (data.password) return res.status(409).send({ msg: 'You cant update the password of a user' })
        if (data.username !== userProfile.username) {
            let usernameExists = await User.findOne({ username: data.username })
            if (usernameExists) return res.status(409).send({ msg: 'Username registered with a user' })
        }

        if (data.email !== userProfile.email) {
            let emailExists = await User.findOne({ email: data.email })
            if (emailExists) return res.status(409).send({ msg: 'Email registered with a user' })
        }

        if (data.phone !== userProfile.phone) {
            let phoneExists = await User.findOne({ phone: data.phone })
            if (phoneExists) return res.status(409).send({ msg: 'Phone registered with a user' })
        }

        if (data.monthlyIncome < 100) {
            return res.status(409).send({ msg: 'Your monthly income must be greater than 100 quetzales.' })
        }

        if (data.phone && data.phone.length < 8) {
            return res.status(409).send({ msg: 'Please enter a valid phone number' })
        }
        let updateUser = await User.findByIdAndUpdate(idUser, data, { new: true }).populate({ path: 'accountNumber', select: '-_id accountNumber' })
        return res.status(200).send({ msg: 'Profile has been updated', updateUser })
    } catch (error) {
        return res.status(500).send({ msg: 'Error in function updateUser', error: error.message })
    }
}

export const viewAllUsers = async (req, res) => {
    try {
        let users = await User.find({ ROL: 'CLIENT' }).select('-password').populate({ path: 'accountNumber', select: '-_id accountNumber' })
        if (!users) return res.status(404).send({ msg: 'There are no users registered' })
        return res.status(200).send({ msg: 'This are all users', users })
    } catch (error) {
        return res.status(500).send({ msg: 'Error in function viewAllUsers', error: error.message })
    }
}

export const viewAllAccounts = async (req, res) => {
    try {
        const profiles = await User.find()
            .select('-_id username accountNumber')
            .populate({
                path: 'accountNumber',
                select: '-_id accountNumber balance transfer purchase',
                populate: [{
                    path: 'transfer',
                    select: 'amount date description transferAccount',
                    populate: {
                        path: 'transferAccount',
                        select: '-_id accountNumber'
                    }
                },{
                    path: 'purchase',
                    select: '-_id product date',
                    populate: {
                        path: 'product',
                        select: '-_id name price description'
                    }
                }],
            })

        if (!profiles) {
            return res.status(409).send({ msg: 'No hay perfiles para mostrar' })
        }

        return res.status(200).send({
            msg: `Estos son todos los usuarios con su historial bancario`,
            profile: profiles
        })
    } catch (error) {
        return res.status(500).send({ msg: 'Error in function viewMyAccount', error: error.message })
    }
}