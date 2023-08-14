import React from "react";
import styles from "./SigningPage.module.scss";
import sign from '../../assets/signBlue.svg';
import NewPDF from '../../components/componets_for_pdf/NewPDF/NewPDF';
import { useNavigate, useParams } from 'react-router-dom';
import signsStore from "../../stores/SignStore";
import userStore from "../../stores/UserStore";
import { observer } from "mobx-react-lite";
import { APPRoute } from "../../const";

const SigningPage = observer(() => {
  const [comm, setComm] = React.useState('');
  const changeComm = (evt) => {
    setComm(evt.target.value);
  }
  const navigate = useNavigate();

  const id = useParams()?.id || "";

  React.useEffect(() => {
    signsStore.getSign(id);
    userStore.getAllUser();
  }, []);

  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const openDoc = () => {
    setModalIsOpen(true)
  }

  const [datePart, timePart] = (signsStore.currentSign?.createdAt || "").split("T");
  const name = userStore.users.find(user => user.id === signsStore.currentSign?.ownerId);
  console.log(signsStore.currentSign)

  const toSign = () => {
    const data = {
      "id_user": userStore.user.id
    }
    signsStore.fetchSign(data, id)
    navigate(APPRoute.MAIN);
  }

  const toReject = () => {
    const data = {
      "id_user": userStore.user.id,
      "comment": comm,
    }
    signsStore.rejectSign(data, id)
    navigate(APPRoute.MAIN);
  }

  return (
    <div className={styles.form}>
      <p className={styles.title}>{signsStore.currentSign?.name}</p>

      <div className={styles.block}>
        <p>{name?.fio}</p>
        <p>{datePart}</p>
      </div>

      <div className={styles.block}>
        <img src={sign} alt="sign" className={styles.icon} onClick={openDoc} />
        <p>{signsStore.currentSign?.id}</p>
      </div>

      <textarea className={styles.comm}
        placeholder="Комментарий"
        value={comm}
        onChange={changeComm}>
      </textarea>

      <div className={styles.submit}>
        <button className={styles.sign} onClick={toSign}>Подписать</button>
        <button className={styles.notSign} onClick={toReject}>Отклонить</button>
      </div>

      <NewPDF visible={false} isOpen={modalIsOpen}
        setIsOpen={setModalIsOpen}
        captionRequest={signsStore.currentSign?.name}
        userName={name?.fio}
        chief={userStore.user?.fio}
        captionFactory={signsStore.currentSign?.orgName}
        content={signsStore.currentSign?.content}
        justification={signsStore.currentSign?.reason} />
    </div>
  );
});

export default SigningPage;