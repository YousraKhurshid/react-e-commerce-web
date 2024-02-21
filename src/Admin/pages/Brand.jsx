import axios from 'axios'
import React from 'react'
import { useEffect, useState } from 'react'
// import { AppRoute } from '../../App'
import BrandModal from '../components/BrandModal'
import { AiFillDelete } from 'react-icons/ai'


export default function Brand() {

  const [brand, setBrand] = useState([])

  useEffect(() => {
    axios.get('/api//get-brand')
      .then((json) => setBrand(json.data.Brands))
      .catch((err) => console.log(err))

  }, [])

  const deleteProduct = (brand) => {
    console.log(brand)
    const payload = {
      brand: brand
    }

const config = {
  method: 'delete',
  url: '/api/delete-brand',
  data: payload
};

    axios(config).then(json => setBrand(json.data.brand)).catch(err=>console.log(err.message))
  }

  return (
    <div className="container">
      <div className="d-flex shadow-lg justify-content-between align-iten-center bg-danger p-2 my-3 rounded">
        <span className='fs-4 fw-bold text-danger'>Brands</span>
        <BrandModal recallData={setBrand} />
      </div>

      <div className="container p-5">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Brand ID</th>
              <th scope="col">Brand Name</th>
              <th scope="col">Brand Image</th>
              <th scope="col">Action</th>


            </tr>
          </thead>
          <tbody>
            {
              brand?.map((val, key) =>

                <tr key={key}>
                  <th scope="row">{val._id}</th>
                  <td>{val.brand}</td>
                  <td><img src={val.Images} className='img-fluid' style={{ height: '5vh', objectFit: 'contain' }} /></td>
                  <td>
                    <button className="btn btn-danger shadow mx-1" onClick={() => deleteProduct(val.brand)}><AiFillDelete /></button>
                  </td>
                </tr>
              )}

          </tbody>
        </table>

      </div>

    </div>
  )
}
