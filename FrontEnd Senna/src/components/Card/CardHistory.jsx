import React from 'react'

export const CardHistory = () => {
    return (
        <div>
            <div className='conts'>

                <div class="ag-format-container">
                    <div class="ag-courses_boxs">

                        <div class="contCards">
                            <a href="/Deposit" class="contCard_link">


                                <div class="ag-courses-item_title">
                                    Depositar
                                </div>


                                <span class="ag-courses-item_date">
                                    Depositar a otra cuenta
                                </span>
                            </a>
                        </div>

                        <div class="contCards">
                            <a href="/Register" class="contCard_link">


                                <div class="ag-courses-item_title">
                                    Crear Cuenta
                                </div>


                                <span class="ag-courses-item_date">
                                    Crear cuenta para un usuario
                                </span>
                            </a>
                        </div>
                        <div class="contCards">
                            <a href="/ProductAdmin" class="contCard_link">


                                <div class="ag-courses-item_title">
                                    Promociones
                                </div>


                                <span class="ag-courses-item_date">
                                    Agrega promociones para nuestro banco
                                </span>
                            </a>
                        </div>

                        <div class="contCards">

                            <a href="/HomeAdmin" class="contCard_link">


                                <div class="ag-courses-item_title">
                                    Volver al Inicio
                                </div>
                            </a>

                        </div>


                    </div>
                </div>

            </div>

        </div>
    )
}
