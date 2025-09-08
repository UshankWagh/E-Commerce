import React, { useEffect, useState } from 'react'
import { Plus, Search } from "lucide-react";
import ItemCard from '../components/ItemCard';
import axios from 'axios';
import toast from 'react-hot-toast';
import Loader from '../components/Loader';

const Stores = ({ auth }) => {

    const [items, setItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [priceFrom, setpriceFrom] = useState(0);
    const [priceTo, setpriceTo] = useState(100000);

    useEffect(() => {

        const fetchCategories = async () => {

            const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/items/categories`);

            if (res.status != 200) return toast.error(res.data.message);

            setCategories(res.data);
        }

        fetchCategories();
        loadData();

    }, []);

    const loadData = async () => {

        const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/items/filtered-items`, { name, category, priceRange: [priceFrom, priceTo] });

        console.log(res.data);

        if (res.status != 200) return toast.error(res.data.message);

        setItems(res.data);
    }

    console.log(categories);

    return (
        <div>
            <p className='py-4 text-3xl font-bold font-mono tracking-tight'>Stores</p>
            <div className='content py-5'>
                <div className='filters mb-16 flex gap-6'>
                    <div className='inp'>
                        <label className="input input-bordered w-72 flex items-center gap-2">
                            Name :
                            <input type="text" className="grow " placeholder="Item Name" onChange={(e) => setName(e.target.value)} value={name} />
                        </label>
                    </div>
                    <div className="inp flex justify-start">
                        <select className="select select-bordered w-30 text-base" defaultValue={null} onChange={(e) => { setCategory(e.target.value) }} required>
                            <option disabled value={null}>Select Category</option>
                            {
                                categories?.map((c, idx) => {
                                    return <option value={c._id} key={idx}>{c.name}</option>
                                })
                            }
                        </select>
                    </div>
                    <div className='inp'>
                        <label className="input input-bordered w-72 flex items-center gap-2">
                            Price :
                            <input type="number" className="grow " placeholder="From" onChange={(e) => setpriceFrom(e.target.value)} value={priceFrom} />
                        </label>
                        <label className="input input-bordered w-72 flex items-center gap-2">
                            <input type="number" className="grow " placeholder="To" onChange={(e) => setpriceTo(e.target.value)} value={priceTo} />
                        </label>
                    </div>
                    <button className="px-10 text-base btn btn-primary" onClick={loadData}>Search<Search /></button>
                </div>

            </div>
            <div className="list flex flex-wrap gap-8">
                {
                    items.length ?
                        items.map((item, idx) => <ItemCard item={item} key={idx} auth={auth} />)
                        :
                        <p>No Items Found</p>
                }
            </div>
        </div>
    )
}

export default Stores
