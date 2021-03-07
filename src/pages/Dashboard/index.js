import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import Modal from 'react-modal';
import trash from '../../assets/delete.svg';
import edit from '../../assets/pencil.svg';
import "./styles.css";
import '../../global.css';

Modal.setAppElement('#root');

export default function Dashboard() {
    const [posts, setPosts] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [theme, setTheme] = useState('');
    const [link, setLink] = useState('');

    async function loadPosts() {
        const user_id = localStorage.getItem('user');
        const response = await api.get('/post', {headers: { user_id }})

        console.log(response.data);
        setPosts(response.data)
    }
    async function handleSubmit(event) {
        event.preventDefault();
        const user_id = localStorage.getItem('user');
        await api.post('/post',{imageUrl, title, description, link, theme}, {headers: {user_id}});
        loadPosts();
    }

    async function handleDelete(id) {
        console.log(id);
        await api.delete('/post', {headers: {_id: id}})
        loadPosts();
        
    }

    useEffect(() => { loadPosts() }, [posts] )

    return (
        <div className="table">
           <h3>Notícias cadastradas</h3>
           <table>
                <tr id="columns">
                    <th>Link para imagem</th>
                    <th>Título</th>
                    <th>Descrição</th>
                    <th>Tema</th>
                    <th>Link</th>
                </tr>

                {posts.map( post => (
                    <tr key={post._id} >
                        <td>{post.imageUrl}</td>
                        <td>{post.title}</td>
                        <td>{post.description}</td>
                        <td>{post.theme}</td>
                        <td>{post.link}</td>
                        <td><button postId={post._id} onClick={event => { handleDelete(post._id)}}><img src={trash} alt="trash"></img></button></td>
                        <td><button><img src={edit} alt="edit"></img></button></td>
                    
                    </tr>
                ))}
            
           </table>

           <button className="yellow-button" id="new-post" onClick={() => {setModalIsOpen(true)}}>nova notícia</button>
        
           <Modal isOpen={modalIsOpen} id="create-modal">
               
               <form onSubmit={handleSubmit}> 
                    <label htmlFor="imageUrl">url da imagem</label>
                    <input 
                        id="imageUrl" 
                        value={imageUrl} 
                        onChange={event => setImageUrl(event.target.value)}>
                    </input>

                    <label htmlFor="title">título</label>
                    <input 
                        id="title" 
                        value={title} 
                        onChange={event => setTitle(event.target.value)}>
                    </input>

                    <label htmlFor="description">descrição</label>
                    <input 
                        id="description" 
                        value={description} 
                        onChange={event => setDescription(event.target.value)}>
                    </input>

                    <label htmlFor="theme">tema</label>
                    <select 
                        id="theme" 
                        selected="Esportes"
                        value={theme} 
                        onChange={event => setTheme(event.target.value)}>
                            <option value="" selected disabled hidden>Escolha um tema</option>
                            <option value="Esportes">Esportes</option>
                            <option value="Entretenimento">Entretenimento</option>
                            <option value="Famosos">Famosos</option>
                            <option value="Política">Política</option>
                    </select>

                    <label htmlFor="link">link para notícia</label>
                    <input 
                        id="link" 
                        value={link} 
                        onChange={event => setLink(event.target.value)}>
                    </input>
                    <button className="yellow-button" type="submit">cadastrar</button>
               </form>
               <button id="close-button" onClick={() => setModalIsOpen(false)}>fechar</button>
               
           </Modal>
            
        </div>
    );
}