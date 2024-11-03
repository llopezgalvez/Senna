import React from 'react'
import './CardHomeAdmin.css'

export const CardHomeAdmin = () => {
    return (
        <>
            <div className='conts'>

                <div class="ag-format-container">
                    <div class="ag-courses_box">


                        <div class="contCard">

                            <a href="/Register" class="contCard_link">


                                <div class="ag-courses-item_title">
                                    Crear Cuenta
                                </div>


                                <span class="ag-courses-item_date">
                                    Crear cuenta para un nuevo usuario
                                </span>
                            </a>

                        </div>
                        <div class="contCard">

                            <a href="/Deposit" class="contCard_link">


                                <div class="ag-courses-item_title">
                                    Depositar
                                </div>


                                <span class="ag-courses-item_date">
                                    Depositar a otra cuenta
                                </span>
                            </a>

                        </div>

                        <div class="contCard">
                            <a href="/ProductAdmin" class="contCard_link">


                                <div class="ag-courses-item_title">
                                    Productos
                                </div>


                                <span class="ag-courses-item_date">
                                    Agregar y ver los productos
                                </span>
                            </a>
                        </div>
                        <div className="longButtonContainer">
                        <a href="/AllUsers" className="longButton_link">
                            <div className="longButton_title">
                                Historial
                            </div>
                            <span className="longButton_description">
                            Mira el historial de todos los usuarios
                            </span>
                        </a>
                    </div>


                    </div>
                </div>
            </div>


        </>
    )
}
