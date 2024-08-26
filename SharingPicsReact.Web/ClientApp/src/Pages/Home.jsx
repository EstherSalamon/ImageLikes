import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const [images, setImages] = useState([]);

    useEffect(() => {

        async function loadData() {
            const { data } = await axios.get('/api/images/all');
            setImages(data);
        };

        loadData();

    }, []);

    function formatDate(string) {
        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(string).toLocaleDateString([], options);
    };
    
    return (
        <div className='container' style={{ marginTop: 80 }}>
            <div className='col-md-8 offset-2'>
                <h2>These are the most awesome images!!</h2>
                <h6 className='offset-6'>Upload more <a href='/upload'>here</a></h6>
                {images && images.map(i =>
                    <a href={`/view/${i.id}`} key={i.id} style={{textDecoration: 'none'} }>
                    <div className='card w-50'>
                            <img className='card-image-top' style={{ width: 240 }} src={`/api/images/get?guid=${i.guid}`} />
                        <div className='card-body'>
                            <h2 className='card-title'>{i.title}</h2>
                            <h5>{formatDate(i.dateUploaded)}</h5>
                        </div>
                        </div>
                    </a>
                )}
            </div>
        </div>
    );
};

export default Home;