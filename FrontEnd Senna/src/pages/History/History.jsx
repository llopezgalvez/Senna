import React, { useEffect } from 'react'
import { useViewAccountHistory } from '../../hooks/useViewMyHistory'
import './History.css'
import { CardsF } from '../../components/Cards/CardsF'

export const History = () => {
    const { isLoading, accountHistory, viewAccountHistory } = useViewAccountHistory()

    useEffect(() => {
        viewAccountHistory()
    }, [])

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
            <div className="history">
            
                <p>{isLoading ? 'Cargando...' : accountHistory ? ` ${accountHistory.username}, estos son tus últimos movimientos:` : 'No se pudo cargar el historial de la cuenta'}</p>
                    {accountHistory && (
                        <div className="account-history">
                            
                            <table>
                                <thead>
                                    <tr>
                                        <th>Fecha</th>
                                        <th>Tipo</th>
                                        <th>Descripción</th>
                                        <th>Monto</th>
                                        <th>Cuenta Transferencia</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {accountHistory.accountNumber.transfer.map((transfer, index) => (
                                        <tr key={index}>
                                            <td>{transfer.date}</td>
                                            <td>Transferencia</td>
                                            <td>{transfer.description}</td>
                                            <td>{transfer.amount}</td>
                                            <td>{transfer.transferAccount}</td>
                                        </tr>
                                    ))}
                                    {accountHistory.accountNumber.purchase.map((purchase, index) => (
                                        <tr key={index}>
                                            <td>{purchase.date}</td>
                                            <td>Compra</td>
                                            <td>{purchase.product.name} - {purchase.product.description}</td>
                                            <td>{purchase.product.price}</td>
                                            <td>N/A</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            <CardsF />
        </>
    )
}
