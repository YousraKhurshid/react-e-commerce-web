import axios from 'axios'
import React from 'react'
import { useEffect, useState } from 'react'
// import { AppRoute } from '../../App'
import CategoryModal from '../components/CategoryModal'
import { AiFillDelete } from 'react-icons/ai'


export default function Category() {

  const [Categories, setCategory] = useState([])

  useEffect(() => {
    axios.get('/api/get-all-category')
      .then((json) => setCategory(json.data.Category))
      .catch((err) => console.log(err))

  }, [])

  const deleteProduct = (categoryName) => {
    console.log(categoryName)
    const payload = {
      categoryName: categoryName
    }

const config = {
  method: 'delete',
  url: '/api/delete-category',
  data: payload
};

    axios(config).then(json => setCategory(json.data.Categories)).catch(err=>console.log(err.message))
  }

  return (
    <div className="container">
      <div className="d-flex shadow-lg justify-content-between align-iten-center bg-danger p-2 my-3 rounded">
        <span className='fs-4 fw-bold text-danger'>Categories</span>
        <CategoryModal recallData={setCategory} />
      </div>

      <div className="container p-5">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Category ID</th>
              <th scope="col">Category Name</th>
              <th scope="col">Category Image</th>
              <th scope="col">Action</th>


            </tr>
          </thead>
          <tbody>
            {
              Categories?.map((val, key) =>

                <tr key={key}>
                  <th scope="row">{val._id}</th>
                  <td>{val.categoryName}</td>
                  <td><img src={val.categoryImages} className='img-fluid' style={{ height: '5vh', objectFit: 'contain' }} /></td>
                  <td>
                    <button className="btn btn-danger shadow mx-1" onClick={() => deleteProduct(val.categoryName)}><AiFillDelete /></button>
                  </td>
                </tr>
              )}

          </tbody>
        </table>

      </div>

    </div>
  )
}
