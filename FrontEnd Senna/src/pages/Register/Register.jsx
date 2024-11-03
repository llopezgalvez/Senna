import React from 'react'
import toast, { Toaster } from 'react-hot-toast';

import './Register.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from '../../components/NavBar/Navbar'
import { useRegister } from '../../hooks/useRegister'
import { CardRegister } from '../../components/Card/CardRegister';

export const Register = () => {

  //Esto es para que al poner un monto se ponga la Q automaticamente, si causa problemas podes borrarlo LUIS

  //---------------------------------------------------------------------

  const [value, setValue] = useState('');

  const formatValue = (val) => {
    // Eliminar los caracteres no numéricos
    let numericValue = val.replace(/[^0-9]/g, '');

    // Si el valor está vacío, devolver una cadena vacía
    if (numericValue.length === 0) {
      return '';
    }
    // Convertir a número entero y formatear con comas
    numericValue = parseInt(numericValue, 10).toLocaleString();

    // Agregar prefijo "Q"
    return `Q${numericValue}`;
  };

  const handleChange = (e) => {
    const inputValue = e.target.value;
    const formattedValue = formatValue(inputValue);
    setValue(formattedValue);
    setFormData((prevData) => (
      {
        ...prevData,
        [e.target.name]: e.target.value
      }
    ))
  };

  //----------------------------------------------------------------------


  const { register, isLoading } = useRegister();
  const [formData, setFormData] = useState(
    {
      name: {
        value: "",
        isValid: false,
        showError: false
      },

      username: {
        value: "",
        isValid: false,
        showError: false
      },

      dpi: {
        value: "",
        isValid: false,
        showError: false
      },

      address: {
        value: "",
        isValid: false,
        showError: false
      },

      phone: {
        value: "",
        isValid: false,
        showError: false
      },

      email: {
        value: "",
        isValid: false,
        showError: false
      },

      password: {
        value: "",
        isValid: false,
        showError: false
      },

      workingName: {
        value: "",
        isValid: false,
        showError: false
      },

      monthlyIncome: {
        value: "",
        isValid: false,
        showError: false
      },

      balance: {
        value: "",
        isValid: false,
        showError: false
      }

    }
  )

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const success = await register(
      formData.name,
      formData.username,
      formData.dpi,
      formData.address,
      formData.phone,
      formData.email,
      formData.password,
      formData.workingName,
      formData.monthlyIncome,
      formData.balance
    );

    if (success) {
      toast.success('Se registró Correctamente!');
    }
  };
  return (
    <>
      <>

        <div className='con'>
          <div class="backgrounds">
            <div class="shapes"></div>
            <div class="shapes"></div>
            <div class="shapes"></div>
            <div class="shapes"></div>
            <div class="shapes"></div>
            <div class="shapes"></div>

          </div>
          <form id='asds' onSubmit={handleSubmit}>
            <h3>CREAR CUENTA</h3>

            <div className="two-column-form">
              <div className="column">
                <input value={formData.name.value} onChange={handleChange} name='name' type="text" placeholder="Nombre" id="name" />
                <input value={formData.email.value} onChange={handleChange} type="text" placeholder="Correo Electronico" id="email" name='email' />
              </div>

              <div className="column">
                <input value={formData.username.value} onChange={handleChange} type="text" placeholder="Usuario" id="username" name='username' />
                <input value={formData.phone.value} onChange={handleChange} type="text" placeholder="Teléfono" id="phone" name='phone' maxLength={8} />
              </div>
            </div>

            <input value={formData.workingName.value} onChange={handleChange} type="text" placeholder="¿Dónde trabaja?" id="whereheworks" name='workingName' />

            <div className="two-column-form">
              <div className="column">
                <input value={formData.dpi.value} onChange={handleChange} type="text" placeholder="DPI" id="dpi" name='dpi' maxLength={13} />
              </div>

              <div className="column">
                <input value={formData.monthlyIncome.value} onChange={handleChange} type="text" placeholder="Ingreso Mensual" id="monthlyIncome" name='monthlyIncome' />
              </div>
            </div>

            <input value={formData.balance.value} onChange={handleChange} type="text" placeholder="¿Con cuanto dinero abrirá su cuenta?" id="balance" name='balance'  />


            <input value={formData.password.value} onChange={handleChange} type="password" placeholder="Contraseña" id="passwordd" name='password' />
            <input value={formData.address.value} onChange={handleChange} type="text" placeholder="Dirección" id="address" name='address' />


            <button className='buton'>Crear Cuenta</button>

          </form>
          <Toaster />

        </div>
        <CardRegister />

      </>
    </>
  )
}
