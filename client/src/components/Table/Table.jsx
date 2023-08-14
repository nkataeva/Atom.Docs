import React from "react";
import styles from './Table.module.scss';
import { useNavigate } from "react-router-dom";
import { APPRoute } from "../../const";
import newSign from '../../assets/newSign.svg';
import signing from '../../assets/signing.svg';
import blueSign from '../../assets/signBlue.svg';
// import redSign from '../../assets/signRed.svg';
// import greenSign from '../../assets/signGreen.svg';
import { observer } from "mobx-react-lite";

const Table = ({ data, sign }) => {
    const navigate = useNavigate();

    const openSign = (id) => {
        if (!sign)
        navigate(`${APPRoute.SIGN}/${id}`);
    }

    const openSigning = (id) => {
        navigate(`${APPRoute.SIGNING}/${id}`);
    }

    return (
        <div className={styles.container}>
            <table>
                <thead>
                    <tr>
                        {!sign && <th>
                            <img src={newSign} alt="Signing" onClick={() => navigate(APPRoute.CREATURE)} />
                        </th>}
                        <th>Номер заявки</th>
                        <th>Имя отправителя</th>
                        <th>Название</th>
                        <th>Дата</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row) => (
                        <tr key={row.id}>
                            {!sign && <td className={styles.sign}>
                                <img src={blueSign} alt="sign" onClick={() => openSign(row.id)} />
                            </td>}
                            {Object.values(row).map((value, innerIndex) => (
                                <td key={innerIndex}>{value}</td>
                            ))}
                            {sign && (
                                <td>
                                    <img src={signing} alt="Signing" onClick={() => openSigning(row.id)} />
                                </td>
                            )}
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