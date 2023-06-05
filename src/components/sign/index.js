import React from "react";
import { Link } from "react-router-dom";

export function SignApplication() {
    return (
        <div>
            <Link to="/signing" activeStyle>
                Подписать
            </Link>
            <h1>Список заявок на подписание</h1>
        </div>
    )
}