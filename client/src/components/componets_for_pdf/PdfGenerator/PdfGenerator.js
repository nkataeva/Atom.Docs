import React, { useState, useEffect } from "react";
import styles from "./PdfGenerator.module.scss";
import NewPDF from "../NewPDF/NewPDF";
import userStore from "../../../stores/UserStore";
import { Select } from "antd";
import { template, templateFormatedData } from "../../../const";
import {observer} from "mobx-react-lite";

const PdfGenerator = observer(({ obj }) => {
  const { getAllUser, user, users } = userStore;
  const { userName, chief, captionFactory, content, justification, status } =
    obj;

  useEffect(() => {
    getAllUser();
  }, [getAllUser]);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [formData, setFormData] = useState({
    id_user: 1,
    id_type: 1,
    name: "",
    extra: {
      duration: 0,
      dt_start: "",
      name_org: "",
      content: "",
      reason: "",
    },
    signers: [],
  });

  const handleTypeChange = (value) => {
    setFormData({ ...formData, id_type: parseInt(value) });
  };

  const handleSignersChange = (value) => {
    if (value === "all") {
      setFormData({
        ...formData,
        signers: users
          .filter((userFromList) => userFromList.id !== user.id)
          .map((user) => user.id),
      });
    } else {
      setFormData({ ...formData, signers: [value] });
    }
  };

  const formatedUsersList = users.map((user) => ({
    value: user.id,
    label: user.fio,
  }));
  formatedUsersList.push({ value: "all", label: "Всем" });

  return (
    <div className={styles.container}>
      <Select
        defaultValue="1"
        size="large"
        className={styles.select}
        popupClassName={styles.selectList}
        onChange={handleTypeChange}
        options={template}
      />
      <Select
        size="large"
        placeholder="Кому"
        mode="multiple"
        className={styles.select}
        popupClassName={styles.selectList}
        onChange={handleSignersChange}
        options={formatedUsersList}
      />
      <div className="pdf-preview">
        <NewPDF
          captionRequest={templateFormatedData[formData.id_type]}
          userName={user ? user.fio : ""}
          chief={formData ? formData.name :""}
          captionFactory={captionFactory}
          content={content}
          justification={justification}
          visible={true}
          isOpen={modalIsOpen}
          setIsOpen={setModalIsOpen}
          formData={formData}
        />
      </div>
    </div>
  );
});

export default PdfGenerator;
