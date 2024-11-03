import React from 'react'
import Logout from '../../assets/Cerrar.png'
import Transfers from '../../assets/Transfer.png'
import Home from '../../assets/Home.png'
import deposit from '../../assets/deposit.png'
import { Link } from 'react-router-dom'
import Favorites from '../../assets/Favorite.png'
import './Taskbar.css'

export const Taskbar = () => {
    return (
        <>
            <div className="all">
                <nav class="blocks">
                    <Link to={'/Home'}>
                        <a href="#" class="block">
                            <div class="block__item">
                                <img src={Home} alt="" />
                            </div>
                        </a>
                    </Link>

                    <Link to={'/Transfer'}>
                        <a href="#" class="block">
                            <div class="block__item">
                                <img src={Transfers} alt="" />
                            </div>
                        </a>

                    </Link>

                    <Link to={'/Favorite'}>
                        <a href="#" class="block">
                            <div class="block__item">
                                <img src={Favorites} alt="" />
                            </div>
                        </a>
                    </Link>


                </nav>
            </div>
        </>
    )
}
