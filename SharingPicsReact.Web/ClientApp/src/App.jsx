import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './Pages/Home';
import Upload from './Pages/Upload';
import View from './Pages/View';
const App = () => {
    return (
        <Layout>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/upload' element={<Upload />} />
                <Route path='/view/:id' element={<View/> }/>
            </Routes>
        </Layout>
    );
}

export default App;