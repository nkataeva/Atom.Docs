import React from "react";
import { Link } from "react-router-dom";

export function Greeting() {
    return (
        <div>
            <h1>Greeting page</h1>
            <Link to="/login" activeStyle>
                Вход
            </Link>
            <Link to="/registation" activeStyle>
                Регистрация
            </Link>
        </div>

    )
}