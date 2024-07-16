import React, { useState, useEffect } from 'react';
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Cards from './Cards';

function Freebook() {
  const [books, setBooks]=useState([])
  useEffect(() =>{
   const fetchBooks = async() => {
     try {
       const res= await axios.get("http://localhost:4001/course");
       const data = res.data.filter((book)=> book.category ==="Free");
       console.log(data);
       setBooks(data)
     } catch (error) {
       console.log(error)
     }
   }
   fetchBooks();
  },[])

    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 0,
        responsive: [
          {
            // responsive jane sm,md,lg,xl,2xl
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      };


  return (
    <>
     <div className='max-w-screen-2xl container mx-auto md:px-20 px-4'>
      <div>
      <h1 className='font-semibold text-xl pb-2'>Free Offered Courses</h1>
      <p className='items-center justify-center text-center'>We offer a wide range of free courses to help individuals expand their knowledge and skills in various fields. These courses are designed to be accessible and beneficial to everyone, regardless of their level of experience or areas of interest.</p>
      </div>
     <div>
     <Slider {...settings}>
        {books.map((book)=>(
           <div key={book._id} className="p-2">
           <Cards name={book.name}
                  image={book.image}
                  category={book.category}
                  title={book.title}
                  price={book.price} />
             </div>
        ))}
      </Slider>
     </div>
     </div>
    </>
  )
}


export default Freebook;



