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

const Table = observer (({ data, sign }) => {
    const navigate = useNavigate();

    const openSign = () => {
        if (!sign)
            navigate(APPRoute.SIGN)
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
                    {data.map((row, index) => (
                        <tr key={index}>
                            {!sign && <td className={styles.sign}>
                                <img src={blueSign} alt="sign" onClick={openSign} />
                            </td>}
                            {Object.values(row).map((value, innerIndex) => (
                                <td key={innerIndex}>{value}</td>
                            ))}
                            {sign && (
                                <td>
                                    <img src={signing} alt="Signing" onClick={() => navigate(APPRoute.SIGNING)} />
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    )
})

Table.defaultProps = {
    sign: false,
}

export default Table;