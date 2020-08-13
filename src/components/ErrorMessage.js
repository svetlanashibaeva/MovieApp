import React from 'react';
import error from '../assets/dontknow.jpg';

const ErrorMessage = () => {
    return (
        <div style={{ textAlign: "center" }}>
        <h3 >Упс, произошла ошибка</h3>  
        <img src={error} />
        </div>
    )
}

export default ErrorMessage;