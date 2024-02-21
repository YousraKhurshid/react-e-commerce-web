import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { storage } from '../utils/FirebaseConfig'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from 'axios';
// import { AppRoute } from '../../App'


function BrandModal({recallData}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [brand, setBrand] = useState("")
    const [Images, setImages] = useState(null)

    const AddBrand = (e) => {
        e.preventDefault();



        const storageRef = ref(storage, `images/${Images.name}`);
        uploadBytes(storageRef, Images).then((snapshot) => {
            getDownloadURL(snapshot.ref)
                .then((url) => {
                    const payload = { brand, Images: url }
                    axios.post('/api/create-brands', payload)
                        .then((json) => {
                            setShow(false);
                            console.log(json.data)
                            recallData(json.data.Brands);
                        })
                        .catch(err => alert(err.message))

                })
                .catch((error) => alert(error.message));
        });

    }

    return (
        <>
            <Button variant="dark shadow" onClick={handleShow}>
                Add Brand
            </Button>

            <Modal show={show} onHide={handleClose} centered backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Add Brand</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <form onSubmit={AddBrand}>
                        <div className="mb-3">
                            <label htmlFor="categoryName" className="form-label">
                                Brand Name
                            </label>
                            <input
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                                type="text"
                                className="form-control"
                                id="categoryName"
                                aria-describedby="emailHelp"
                            />

                        </div>

                        <div className="mb-3">
                            <label htmlFor="formFile" className="form-label">
                               Brand Image
                            </label>
                            <input className="form-control" onChange={(e) => setImages(e.target.files[0])} type="file" id="formFile" />
                        </div>



                        <button type="submit" className="btn btn-warning">
                            Submit
                        </button>
                    </form>


                </Modal.Body>

            </Modal>
        </>
    );
}

export default BrandModal;


// import { useState } from 'react';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import { storage } from '../utils/FirebaseConfig'
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";



// function CategoryModal() {
//     const [show, setShow] = useState(false);

//     const handleClose = () => setShow(false);
//     const handleShow = () => setShow(true);

//     const [categoryName, setcategoryName] = useState("")
//     const [categoryImages, setcategoryImages] = useState(null)

//     const AddCategory = (e) => {
//         e.preventDefault();


//         const storageRef = ref(storage, `images/${categoryImages.name}`);

//         uploadBytes(storageRef, categoryImages).then((snapshot) => {

//             getDownloadURL(snapshot.ref)
//                 .then((url) => {
//                    const payload = {
//                     categoryName,
//                     categoryImages : url
//                    }
//                    console.log(payload)
//                 })

//                 .catch((error) => console.log(error));


//         });

//     }




//     return (
//         <>
//             <Button variant="dark" onClick={handleShow}>
//                 Add Category
//             </Button>

//             <Modal show={show} onHide={handleClose} centered backdrop="static">
//                 <Modal.Header closeButton>
//                     <Modal.Title>Add Category</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>

//                     <form onSubmit={AddCategory}>
//                         <div className="mb-3">
//                             <label htmlFor="categoryName" className="form-label">
//                                 Category Name
//                             </label>
//                             <input
//                                 value={categoryName}
//                                 onChange={(e) => setcategoryName(e.target.value)}
//                                 type="text"
//                                 className="form-control"
//                                 id="categoryName"
//                                 aria-describedby="emailHelp"
//                             />

//                         </div>

//                         <div className="mb-3">
//                             <label htmlFor="formFile" className="form-label">
//                                 Category Image
//                             </label>
//                             <input className="form-control" onChange={(e) => setcategoryImages(e.target.files[0])} type="file" id="formFile" />
//                         </div>



//                         <button type="submit" className="btn btn-warning">
//                             Submit
//                         </button>
//                     </form>


//                 </Modal.Body>

//             </Modal>
//         </>
//     );
// }

// export default CategoryModal;