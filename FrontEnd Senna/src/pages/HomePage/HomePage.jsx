import { useEffect } from 'react'
import { Change } from '../Change/Change'
import { CardHome } from '../../components/CardHome/CardHome'
import { useViewBalance } from '../../hooks/useViewBalance'
import './HomePage.css'

export const HomePage = () => {
    const { isLoading, viewBalance, balanceData } = useViewBalance();

    useEffect(() => {
        viewBalance(); // Fetch balance data on component mount
    }, []); // Empty dependency array to run once on mount

    return (
        <>
            <div class="backgroundss">
                <div class="shapes"></div>
                <div class="shapes"></div>
                <div class="shapes"></div>
                <div class="shapes"></div>
                <div class="shapes"></div>
                <div class="shapes"></div>
            </div>
{/*CUANDO SE PRESENTE; SE QUITA EL COMENTARIO */}
            {/*<Change />*/}
            <div id='Home'>
                <p>SENNA | Tu banco de confianza</p>
                <h1 id='Welcome'>BIENVENIDO </h1>
                <h3 id='balance'>{isLoading ? 'Cargando...' : balanceData ? `${balanceData.msg}` : 'No se pudo cargar el balance'}</h3>
            </div>
            <CardHome />

        </>
    )
}
