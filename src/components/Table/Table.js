import React from "react";
import { Link } from "react-router-dom";
import styles from './Table.module.scss'

const Table = ({ data, sign }) => {
    return (
        <div className={styles.container}>
            <table>
                <thead>
                    <tr>
                        <th>Номер заявки</th>
                        <th>Имя отправителя</th>
                        <th>Название</th>
                        <th>Дата</th>
                        <th>Тип заявки</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index}>
                            {Object.values(row).map((value, index) => (
                                <td key={index}>{value}</td>
                            ))}
                            {sign &&
                                <td>
                                    <Link to="/signing">Подписать</Link>
                                </td>}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>


    )
}

Table.defaultProps = {
    sign: false,
}

export default Table;