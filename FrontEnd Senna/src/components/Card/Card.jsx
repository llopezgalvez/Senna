import { useEffect, useState } from 'react';
import { useProduct } from '../../hooks/useProduct';
import { useBuyProduct } from '../../hooks/useBuyProduct';
import Swal from 'sweetalert2';
import './Card.css';

export const Card = () => {
    const [selectedProductId, setSelectedProductId] = useState(null);
    const { products, fetchError, isLoading, fetchProducts } = useProduct();
    const { buyProduct } = useBuyProduct();

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleBuyClick = async (product) => {
        try {
            console.log("Product ID:", product._id);
            const result = await Swal.fire({
                title: '¿Quieres comprar este producto?',
                text: `Producto: ${product.name}\nPrecio: ${product.price}`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sí, comprar!',
                cancelButtonText: 'No, cancelar',
                background: '#333', // Fondo negro
                color: '#fff', // Letras claras
                confirmButtonColor: '#4caf50', // Color del botón de confirmación
                cancelButtonColor: '#f44336', // Color del botón de cancelación
                customClass: {
                    popup: 'swal2-dark', // Clase personalizada para el popup
                }
            });

            if (result.isConfirmed) {
                setSelectedProductId(product._id);  // Guardar el ID del producto seleccionado
                await buyProduct(product._id);
                Swal.fire({
                    title: 'Compra exitosa!',
                    text: `Has comprado ${product.name}.`,
                    icon: 'success',
                    background: '#333', // Fondo negro
                    color: '#fff', // Letras claras
                    confirmButtonColor: '#4caf50', // Color del botón de confirmación
                    customClass: {
                        popup: 'swal2-dark', // Clase personalizada para el popup
                    }
                });
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: 'Error!',
                text: 'Hubo un problema al realizar la compra.',
                icon: 'error',
                background: '#333', // Fondo negro
                color: '#fff', // Letras claras
                confirmButtonColor: '#f44336', // Color del botón de confirmación
                customClass: {
                    popup: 'swal2-dark', // Clase personalizada para el popup
                }
            });
        }
    };

    return (
        <div>
            <div className="ag-format-container">
                <div className="ag-courses_box">
                    {products.map((product, index) => (
                        <div className="ag-courses_item" key={index}>
                            <a href="#" onClick={(e) => {
                                e.preventDefault();
                                handleBuyClick(product);
                            }} className="ag-courses-item_link">
                                Ver Producto
                                <div className="ag-courses-item_bg"></div>
                                <div className="ag-courses-item_title">
                                    {product.name}
                                </div>
                                <div className="ag-courses-item_Description">
                                    {product.description}
                                </div>
                                <span className="ag-courses-item_date">
                                    Precio: {product.price}
                                </span>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
