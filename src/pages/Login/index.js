import React, { useState } from 'react';
import icon from '../../assets/chatbot.svg';
import api from '../../services/api';

import "./styles.css";

export default function Login() {
    const [pin, setPin] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();
        console.log(pin)
        const response = await api.get('/user', {headers: { pin }});
        
        console.log(response);
    }

    return (
        <div className="container">
            <div className="content">
                <img src={ icon } alt="logo"></img>
                <h2>Casperbot Painel de Controle</h2>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="password" 
                        placeholder="digite seu pin" 
                        value={pin} 
                        onChange={event => setPin(event.target.value) }>
                    </input>
                    <button type="submit">login</button>
                </form>
                
            </div>
            
        </div>
    );
}