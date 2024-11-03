import { Link } from 'react-router-dom'
import './Cards.css'
export const CardsF = () => {
    return (

        <div className='conts'>

            <div class="ag-format-container">
                <div class="ag-courses_boxs">

                    <div class="contCards">

                        <a href="/Transfer" class="contCard_link">


                            <div class="ag-courses-item_title">
                                Transferencia
                            </div>


                            <span class="ag-courses-item_date">
                                Transfiere dinero a tus conocidos
                            </span>
                        </a>

                    </div>

                    <div class="contCards">
                        <a href="/Product" class="contCard_link">


                            <div class="ag-courses-item_title">
                                Promociones
                            </div>


                            <span class="ag-courses-item_date">
                                Promociones con nuestro Banco
                            </span>
                        </a>
                    </div>

                    <div class="contCards">

                        <a href="/Home" class="contCard_link">


                            <div class="ag-courses-item_title">
                                Volver al Inicio
                            </div>
                        </a>

                    </div>


                </div>
            </div>

        </div>

    )
}
