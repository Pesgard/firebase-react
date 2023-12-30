import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

const Create = () => {
  //Configuracion de Hooks
  const [ description, setDescription ] = useState('')
  const [ stock, setStock ] = useState(0)
  const navigate = useNavigate()

  const productsCollection = collection(db, "products")

  const store = async (e) => {
    e.preventDefault()
    await addDoc(productsCollection, { description: description , stock: stock } )
    navigate('/') 
    //console.log(e.target[0].value)
  }

  const succesAlert = () => {
    MySwal.fire({
      title: 'Producto creado',
      text: 'El producto ha sido creado exitosamente.',
      icon: 'success'
    }
    )           
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <h1>Create product</h1>
          <form onSubmit={store}>
            <div className='mb-3'>
              <label className='form-label'>Description</label>
              <input 
                value={description} 
                onChange={ (e) => setDescription(e.target.value)}
                type = "text"
                className='form-control'
                />
            </div>

            <div className='mb-3'>
              <label className='form-label'>Stock</label>
              <input 
                value={stock} 
                onChange={ (e) => setStock(e.target.value)}
                type = "number"
                className='form-control'
              />
            </div>
            <button type='submit' className='btn btn-primary' onClick={succesAlert}>Store</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Create