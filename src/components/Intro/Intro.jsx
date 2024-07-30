import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './Intro.css';

export const Intro = () => {
    const history = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            history('/home');
        }, 2001);
    }, []);

    return (
        <>
            <div className="intro-container">
                <h1>
                    Huỳnh Vĩnh Tiến <br/> Portfolio Scroll ReactJS
                </h1>
                <p>
                    {"by @huynhvinhtien"}
                </p>
            </div>
        </>
    );
};