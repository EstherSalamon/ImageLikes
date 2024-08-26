import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Upload() {

    const [title, setTitle] = useState('');
    const imageRef = useRef();
    const navigate = useNavigate();

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    const onButtonClick = async () => {
        if (!imageRef.current.files.length) {
            return;
        }
        const file = imageRef.current.files[0];
        const base64 = await toBase64(file);
        const { data } = await axios.post('/api/images/add', { title, base64 });
        navigate(`/view/${data}`);
    };

    return (
        <div className='container' style={{ marginTop: 80 }}>
            <div className='col-md-6 offset-3'>
                <h1>Upload your picture here</h1>
                <hr />
                <input type='text' name='title' placeholder='Title' value={title} onChange={e => setTitle(e.target.value)} className='form-control' />
                <input type='file' ref={imageRef} className='form-control mt-2' />
                <button className='btn btn-outline-primary w-100 mt-2' onClick={onButtonClick}>Upload</button>
            </div>
        </div>
    )
};

export default Upload;