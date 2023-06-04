import React from "react";
import styles from "./header.module.scss";
import { Link } from "react-router-dom";
import { APPRoute } from "../../const";

const Header = () => {
    return (
        <header>
            <div className={styles.logo}>
                <Link to={APPRoute.MAIN}>
                    <img src="./img/icon/logo.svg" alt="Logo" />
                </Link>
                <div>Атом.Документы</div>
            </div>
        </header>
    )
}

export default Header;