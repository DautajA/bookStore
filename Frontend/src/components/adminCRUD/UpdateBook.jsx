import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Update = () => {
  const { id } = useParams();
  const nav = useNavigate();

  const [updateBook, setUpdateBook] = useState({
    name: '',
    image: '',
    category: '',
    title: '',
    price: ''
  });

  const [uploadedImage, setUploadedImage] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
     await axios.get(`http://localhost:4001/readOne/${id}`)
        .then((res) => {
          const { name, image, category, title, price } = response.data;
        setUpdateBook((prevItem)=> ({
          ...prevItem,
          name: name || '',
          image: image || '',
          category: category || '',
          title: title || '',
          price: price || ''
        }));
      })
      .catch((error) => {
        console.log('Error fetching data:'+ error);
      })
    };
    fetchBook();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateBook((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  const handlePhoto = (e) => {
    setUpdateBook((prevItem) => ({
      ...prevItem,
      image: e.target.files[0],
    }));
    setUploadedImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(updateBook).forEach(([key, value]) => {
      if (key !== 'image') {
        formData.append(key, value);
      }
    });
    if (updateBook.image instanceof File) {
      formData.append('image', updateBook.image);
    }

    console.log("Data to be sent to the server:", formData);
    // Therritja e apit - update
    await axios.patch(`http://localhost:4001/updateOne/${id}`, formData)
        .then((res) => {
            // Testimi
            console.log(res.data)
            setUpdateBook((prevItem) => ({ ...prevItem, ...res.data }))
            // Kalimi tek home pas update
            nav('/course');
        }).catch((err) => {
            // Nese nuk ndodh update
            console.log("Data not updated " + err)
        })
};

  return (
    <div className="my-5 mt-[80px]">
      <div className="flex flex-wrap">
        <div className="w-full md:w-1/2 px-4">
          <h1 className="text-2xl font-bold">Update</h1>
          <form onSubmit={handleUpdate} encType="multipart/form-data">
            <div className="mb-4">
              <label htmlFor="nameItem" className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                id="nameItem"
                className="border rounded-md p-2 w-full"
                value={updateBook.name}
                onChange={handleChange}
                name="name"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="titletItem" className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <textarea
                id="titleItem"
                rows="3"
                className="border rounded-md p-2 w-full"
                value={updateBook.title}
                onChange={handleChange}
                name="title"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="priceItem" className="block text-sm font-medium text-gray-700 mb-2">
                Price
              </label>
              <input
                type="number"
                id="priceItem"
                className="border rounded-md p-2 w-full"
                value={updateBook.price}
                onChange={handleChange}
                name="price"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="categoryItem" className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <input
                type="text"
                id="categoryItem"
                className="border rounded-md p-2 w-full"
                value={updateBook.category}
                onChange={handleChange}
                name="category"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="ImageItem" className="block text-sm font-medium text-gray-700 mb-2">
                Photo
              </label>
              <input
                type="file"
                accept=".jpeg, .png, .jpg"
                onChange={handlePhoto}
                className="border rounded-md p-2"
              />
            </div>
            <button
              type="submit"
              value="Update"
              className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition duration-200"
            >
              Update
            </button>
          </form>
        </div>
        <div className="w-full md:w-1/2 px-4">
          <h1 className="text-2xl font-bold">Preview Image</h1>
          <div className="mt-4">
            {uploadedImage ? (
              <img
                src={uploadedImage}
                alt="Uploaded"
                className="w-full h-auto rounded-md"
              />
            ) : (
              <img
                src={`http://localhost:4001/images/${updateBook.image}`}
                alt="Uploaded"
                className="w-full h-auto rounded-md"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Update;

