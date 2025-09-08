import React, { useEffect, useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';

// image

const CartItemCard = ({ auth, cartItem, updateQuantityHandler, deleteCartItemHandler }) => {

    // useEffect(() => {

    // }, []);

    const addToCartHandler = async () => {

        const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/cartItems/${auth.id}`, { itemId: item._id });

        console.log(res.data);

        if (res.status != 200) return toast.error(res.data.message);

        toast.success("Item Added to cart");
    }



    console.log(cartItem);


    return (
        <div className="card card-side bg-base-100 min-w-96 shadow-xl">
            {/* <figure className='min-h-full max-h-full w-72 overflow-hidden'>
                <img
                    src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Movie" />
            </figure> */}
            <div className="card-body flex-row items-center justify-between">
                <div className="item-dets">

                    <div className="max-h max-h-30 overflow-hidden">
                        <div className="font-bold text-2xl">{cartItem.item.name}</div>
                    </div>
                    <div className='py-4'>
                        <div className="text-base opacity-50">{cartItem.item.description}</div>
                        <p className="py-1 font-bold text-xl">
                            &#8377;{cartItem.item.price}
                        </p>
                        {/* <div className="py-1 text-base flex justify-start items-center gap-2">
                    </div> */}
                    </div>
                </div>
                <div className='flex items-center gap-2'>
                    <button className="btn btn-circle font-bold text-xl" onClick={() => { updateQuantityHandler(cartItem._id, -1) }}>-</button>
                    <span className="px-4 py-3 rounded-lg bg-gray-100 w-11" >{cartItem.quantity}</span>
                    <button className="btn btn-circle font-bold text-xl" onClick={() => { updateQuantityHandler(cartItem._id, 1) }}>+</button>
                </div>
                <div className="">
                    <button className="btn btn-error" onClick={() => { deleteCartItemHandler(cartItem._id) }}>Remove</button>
                </div>
            </div>
        </div>
    )
}

export default CartItemCard;
