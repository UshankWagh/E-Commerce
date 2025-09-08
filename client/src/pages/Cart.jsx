import React, { useEffect, useState } from 'react'
import { Plus, Search } from "lucide-react";
import axios from 'axios';
import toast from 'react-hot-toast';
import CartItemCard from '../components/CartItemCard';

const Cart = ({ auth }) => {

    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {

        const loadData = async () => {

            const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/cartItems/${auth.id}`);

            console.log(res.data);

            if (res.status != 200) return toast.error(res.data.message);

            setCartItems(res.data);
        }
        loadData();

    }, []);

    const updateQuantityHandler = async (cartItemId, updation) => {


        console.log(cartItemId, updation);

        const cartItem = cartItems.find((c) => c._id == cartItemId);

        const quantity = cartItem.quantity + updation;

        let res;
        if (quantity == 0) {
            return deleteCartItemHandler(cartItemId);
        }

        else {
            setCartItems(p => p.map(c => c._id == cartItemId ? { ...c, quantity } : c));

            res = await axios.patch(`${import.meta.env.VITE_SERVER_URL}/cartItems/${cartItem._id}`, { quantity });
        }

        console.log(res.data);

        if (res.status != 200) {
            setCartItems(p => p.map(c => c._id == cartItemId ? { ...c, quantity: (quantity - updation) } : c));
            return toast.error(res.data.message);
        }

        toast.success("Item Updated Successfully");
    }

    const deleteCartItemHandler = async (cartItemId) => {

        setCartItems(p => p.filter(c => c._id != cartItemId));

        const res = await axios.delete(`${import.meta.env.VITE_SERVER_URL}/cartItems/${cartItemId}`);

        console.log(res.data);

        if (res.status != 200) return toast.error(res.data.message);


        toast.success("Item Removed Successfully");
    }

    console.log(cartItems);

    return (
        <div>
            <p className='py-4 text-3xl font-bold font-mono tracking-tight'>Cart</p>
            <div className="list flex flex-col flex-wrap gap-8">
                {
                    cartItems.length ?
                        cartItems.map((cartItem, idx) => <CartItemCard auth={auth} cartItem={cartItem} updateQuantityHandler={updateQuantityHandler} deleteCartItemHandler={deleteCartItemHandler} key={idx} />)
                        :
                        <p>No Cart Items Found</p>
                }
            </div>
        </div>
    )
}

export default Cart
