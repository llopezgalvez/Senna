import { Link } from 'react-router-dom'
import './CardHome.css'
export const CardHome = () => {
    return (

        <div className='conts'>

            <div class="ag-format-container">
                <div class="ag-courses_box">

                    <div className="longButtonContainer">
                        <a href="/History" className="longButton_link">
                            <div className="longButton_title">
                                Historial
                            </div>
                            <span className="longButton_description">
                                Podras ver tu historial bancario
                            </span>
                        </a>
                    </div>
                    <div class="contCard">

                        <a href="/Transfer" class="contCard_link">


                            <div class="ag-courses-item_title">
                                Transferencia
                            </div>


                            <span class="ag-courses-item_date">
                                Transfiere dinero a tus conocidos
                            </span>
                        </a>

                    </div>
                    <div class="contCard">
                        <a href="/Favorite" class="contCard_link">


                            <div class="ag-courses-item_title">
                                Favoritos
                            </div>


                            <span class="ag-courses-item_date">
                                Ve y agregar a tus favoritos!
                            </span>
                        </a>
                    </div>

                    <div class="contCard">
                        <a href="/Product" class="contCard_link">


                            <div class="ag-courses-item_title">
                                Promociones
                            </div>


                            <span class="ag-courses-item_date">
                                Promociones con nuestro Banco
                            </span>
                        </a>
                    </div>


                </div>
            </div>

        </div>

    )
}
