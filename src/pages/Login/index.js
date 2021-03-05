import React, { useState } from 'react';
import icon from '../../assets/chatbot.svg';
import api from '../../services/api';

import "./styles.css";

export default function Login({ history }) {
    const [pin, setPin] = useState('');

    async function handleSubmit() {
        const response = await api.get('/user', {headers: { pin }});
        
        const { _id } = response.data;

        localStorage.setItem('user', _id);

        history.push('/dashboard');
    }

    return (
        <div className="container">
            <div className="content">
                <img src={ icon } alt="logo"></img>
                <h2>Casperbot Painel de Controle</h2>
                
                <input 
                    type="password" 
                    placeholder="digite seu pin" 
                    value={pin} 
                    onChange={event => setPin(event.target.value) }>
                </input>
                <button onClick={handleSubmit}type="submit">login</button>
               
                
            </div>
            
        </div>
    );
}