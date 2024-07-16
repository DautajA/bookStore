import React, { useEffect, useState } from 'react';
import Cards from './Cards';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Course() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBook = async () => {
        await axios.get('http://localhost:4001/course')
            .then((res) => {
                // Test
                console.log(res)
                // Vendosja e te dhenave tek array
                setBooks(res.data)
            }).catch((err) => {
                // Nese nuk shfaqen te dhenat
                console.log('Data not showing ' + err)
            })
    };
    // therritja e funksionit
    fetchBook()
}, []);

  return (
    <>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 py-0">
        <br /><br /><br /><br />
        <div className=" items-center justify-center text-center">
          <h1 className="text-2xl md:text-4xl">
            We're delighted to have you <span className="text-pink-500">Here! :)</span>
          </h1>
          <p className="mt-10">
            Our courses cover a wide range of topics, from technology and programming to business
            and management, social sciences, arts, and many more. Each course is structured to
            provide detailed and practical learning, including lectures, written materials, videos,
            and practical exercises. By joining our courses, you become part of a global community
            of learners. This gives you the opportunity to collaborate and share experiences with
            others who have similar interests. <br />
            <span className="font-semibold">
              Join us and start your journey into the vast world of knowledge.
            </span>
          </p>
          <Link to="/">
            <button className="m-6 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300">
              Back
            </button>
          </Link>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-4">
          {[...books].reverse().map((book, index) => (
            <div key={index} className="p-2">
              <Cards {...book}/>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Course;
