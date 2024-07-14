import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import backgroundImg from "../../assets/createBackground.jpg";
const CreateBook = () => {
  const navigate = useNavigate();
  const [newBook, setNewBook] = useState({
    name: "",
    image: "",
    category: "",
    title: "",
    price: "",
  });
  const [uploadedImage, setUploadedImage] = useState(null);
  const handleChange = (e) => {
    setNewBook({ ...newBook, [e.target.name]: e.target.value });
  };

  const handlePhoto = (e) => {
    setNewBook({ ...newBook, image: e.target.files[0] });
    setUploadedImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(newBook).forEach(([key, value]) => {
      formData.append(key, value);
    });
    await axios
      .post("http://localhost:4001/create", formData)
      .then((res) => {
        console.log(res.data);
        navigate("/course");
      })
      .catch((err) => {
        console.log("Error server, Item not created: " + err);
      });
  };

  return (
    <div
      className="relative"
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <div className="container mt-[70px] mx-auto p-4 bg-semitransparent rounded-lg shadow-lg">
        <h2 className="text-2xl my-[30px] text-white ">Create a New Book</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label className="block text-white">Name</label>
            <input
              type="text"
              name="name"
              value={newBook.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded text-black"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-white">Image</label>
            <input
              type="file"
              name="image"
              accept=".jpeg, .png, .jpg"
              onChange={handlePhoto}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-white">Category</label>
            <input
              type="text"
              name="category"
              value={newBook.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded text-black"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-white">Title</label>
            <textarea
              name="title"
              value={newBook.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded text-black"
              required
              rows="4"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white">Price</label>
            <input
              type="number"
              name="price"
              value={newBook.price}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded text-black"
              required
            />
          </div>
          <button
            type="submit"
            value="Create"
            className="bg-pink-500 text-white px-4 py-2 rounded"
          >
            Add Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBook;
