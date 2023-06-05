import React from "react";
import { Link } from 'react-router-dom';
import withLayout from "../../hocs/with-layout";
import styles from "./main.module.scss";

const Main = () => {
    return (
        <div className={styles.form}>
            <Link to='/creature'><button type="button">Создать заявку</button></Link>
            <Link to='/sign'><button type="button">Заявки на подписание</button></Link>
        </div>
    )
}

export default withLayout(Main);