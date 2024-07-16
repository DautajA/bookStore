import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cards from './Cards';

const CardCategory = ({ selectedCategory }) => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:4001/books/category/${selectedCategory}`);
                setBooks(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching books:', error);
                setError('Error fetching books. Please try again later.');
                setLoading(false);
            }
        };

        fetchBooks();
    }, [selectedCategory]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {books.map(book => (
                <div key={book._id} className="p-2">
                    <Cards
                        name={book.author}
                        image={book.image}
                        category={book.category}
                        title={book.title}
                        price={book.price}
                        _id={book._id}
                    />
                </div>
            ))}
        </div>
    );
};

export default CardCategory;




