import React from 'react'

export const CardRegister = () => {
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
                            <a href="/ProductAdmin" class="contCard_link">


                                <div class="ag-courses-item_title">
                                    Promociones
                                </div>


                                <span class="ag-courses-item_date">
                                    Promociones con nuestro Banco
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
