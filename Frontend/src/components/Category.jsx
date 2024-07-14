import React,{useEffect} from 'react';
import { useParams } from 'react-router-dom';
import CardCategory from './CardCategory';

function Category() {
    const { category } = useParams();
    
    return (
        <div className="category-page mt-[70px]">
            <h1 className="text-2xl font-bold mb-4">{category} Books</h1>
            <CardCategory selectedCategory={category} />
        </div>
    );
}

export default Category;



