import React from "react";
import { Link } from "react-router-dom";
import "./not-found-screen.scss";
import withLayout from "../../hocs/with-layout";

const NotFoundScreen = () => {
    return (
            <div className="error">
                <h1 className="error__title">404. Page not found</h1>
                <Link to="/" className="error__link">Вернуться на главную страницу</Link>
            </div>
        
    )
};

export default withLayout(NotFoundScreen);