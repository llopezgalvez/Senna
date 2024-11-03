import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useViewProfile } from '../../hooks/useViewProfile';
import { Offcanvas } from 'react-bootstrap'
import './Navbar.css'



export const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [showOffcanvas, setShowOffcanvas] = useState(false)
  const [userInfo, setUserInfo] = useState(null)
  const { isLoading, viewProfile } = useViewProfile()


  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/');
  };

  const handleProfile = async () => {
    const response = await viewProfile()
    if (response) {
      setUserInfo(response.data)
      setShowOffcanvas(true)
    }
  }


  const closeOffcanvas = () => {
    setShowOffcanvas(false)
  }

  return (
    <>

      <div class="wrapper">
        <div class="logo"><a href="Home">SENNA</a></div>


        <ul className="nav-links">
          <label htmlFor="close-btn" className="btn close-btn"><i className="fas fa-times"></i></label>
          {isAuthenticated ? (
            <>
              <li><a href="#" onClick={handleProfile}> Mi perfil</a></li>
              <li><a href="#" onClick={handleLogout}> Cerrar sesión</a></li>

            </>
          ) : (
            <>
              {/*              <li><a href="Register">Crear una cuenta</a></li>*/}
              <li><a href="/">Iniciar sesión</a></li>
            </>
          )}
        </ul>
      </div >


      <Offcanvas show={showOffcanvas} onHide={closeOffcanvas} className="offcanvas-custom">
        <Offcanvas.Header closeButton>
          <div className="Myprofile">
            <Offcanvas.Title>Mi Perfil</Offcanvas.Title>
          </div>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {isLoading ? (
            <p>Cargando...</p>
          ) : userInfo ? (
            <>
              <p className='title-infoProfile'>Tu número de cuenta:</p>
              <p className='subtitle-infoProfile'>{userInfo.profile.accountNumber.accountNumber}</p>
              <hr />
              <div className="cont1">
                <p className='title-infoProfile'>Nombre:</p>
                <p className='subtitle-infoProfile'>{userInfo.profile.name}</p>
              </div>
              <div className="cont2">
                <p className='title-infoProfile'>DPI:</p>
                <p className='subtitle-infoProfile'>{userInfo.profile.dpi}</p>
              </div>
              <p className='title-infoProfile'>Dirección:</p>
              <p className='subtitle-infoProfile'>{userInfo.profile.address}</p>
              <p className='title-infoProfile'>Teléfono:</p>
              <p className='subtitle-infoProfile'>{userInfo.profile.phone}</p>
              <p className='title-infoProfile'>Email:</p>
              <p className='subtitle-infoProfile'>{userInfo.profile.email}</p>
              <p className='title-infoProfile'>Profesión:</p>
              <p className='subtitle-infoProfile'>{userInfo.profile.workingName}</p>
              <p className='title-infoProfile'>Ingresos mensuales:</p>
              <p className='subtitle-infoProfile'>Q.{userInfo.profile.monthlyIncome}</p>

              <br />
              <hr />
              <div className='container-updatesProfile'>
                <li><a href='UpdateProfile'>Actualizar perfil</a></li>

              </div>
            </>
          ) : (
            <p>No se pudo cargar la información del usuario</p>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}
