import React from "react";
import { Link } from 'react-router-dom'

export function Login() {
    return(
        <div>
            <Link to='/main'>Главная</Link>
            <h1>Log in page</h1>
        </div>
    )
}