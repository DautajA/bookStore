import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const DetailItem = () => {
  const { id } = useParams();
  const nav = useNavigate();
  const [book, setBook] = useState({});

  useEffect(() => {
    const fetchBook = async () => {
      await axios.get('http://localhost:4001/readOne/' + id)
        .then((res) => {
          console.log(res)
          setBook(res.data)
        }).catch((err) => {
          console.log('Data not showing ' + err)
        })
    };
    // therritja e funksionit
    fetchBook()
  }, []);

  const handleDelete = async (id) => {
    await axios.delete('http://localhost:4001/deleteOne/' + id)
      .then(res => {
        nav('/course')
      }).catch(err => {
        console.log("Error:" + err)
      })
  }
  return (
    <div className="my-5 mt-[80px]">
    <div className="flex flex-wrap">
      <div className="w-full md:w-1/2 px-[70px]">
        <h1 className="text-2xl font-bold">Data</h1>
        <div className="my-[100px]">
        <h2>Title : {book.name}</h2>
        <p>Category : {book.category}</p><br />
        <p>Description : {book.title}</p><br />
        <p>Price : {book.price}</p>
        </div>
        <div className="space-x-2">
          <button
            className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition duration-200"
            onClick={() => nav(`/update/${book._id}`)}
          >
            Update
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200"
            onClick={() => handleDelete(book._id)}
          >
            Delete
          </button>
        </div>
      </div>
      <div className="w-full md:w-1/2 px-4">
        <h1 className="text-2xl font-bold">Photo</h1>
        <img
          src={`http://localhost:4001/images/${book.image}`}
          alt='Uploaded'
          className='w-full h-auto rounded-md'
        />
      </div>
    </div>
  </div>
  );
};

export default DetailItem;
