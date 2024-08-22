import React from 'react';
import './home.scss';

const Home = () => {
    return (
        <div className="content home">
            <h1>Welcome!</h1>
            <br />
            <br />
            <span>
                This is my student records web app built on a Vite + React + Typescript frontend, C#.NET backend, and a Microsoft SQL database.
                <br />
                You can add, edit, delete and view buildings, grades, students, and grades. Press any of the buttons above to get started.
            </span>
        </div>
    )
}

export default Home;
