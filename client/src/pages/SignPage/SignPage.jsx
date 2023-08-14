import React, { useEffect } from "react";
import styles from './SignPage.module.scss';
import sign from '../../assets/signBlue.svg';
import { useParams } from 'react-router-dom';
import signsStore from "../../stores/SignStore";
import userStore from "../../stores/UserStore";
import { observer } from "mobx-react-lite";

const SignPage = observer(() => {
    const id = useParams()?.id || "";
    useEffect(() => {
        signsStore.getSign(id);
    }, []);
    const [datePart, timePart] = signsStore.currentSign?.createdAt.split("T");
    let status = '';

    if (signsStore.currentSign?.status === 0)
        status = 'На рассмотрении';
    else if (signsStore.currentSign?.status === 1)
        status = 'Подписано';
    else status = 'Отклонено';

    return (
        <div className={styles.form}>
            <p className={styles.title}>{signsStore.currentSign?.name}</p>

            <div className={styles.block}>
                <p>{userStore.user?.fio}</p>
                <p>{datePart}</p>
            </div>

            <div className={styles.block}>
                <img src={sign} alt="sign" className={styles.icon} />
                <p>{signsStore.currentSign?.id}</p>
            </div>

            <div className={styles.status}>
                <p>Статус: </p>
                <p>{status}</p>
            </div>

            <p className={styles.comm}>
                {signsStore.currentSign?.comment}
            </p>

        </div>
    )

})

export default SignPage;