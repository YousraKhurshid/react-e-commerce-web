import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { storage } from '../utils/FirebaseConfig'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';


function ProductModal({ recallData }) {
    const [show, setShow] = useState(false);
    const [brands, setBrands] = useState([])
    const [category, setCategory] = useState([])
    const [price, setPrice] = useState(0)
    const [productName, setProductName] = useState("")
    const [Images, setImages] = useState([])
    const [desc, setDesc] = useState("")

    const [brandVal, setBrandVal] = useState([])
    const [CategoryVal, setCategoryVal] = useState([])

    const handleClose = () => setShow(false);
    const handleShow = () => {


        axios.get('/api/get-brand').then((json) => {
            setBrandVal(json.data.Brands)
            axios.get('/api/get-all-category').then((json) => {
                setCategoryVal(json.data.Category)
                setShow(true)
            })
        })
    };
    const urlss = []
    const multipleImages = () => Images?.map((val) => {
        const multipleImageReference = ref(storage, `Images/Product/${productName}/${val.name}`);
        return uploadBytes(multipleImageReference, val).then((snapshot) => {
            return getDownloadURL(snapshot.ref).then((url) => {
                urlss.push(url)
                 console.log(urlss)
            }).catch((error) => alert(error.message))
        });
    })


    const AddProduct = (e) => {
        e.preventDefault();
        const Upload = multipleImages()
        Promise.all(Upload)
            .then(() => {
                console.log("multiple images uploaded", urlss)
                const payload = {
                    brands,
                    category,
                    Images: urlss,
                    productName,
                    desc,
                    price
                }
                console.log(payload)
                // })
                axios.post('/api/create-products', payload)
                    .then((json) => {
                        recallData(json.data.Product);
                        setShow(false);
                    })
                    .catch(err => alert(err.message))

                    // })
                    .catch((error) => alert(error.message));
            });

    }




    return (
        <>
            <Button variant="dark shadow" onClick={handleShow}>
                Add Product
            </Button>

            <Modal show={show} onHide={handleClose} centered backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Add Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <form onSubmit={AddProduct}>
                        <div className="mb-3">
                            <label htmlFor="Product Name" className="form-label">
                                Product Name
                            </label>
                            <input
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                                type="text"
                                className="form-control"
                                id="Product-Name"
                                aria-describedby="emailHelp"
                            />

                        </div>

                        <div className="mb-3">
                            <label htmlFor="price" className="form-label">
                                Price
                            </label>
                            <input
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                type="number"
                                className="form-control"
                                id="Product-Name"
                                aria-describedby="emailHelp"
                            />

                        </div>


                        <div className="mb-3">
                            <p>Choose Images</p>
                            <small className="text-secondary">Double Click to delete Images</small>
                            <div className="mt-2 d-flex gap-2 align-items-center">
                                {
                                    Images.map((val, key) =>
                                        <div key={key} className="bg-light border rounded col-md-1" onDoubleClick={() => setImages(Images.filter((img) => img != val))}>
                                            <img style={{ height: '10vh', cursur: 'pointer', objectFit: 'contain' }} className='img-fluid' src={URL.createObjectURL(val)} alt="" />
                                        </div>
                                    )
                                }
                                <label htmlFor="'formFile" style={{ height: '10vh', cursur: 'pointer', width: '10vh' }}
                                    className='col-md-1 d-flex justify-content-center align-items-center border'
                                >+</label>
                            </div>
                            <input className='form-control d-npon' onChange={(e) => setImages([...Images, e.target.files[0]])} type="file" id='formFile' />
                        </div>

                        <Form.Group className="mb-3" >

                            <Form.Label>Brand</Form.Label>
                            <Form.Select aria-label="Please Select a Brand" onChange={(e) => setBrands(e.target.value)}>
                                <option>Please Select a Brand</option>
                                {
                                    brandVal?.map((val, key) => <option key={key} value={val.brand}>{val.brand}</option>)
                                }

                            </Form.Select>
                        </Form.Group>


                        <Form.Group className="mb-3" >

                            <Form.Label>Category</Form.Label>
                            <Form.Select aria-label="Please Select a Category" onChange={(e) => setCategory(e.target.value)}>
                                <option>Please Select a Category</option>
                                {
                                    CategoryVal?.map((val, key) => <option key={key} value={val.categoryName}>{val.categoryName}</option>)
                                }
                            </Form.Select>
                        </Form.Group>
                        <FloatingLabel controlId="floatingTextarea2" label="Description" className='mb-3'>
                            <Form.Control
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                                as="textarea"
                                placeholder="Leave a comment here"
                                style={{ height: '100px' }}
                            />
                        </FloatingLabel>





                        <button type="submit" className="btn btn-warning">
                            Submit
                        </button>
                    </form>
                </Modal.Body>

            </Modal>
        </>
    );
}

export default ProductModal;