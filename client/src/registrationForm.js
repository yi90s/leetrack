import axios from 'axios';
import React, { useState } from 'react';

function RegistrationForm(){
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post("http://172.22.118.166:4000/auth/register", formData);
            console.log(response.data);
        }catch(error){
            console.error('Error:', error);
        }
    }

    return(
        <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <div>
            <label>Username</label>
            <input 
                type="text" 
                name="username" 
                value={formData.username} 
                onChange={handleChange} 
                required 
            />
        </div>
        <div>
            <label>Email</label>
            <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                required 
            />
        </div>
        <div>
            <label>Password</label>
            <input 
                type="password" 
                name="password" 
                value={formData.password} 
                onChange={handleChange} 
                required 
            />
        </div>
        <button type="submit">Register</button>
    </form>
    )
}

export default RegistrationForm;