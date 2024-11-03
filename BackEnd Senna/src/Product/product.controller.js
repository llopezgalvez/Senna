// mchuquiej-2021101
'use strict'
import User from '../User/user.model.js'
import Product from './product.model.js';
import Account from '../Account/account.model.js'

//AGREGAR PRODUCTOS
export const addProduct = async (req, res) => {
    try {
        const data = req.body;
        if (!data) return res.status(400).send({ message: 'The data was not found.' });

        const { name } = data;
        if (!name) return res.status(400).send({ message: 'Product name is required.' });

        //VERIFICAR SI EL PRODUCTO YA EXISTE
        const existingProduct = await Product.findOne({ name });
        if (existingProduct) {
            return res.status(400).send({ message: 'Product with this name already exists.' });
        }

        //SI NO EXISTE, SE GUARDA EL PRODUCTO.
        const product = new Product(data);
        await product.save();
        return res.send({ message: 'Product saved successfully.' });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error adding product.' });
    }
};


//ACTUALIZAR PRODUCTOS
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params
        const data = req.body
        if (!id || !data) return res.status(400).send({ message: 'Missing data or product ID.' })
        const existingProduct = await Product.findById(id)
        if (!existingProduct) return res.status(404).send({ message: 'Product not found.' })
        const updatedProduct = await Product.findByIdAndUpdate(id, data, { new: true })
        return res.send({ message: 'Product successfully updated.', updatedProduct })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error when saving the product.' })
    }
}


//ELIMINAR PRODUCTOS
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) return res.status(400).send({ message: 'Product ID is required.' })
        const existingProduct = await Product.findById(id)
        if (!existingProduct) return res.status(404).send({ message: 'Product not found.' })
        await Product.findByIdAndDelete(id)
        return res.send({ message: 'Product successfully eliminated.' });
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error deleting product.' })
    }
}

//LISTAR PRODUCTOS
export const listProduct = async (req, res) => {
    try {
        const products = await Product.find()
        if (products.length === 0) return res.status(404).send({ message: 'No products found.' })
        return res.send({ message: 'Products found.', products })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error listing products.' })
    }
}

//Comprar producto 
/*export const buyProduct = async (req, res) => {
    try {
        const { id } = req.user;
        const { price } = req.body; // supongo que el precio del producto viene en el cuerpo de la solicitud

        const user = await User.findOne({ _id: id });
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        const account = await Account.findOne({ _id: user.accountNumber });
        if (!account) {
            return res.status(404).send({ message: 'Account not found' });
        }

        if (account.balance < price) {
            return res.status(402).send({ message: 'Insufficient funds' });
        }

        const newBalance = account.balance - price;
        await Account.findOneAndUpdate({ _id: account._id }, { $set: { balance: newBalance } });

        res.send({ message: 'Product purchased successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error during purchase', error: err });
    }
};*/
// OBTENER PRODUCTO POR ID
export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).send({ message: 'Product ID is required.' });

        const product = await Product.findById(id);
        if (!product) return res.status(404).send({ message: 'Product not found.' });

        return res.send({ message: 'Product found.', product });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error getting product.' });
    }
};

