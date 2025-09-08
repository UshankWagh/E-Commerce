import React, { useEffect, useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { IndianRupee } from 'lucide-react';

const ItemCard = ({ item, auth }) => {

    // useEffect(() => {

    // }, []);

    const addToCartHandler = async () => {

        const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/cartItems/${auth.id}`, { itemId: item._id });

        console.log(res.data);

        if (res.status != 200) return toast.error(res.data.message);

        toast.success("Item Added Successfully");
    }

    console.log(item);


    return (
        <>

            {/* <div className="card bg-base-100 min-w-96 max-w-96 shadow-xl">
            <div className="card-body flex justify-between">
                <div className="max-h max-h-30 overflow-hidden">
                    <div className="font-bold text-2xl">{item.name}</div>
                </div>
                <div className='py-4'>
                    <div className="text-base opacity-50">{item.description}</div>
                    <p className="py-1 font-bold text-xl">
                        &#8377;{item.price}
                    </p>
                </div>
                <div className="">
                    <button className="btn btn-primary" onClick={() => { addToCartHandler() }}>Add To Cart</button>
                </div>
            </div>
        </div> */}



            <div className="card bg-base-100 w-80 max-h-fit shadow-xl overflow-hidden">
                <div className='h-56 overflow-hidden'>
                    <img
                        className='w-full'
                        src={item.imageUrl || "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"}
                        alt={item.name} />
                </div>
                <div className="card-body">
                    <div className="item-head flex justify-between mt-2">
                        <h2 className="card-title">
                            {item.name}
                            <div className="badge badge-secondary">NEW</div>
                        </h2>
                        <div className='flex'><IndianRupee /> {item.price}</div>
                    </div>
                    <div className='py-4'>
                        <div className="text-base opacity-65">{item.description}</div>
                    </div>
                    <div className="card-actions my-2">
                        {/* <button className="btn btn-success p-3">Buy Now</button> */}
                        <button className="btn btn-primary p-3" onClick={() => addToCartHandler()}>Add to Cart</button>
                    </div>
                    <div className="card-actions justify-end">
                        <div className="badge badge-ghost">{item.category.name}</div>
                        {/* <div className="badge badge-outline">Products</div> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ItemCard;
