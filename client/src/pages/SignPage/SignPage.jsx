import React, { useEffect } from "react";
import styles from "./SignPage.module.scss";
import sign from "../../assets/signBlue.svg";
import { useParams } from "react-router-dom";
import signsStore from "../../stores/SignStore";
import userStore from "../../stores/UserStore";
import { observer } from "mobx-react-lite";
import NewPDF from "../../components/componets_for_pdf/NewPDF/NewPDF";
import dayjs from "dayjs";

const SignPage = observer(() => {
  const id = useParams()?.id || "";
  useEffect(() => {
    signsStore.getSign(id);
    userStore.getAllUser();
  }, []);

  const name = userStore.users.find(
    (user) => user.id === signsStore.currentSign?.ownerId
  );
  const { currentSign } = signsStore;

  let status = "";
  if (signsStore.currentSign?.status === 0) status = "На рассмотрении";
  else if (signsStore.currentSign?.status === 1) status = "Подписано";
  else status = "Отклонено";

  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const openDoc = () => {
    setModalIsOpen(true);
  };

  return (
    <div className={styles.form}>
      <p className={styles.title}>{signsStore.currentSign?.name}</p>

      <div className={styles.block}>
        <p>{userStore.user?.fio}</p>
        <p>{dayjs(currentSign?.createdAt).format("MM-DD-YYYY")}</p>
      </div>

      <div className={styles.block}>
        <img src={sign} alt="sign" className={styles.icon} onClick={openDoc} />
        <p>{signsStore.currentSign?.id}</p>
      </div>

      <div className={styles.status}>
        <p>Статус: </p>
        <p>{status}</p>
      </div>

      <p className={styles.comm}>{signsStore.currentSign?.comment}</p>

      <NewPDF
        visible={false}
        isOpen={modalIsOpen}
        setIsOpen={setModalIsOpen}
        captionRequest={signsStore.currentSign?.name}
        userName={name?.fio}
        chief={userStore.user?.fio}
        captionFactory={signsStore.currentSign?.orgName}
        content={signsStore.currentSign?.content}
        justification={signsStore.currentSign?.reason}
      />
    </div>
  );
});

export default SignPage;
