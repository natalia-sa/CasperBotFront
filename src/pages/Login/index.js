import React from 'react';
import icon from '../../assets/chatbot.svg';

import "./styles.css";

export default function Login() {
  return (
    <div className="container">
        <div className="content">

            <img src={ icon } alt="logo"></img>
            <h2>Casperbot Painel de Controle</h2>
            <input placeholder="digite seu pin"></input>
            <button type="submit">login</button>
            </div>
        
        </div>
  );
}