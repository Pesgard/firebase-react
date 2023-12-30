import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { collection, getDocs, getDoc,deleteDoc, doc } from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)


const Show = () => {
    // Configuracion de Hooks
    const [products, setProducts] = useState( [] )

    // Referenciar la DB de firestore
    const productsCollection = collection(db, "products")

    // Funcion para mostrar los documentos de la DB
    const getProducts = async () => {
        const data = await getDocs(productsCollection)
        //console.log(data.docs)
        setProducts(
            data.docs.map((doc) => ({...doc.data(), id:doc.id}))
        )
        console.log(products)
    }


    // Funcion para eliminer los documentos de la DB
    const deleteProduct = async (id) => {
        const productDoc = doc(db, "products", id) 
        await deleteDoc(productDoc)
        getProducts()
    }

    // Funcion de confirmacion para sweet alert
    const confirmDelete = (id) => {
        MySwal.fire({
            title:'Delete this product?',
            text: 'You wont able to remove this action',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, i delete it'
        }).then((result) => {
            if (result.isConfirmed){
                deleteProduct(id)
                Swal.fire(
                    'Deleted',
                    'Your file has been deleted',
                    'success'
                )
            }
        })
    }

    // Usar UseEffect
    useEffect( () => {
        getProducts()
        // eslint-disable-next-line
    }, [] )

    // Retornar la vista de nuestro componente
    return (
        <>
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    <div className='d-grid gap-4'>
                        <Link to = "/create" className = 'btn btn-primary mt-2 mb-2'>Create</Link>
                    </div>

                    <table className='table table-dark table-hover'>
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Stock</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
    
                        <tbody>
                            { products.map( (product)  => (
                                <tr key={product.id}>
                                    <td>{product.description}</td>
                                    <td>{product.stock}</td>
                                    <td>
                                        {/* Edit Button */}
                                        <Link to = {`/edit/${product.id}`} className = 'btn btn-light'><i className="fa-solid fa-pen-to-square"></i></Link>
                                        {/* Delete Button */}
                                        <button onClick={() => confirmDelete(product.id) } className='btn btn-danger ms-2'><i className="fa-solid fa-trash"></i></button>
                                    </td>
                                </tr>
    
                            ) ) }
    
                        </tbody>
    
                    </table>
                </div>
            </div>
        </div>
        </>
      )
    }
    
export default Show