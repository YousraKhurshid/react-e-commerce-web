import React from 'react'
import UserCard from '../components/UserCard'

export default function topProducts() {
  const data = [
    {
      "_id": "64de4e775bd7eca248724100",
      "productName": "Realme C25",
      "productPrice": "30,000",
      "productImage": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ95H4-mycenIAeyvWw3vUzfKnELhZdHIZ5xA&usqp=CAU",
      "__v": 0
    },
    {
      "_id": "64de4e775bd7eca248724100",
      "productName": "Neclace",
      "productPrice": "600",
      "productImage": "https://gemspavilion.com/wp-content/uploads/2021/02/1NS1957D-scaled.jpg",
      "__v": 0
    },
    {
      "_id": "64de4e775bd7eca248724100",
      "productName": "Blush",
      "productPrice": "400",
      "productImage": "https://weheartthis.com/wp-content/uploads/2023/05/best-peach-blush-01.jpg",
      "__v": 0
    },
    {
      "_id": "64de4e775bd7eca248724100",
      "productName": "Spaghetti",
      "productPrice": "1,600",
      "productImage": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaojNNHIEM_-aZhj2SLE6r8cOeFBgCEtbxVw&usqp=CAU",
      "__v": 0
    },
    {
      "_id": "64de4e775bd7eca248724100",
      "productName": "Garara Dress",
      "productPrice": "5,500",
      "productImage": "https://images-eu.ssl-images-amazon.com/images/I/81Poo2OckdL._AC_SR462,693_.jpg",
      "__v": 0
    },
    {
      "_id": "64de4e775bd7eca248724100",
      "productName": "Lipstick",
      "productPrice": "700",
      "productImage": "https://m.media-amazon.com/images/I/51tG0m6aRsL._AC_UF1000,1000_QL80_.jpg",
      "__v": 0
    },

  ]

  return (
    <div className="container my-5">
      <div className="text-center">
        <h2>Top Selling Products</h2>
        <small className="text-secondary">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum delectus magnam doloribus voluptatibus possimus corrupti aliquid itaque harum debitis ipsa!</small>
      </div>

      <div className="row my-5 gap-5 col-md-12">
        {
          data.map((val, key) => <UserCard key={key} image={val.productImage} name={val.productName} price={val.productPrice} />)
        }

      </div>
    </div>
  )
}
