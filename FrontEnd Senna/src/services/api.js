import axios from "axios";

const apiClient = axios.create({
    baseURL: 'http://localhost:2880',
    timeout: 5000,

});

apiClient.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.token = token
        }
        return config
    },
    err => {
        return Promise.reject(err)
    }
)


//Usuario
export const registerReq = async (data) => {
    try {
        const register = await apiClient.post('/user/register', data);
        return register;
    } catch (err) {
        return {
            error: true,
            err
        };
    }
}

export const loginReq = async (user) => {
    try {
        const login = await apiClient.post('/user/login', user);
        return login;
    } catch (err) {
        return {
            error: true,
            err
        };
    }
}

export const viewMyProfile = async () => {
    try {
        const profile = await apiClient.get('/user/viewProfile')
        return profile
    } catch (error) {
        return {
            error: true,
            error
        }
    }
}

export const viewMyBalance = async () => {
    try {
        const balance = await apiClient.get('/user/viewMyBalance')
        return balance
    } catch (error) {
        return {
            error: true,
            error
        }
    }
}

export const viewMyHistory = async () => {
    try {
        const history = await apiClient.get('/user/viewMyAccount')
        return history
    } catch (error) {
        return {
            error: true, 
            error
        }
    }
}


export const updateMyProfile = async (data) => {
    try {
        const profile = await apiClient.put('/user/updateMyProfile', data)
        return profile
    } catch (error) {
        return {
            error: true,
            error
        }
    }
}

//Deposito

export const newDepositReq = async (deposit) => {
    try {
        const newDeposit = await apiClient.post('/deposit/newDeposit', deposit)
        return newDeposit;
    } catch (err) {
        return {
            error: true,
            err
        };
    }
}

//Transferencia
export const transferReq = async (transfer) => {
    try {
        const trans = await apiClient.post('/transfer/transfer', transfer)
        return trans
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}

//Favorite
export const addFavoriteReq = async (fav) => {
    try {
        const favorite = await apiClient.post('/favorite/addFavorite', fav);
        return favorite;
    } catch (err) {
        return {
            error: true,
            err
        };
    }
}

export const getFavoriteReq = async () => {
    try {
        const favorite = await apiClient.get('/favorite/listFavorites')
        console.log('DESDE API.JS', favorite.data)
        return favorite
    } catch (err) {
        console.error('Error en la solicitud de favoritos:', err)
        return {
            error: true,
            err
        }
    }
}

export const deleteFavoriteReq = async (fav) => {
    try {
        const favoriteDel = await apiClient.delete(`/favorite/deleteFavorite/${fav}`)
        return favoriteDel
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}

export const updateFavoriteReq = async (id, fav) => {
    try {
        const favoriteUpdate = await apiClient.put(`/favorite/updateFavorite/${id}`, fav)
        return favoriteUpdate
    } catch (error) {
        return {
            error: true,
            err
        }
    }
}


//Product 
export const getProductReq = async()=>{
    try {
        const product = await apiClient.get('/product/listProduct')
        return product;
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}

export const addProductReq = async (product) => {
    try {
        const addProd = await apiClient.post('/product/addProduct ', product);
        return addProd;
    } catch (err) {
        return {
            error: true,
            err
        };
    }
}



//Purchase

export const buyProductReq = async(idProduct)=>{
    try {
        const body = {idProduct}
        const product = await apiClient.post('/purchase/buyProduct', body)
        return product;
    } catch (err) {
        return {
            error: true, 
            err
        }
    }
}

export const viewAllUser = async() => {
    try {
        const allUsers = await apiClient.get('/user/viewAllUsers')
        return allUsers
    } catch (error) {
        return {
            error: true,
            err
        }
    }
}