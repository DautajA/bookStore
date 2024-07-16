import React ,{useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import CardCategory from './CardCategory';
import axios from 'axios';
import Cards from './Cards';
function Category() {
    const { category } = useParams();
    const [books, setBooks] = useState([]);
        useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://localhost:4001/books');
                setBooks(response.data); 
                console.log(response.data)
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBooks();
    }, [category]); 
    
    return (
        <div className="category-page mt-[70px]">
            <h1 className="text-2xl font-bold mb-4">{category} Books</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                             {books.filter(book=>book.category ===category).map((book) => (
                     <Cards key={book._id} {...book} />
                 ))}
           </div>
            {/* <CardCategory selectedCategory={category} /> */}
        </div>
    );
}

export default Category;

// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios'; // Assuming you use axios for HTTP requests
// import CardCategory from './CardCategory';

// function Category() {
//     const { category } = useParams();
//     const [books, setBooks] = useState([]);

//     useEffect(() => {
//         const fetchBooks = async () => {
//             try {
//                 const response = await axios.get(`/api/books/category/${category}`);
//                 setBooks(response.data); // Assuming response.data is an array of books
//             } catch (error) {
//                 console.error('Error fetching books:', error);
//                 // Handle error state if needed
//             }
//         };

//         fetchBooks();
//     }, [category]); // Run effect whenever category changes

//     return (
//         <div className="category-page mt-[70px]">
//             <h1 className="text-2xl font-bold mb-4">{category} Books</h1>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 {books.map((book) => (
//                     <CardCategory key={book._id} book={book} />
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default Category;

