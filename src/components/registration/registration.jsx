import React, { useState } from "react";
import styles from "./registration.module.scss";
import withLayout from "../../hocs/with-layout";

const Registration = () => {
    const [formData, setFormData] = useState({
        login: '',
        password: '',
        name: '',
        role: 'boss',
        email: ''
    });

    const handleInputChange = (evt) => {
        setFormData({...formData, [evt.target.name]: evt.target.value})
    }

    const handleFormSubmit = (evt) => {
        evt.preventDefault();
        console.log(formData);
    }

    return (
        <form className={styles.form} onSubmit={handleFormSubmit}>
            <div className={styles.header}>Регистрация</div>
            <div className={styles.form__item}>
                <span>Логин</span>
                <input type="text" name="login" placeholder="Введите логин" required onChange={handleInputChange} value={formData.login}/>
            </div>
            <div className={styles.form__item}>
                <span>Пароль</span>
                <input type="password" name="password" placeholder="Введите пароль" required onChange={handleInputChange} value={formData.password}/>
            </div>
            <div className={styles.form__item}>
                <span>ФИО</span>
                <input type="text" name="name" placeholder="Введите ФИО" required onChange={handleInputChange} value={formData.name}/>
            </div>
            <div className={styles.form__item}>
                <span>Роль</span>
                <select name="role" onChange={handleInputChange} value={formData.role}>
                    <option value="boss">Руководитель</option>
                    <option value="worker">Работник</option>
                </select>
            </div>
            <div className={styles.form__item}>
                <span>Почта</span>
                <input type="email" name="email" placeholder="Введите почту" required onChange={handleInputChange} value={formData.email}/>
            </div>
            <button type="submit">Войти</button>
        </form>
    )
}

export default withLayout(Registration);