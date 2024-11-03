import React from 'react'
import {toast, Toaster} from 'react-hot-toast'
import { useState } from 'react'
import { useAddProduct } from '../../hooks/useAddProduct'
import { CardProduct } from '../../components/Card/CardProduct'
import './ProductAdmin.css'

export const ProductAdmin = () => {
    const { addProduct, isLoading } = useAddProduct()
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: ''
    })

    const handleChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { name, description, price } = formData
        const success = await addProduct(name, description, price)
        if (success) {
            setFormData({ name: '', description: '', price: '' })
        }
    }

    return (
        <>
            <div className="backgrounds">
                <div className="shapes"></div>
                <div className="shapes"></div>
                <div className="shapes"></div>
                <div className="shapes"></div>
                <div className="shapes"></div>
                <div className="shapes"></div>
            </div>
            <form id='formss' onSubmit={handleSubmit}>
                <h2 id='addP'>Agregar Producto</h2>
                <div>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder='Nombre'
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        placeholder='Descripción'
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        id="price"
                        name="price"
                        placeholder='Precio'
                        value={formData.price}
                        onChange={handleChange}
                    />
                </div>
                <button className='buton' type="submit" disabled={isLoading}>
                    {isLoading ? 'Adding...' : 'Agregar Producto'}
                </button>
            </form>
            <CardProduct />
            <Toaster />
        </>
    )
}
