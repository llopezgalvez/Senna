import React from 'react'
import { CardHomeAdmin } from '../../components/CardHome/CardHomeAdmin'
import './HomePageAdmin.css'

export const HomePageAdmin = () => {
  return (
    <>
      <div class="backgrounds" >
        <div class="shapes"></div>
        <div class="shapes"></div>
        <div class="shapes"></div>
        <div class="shapes"></div>
        <div class="shapes"></div>
        <div class="shapes"></div>

      </div >
      <div id='Homes'>
        <p>SENNA | Administrador</p>
        <h1 id='Welcome'>BIENVENIDO </h1>

      </div>
      <CardHomeAdmin />
    </>
  )
}
