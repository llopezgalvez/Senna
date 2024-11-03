import React from 'react'
import toast, { Toaster } from 'react-hot-toast'
import LogoSenna from '../../assets/LogoSenna.png'
import './Login.css'
import { useLogin } from '../../hooks/useLogin'
import { useState } from 'react'

export const Login = ({ setIsAuthenticated }) => {
  const { login, isLoading } = useLogin()
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })

  const handleChange = (e) => {
    setFormData((prevData) => (
      {
        ...prevData,
        [e.target.name]: e.target.value
      }
    ))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(formData.username, formData.password);
    if (success) {
      setIsAuthenticated(true);
      setTimeout(() => {
        if (formData.username === 'ADMINB' && formData.password === 'Adminb4!') {
          window.location.href = "/HomeAdmin";
        } else {
          window.location.href = "/Home";
        }
      }, 1000);
    }
  };

  return (
    <div className='con'>
      <div className="backgrounds">
        <div className="shapes"></div>
        <div className="shapes"></div>
        <div className="shapes"></div>
        <div className="shapes"></div>
        <div className="shapes"></div>
        <div className="shapes"></div>
      </div>
      <form id='from' onSubmit={handleSubmit}>
        <div className="Image">
          <img src={LogoSenna} alt="" />
        </div>
        <h3>INICIAR SESION</h3>
        <input onChange={handleChange} value={formData.username} type="text" placeholder="Username" id="username" name='username' />
        <input value={formData.password} onChange={handleChange} name="password" type="password" placeholder="Contraseña" id="password" />
        <button className='buton'>{isLoading ? 'Iniciando...' : 'Iniciar Sesión'}</button>
      </form>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          success: {
            duration: 4000,
            style: {
              background: '#4caf50',
              color: '#fff',
              borderRadius: '10px',
              padding: '20px',
              fontSize: '18px',
              textAlign: 'center',
              boxShadow: '0px 4px 6px rgba(0,0,0,0.3)',
            },
            icon: '🎉',
            ariaProps: {
              role: 'alert',
              'aria-live': 'assertive',
            },
          },
          error: {
            duration: 5000,
            style: {
              background: '#f44336',
              color: '#fff',
              borderRadius: '10px',
              padding: '20px',
              fontSize: '18px',
              textAlign: 'center',
              boxShadow: '0px 4px 6px rgba(0,0,0,0.3)',
            },
            icon: '❌',
            ariaProps: {
              role: 'alert',
              'aria-live': 'assertive',
            },
          },
          loading: {
            duration: 0,
            style: {
              background: '#2196f3',
              color: '#fff',
              borderRadius: '10px',
              padding: '20px',
              fontSize: '18px',
              textAlign: 'center',
              boxShadow: '0px 4px 6px rgba(0,0,0,0.3)',
            },
            ariaProps: {
              role: 'alert',
              'aria-live': 'assertive',
            },
          },
        }}
      />
    </div>
  )
}
