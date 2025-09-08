import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router';

const SignUp = ({ handleLogin }) => {

    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState(null);

    const navigate = useNavigate();

    const signUpHandler = async (e) => {
        e.preventDefault();

        const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/users/signup`, { name, username, password, role });

        // here first check if passsword is invalid, then navigate
        console.log("signup .. ", res.data);

        const auth = res.data.auth;

        if (res.data.success) {

            handleLogin(res.data.auth);

            if (auth.role == 1) {
                // navigate("/search-shop");
            }
            else if (auth.role == 2) {
                navigate("/customer/items");
            }
        }
        else {
            toast.error(res.data.message);
            console.log(loginRes.data);
        }
    }

    return (
        <div className='signup h-svh'>
            <div className="px-8 py-10 m-auto rounded-xl w-96 shadow-xl">
                <h3 className="font-bold text-3xl">Register</h3>
                <form className="form mt-9 mb-6 flex flex-col gap-4" onSubmit={signUpHandler}>
                    <div className="inp">
                        <select className="select select-bordered w-full max-w-xs text-base" defaultValue={null} onChange={(e) => { setRole((e.target.value)) }} required>
                            <option disabled value={null}>Select Role</option>
                            <option value={1}>Admin</option>
                            <option value={2}>Customer</option>
                        </select>
                    </div>
                    <div className='inp min-w-60'>
                        <label className="input input-bordered flex items-center gap-2">
                            Name :
                            <input type="text" className="grow " placeholder="Name" value={name} onChange={(e) => { setName(e.target.value) }} required />
                        </label>
                    </div>
                    <div className='inp min-w-60'>
                        <label className="input input-bordered flex items-center gap-2">
                            Username :
                            <input type="text" className="grow " placeholder="Username" value={username} onChange={(e) => { setUsername(e.target.value) }} required />
                        </label>
                    </div>
                    <div className='inp min-w-60'>
                        <label className="input input-bordered flex items-center gap-2">
                            Password :
                            <input type="password" className="grow" placeholder="Password" value={password} onChange={(e) => { setPassword(e.target.value) }} required />
                        </label>
                    </div>
                    <button id='add-store-btn' className="mt-4 text-base btn btn-secondary">Sign Up</button>
                    <p>
                        Already have an account?
                        <a onClick={() => navigate("/login")} className='text-blue-600 cursor-pointer'> Login</a>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default SignUp

