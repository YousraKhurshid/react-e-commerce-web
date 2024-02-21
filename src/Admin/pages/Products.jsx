import React, { useEffect, useState } from 'react'
import ProductModal from '../components/ProductModal'
import axios from 'axios'
// import { AppRoute } from '../../App'
import { AiFillDelete } from 'react-icons/ai'

export default function Products() {

    const [Product, setProduct] = useState([])

    useEffect(() => {
        axios.get('/api/get-all-products')
            .then((json) => setProduct(json.data.Product))
            .catch((err) => console.log(err))

    }, [])

    const DeleteProduct = (productName) => {
        console.log(productName)
        const payload = {
            productName: productName
        }

        const config = {
            method: 'delete',
            url: '/api/delete-product',
            data: payload
        };

        axios(config).then(json => setProduct(json.data.Product)).catch(err => console.log(err.message))
    }

    return (
        <div className="container">
            <div className="d-flex justify-content-between shadow-lg align-items-center bg-danger p-2 my-3 rounded">
                <span className='fs-4 fw-bold text-white'>Products</span>
                <ProductModal recallData={setProduct} />
            </div>

            <div className="container p-5">
                <table className="table ">
                    <thead >
                        <tr>
                            <th scope="col">Product ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Category</th>
                            <th scope="col">Brand</th>
                            <th scope="col">Product Description</th>
                            <th scope="col">Price</th>
                            <th scope="col">Image</th>
                            <th scope="col">Actions</th>




                        </tr>
                    </thead>
                    <tbody>
                        {
                            Product?.map((val, key) =>
                                <tr key={key}>
                                    <th scope="row">{val._id}</th>
                                    <td>{val.productName}</td>
                                    <td>{val.category}</td>
                                    <td>{val.brand}</td>
                                    <td>{val.description}</td>
                                    <td>{val.price}</td>
                                    <td><img src={val.Images} className='img-fluid d-flex justify-content-center' style={{ height: '8vh', objectFit: 'contain' }} alt="" srcSet="" /></td>
                                    <td>
                                        <button className="btn btn-danger shadow mx-1" onClick={() => DeleteProduct(val.productName)}><AiFillDelete /></button>
                                    </td>
                                </tr>)
                        }



                    </tbody>
                </table>

            </div>
        </div>
    )
}