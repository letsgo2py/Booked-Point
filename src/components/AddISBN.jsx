import React from 'react';
import { useNavigate } from 'react-router-dom';

function AddISBN() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/add-isbn');
    }

    return (
        <div className='content'>
            <button className='add-btn' onClick={handleClick}>+</button>
        </div>
    )
}

export default AddISBN;
