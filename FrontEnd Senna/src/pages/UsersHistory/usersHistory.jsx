import React, { useEffect } from 'react'
import { useViewAllUsers } from '../../hooks/useViewAllUsers.jsx'
import './usersHistory.css'
import { CardHistory } from '../../components/Card/CardHistory.jsx'
export const UsersHistory = () => {
    const { isLoading, allUsers, viewAllUsers } = useViewAllUsers([])

    useEffect(() => {
        viewAllUsers()
    }, [])

    return (
        <>
            <div className="backgroundsss">
                <div className="shapess"></div>
                <div className="shapess"></div>
                <div className="shapess"></div>
                <div className="shapess"></div>
                <div className="shapess"></div>
                <div className="shapess"></div>
            </div>
            <div className="history">
                <p>{isLoading ? 'Cargando...' : allUsers ? 'Estos son los últimos movimientos de todos los usuarios:' : 'No se pudo cargar el historial de la cuenta'}</p>
                {allUsers && (
                    <div className="account-history">
                        <table>
                            <thead>
                                <tr>
                                    <th>Username</th>
                                    <th>Fecha</th>
                                    <th>Tipo</th>
                                    <th>Descripción</th>
                                    <th>Monto</th>
                                    <th>Cuenta Transferencia</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allUsers.map((user, userIndex) => (
                                    <>
                                        {user.accountNumber && user.accountNumber.transfer.map((transfer, transferIndex) => (
                                            <tr key={`transfer-${userIndex}-${transferIndex}`}>
                                                <td>{user.username}</td>
                                                <td>{transfer.date}</td>
                                                <td>Transferencia</td>
                                                <td>{transfer.description}</td>
                                                <td>{transfer.amount}</td>
                                                <td>{transfer.transferAccount}</td>
                                            </tr>
                                        ))}
                                        {user.accountNumber && user.accountNumber.purchase.map((purchase, purchaseIndex) => (
                                            <tr key={`purchase-${userIndex}-${purchaseIndex}`}>
                                                <td>{user.username}</td>
                                                <td>{purchase.date}</td>
                                                <td>Compra</td>
                                                <td>{purchase.product.name} - {purchase.product.description}</td>
                                                <td>{purchase.product.price}</td>
                                                <td>N/A</td>
                                            </tr>
                                        ))}
                                    </>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            <CardHistory />
        </>
    )
}
