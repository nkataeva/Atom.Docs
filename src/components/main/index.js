import React from "react";
import { Link } from 'react-router-dom'

export function Main() {
    return (
        <div>
            <h1>Main page</h1>
            <Link to='/creature'>Создать заявку</Link>
            <Link to='/sign'>Заявки на подписание</Link>
        </div>
    )
}