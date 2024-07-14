import React from 'react'

function Cards({name, image,category,title, price, _id}) {
  return (
    <>
    <div className='mt-4'>
    <div className="card w-full bg-base-100 shadow-xl hover:scale-105 duration-200 dark:bg-slate-900 dark:text-white dark:border">
  <figure><img className="h-[300px] w-[100%]"src={`http://localhost:4001/images/${image}`} alt="..." /></figure>
  <div className="card-body h-[460px]">
    <h2 className="card-title">
      {name}
    </h2>
    <div className="badge badge-secondary text-center">{category}</div>
    <p>{title}</p>
    <div className="card-actions justify-between">
      <div className="badge p-3 badge-outline">{price}</div> 
      <div className="badge p-3 badge-outline hover:bg-pink-500 hover:text-white duration-500"><a href={`/readOne/${_id}`}>Read more</a></div>
    </div>
  </div>
</div>
    </div>
    </>
  )
}

export default Cards;



