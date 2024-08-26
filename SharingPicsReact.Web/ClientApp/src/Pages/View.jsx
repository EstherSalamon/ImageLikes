import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Loader.css';

const View = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [image, setImage] = useState({
        id: '',
        title: '',
        dateUploaded: '',
        likes: '',
        guid: ''
    });
    const [loading, setLoading] = useState(true);
    const [allowLike, setAllowLike] = useState(true);

    const loadData = async () => {
        setLoading(true);
        const { data } = await axios.get(`/api/images/byid?id=${id}`);
        if (!data) {
            navigate('/');
        }
        setImage(data.image);
        setAllowLike(data.allowLike);
        setLoading(false);
    };

    useEffect(() => {

        loadData();

    }, []);

    function formatDate(string) {
        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(string).toLocaleDateString([], options);
    };

    const onLikeClick = async () => {
        await axios.post(`/api/images/like`, { id });
        loadData();

    };

    return (
        <div className='container' style={{ marginTop: 80 }}>
            <div className='col-md-6 offset-3'>
                {loading ? <span className='loader'>Loading...</span> :
                    <div className="card" style={{ width: 400 }}>
                        <img className="card-img" src={`/api/images/get?guid=${image.guid}`} alt="Card image" />
                        <div className="card-body">
                            <h1 className="card-title">{image.title}</h1>
                            <h3 className="card-text">Uploaded on {formatDate(image.dateUploaded)}</h3>
                            <h6 className="card-text">{image.likes} Likes</h6>
                            <button onClick={onLikeClick} disabled={!allowLike} className="btn btn-primary">Like</button>
                        </div>
                    </div>}
            </div>
        </div>
    )
};

export default View;

