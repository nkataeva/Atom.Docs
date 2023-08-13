import React, { useState, useEffect } from "react";
import styles from "./PdfGenerator.module.scss";
import NewPDF from "../NewPDF/NewPDF";
import userStore from "../../../stores/UserStore";
import { Select } from "antd";
import { template, templateFormatedData } from "../../../const";

const PdfGenerator = ({ obj }) => {
  const { getAllUser, user, users } = userStore;
  const { userName, chief, captionFactory, content, justification, status } =
    obj;

  useEffect(() => {
    getAllUser();
  }, [getAllUser]);

  const [formData, setFormData] = useState({
    id_user: 1,
    id_type: 1,
    name: "",
    extra: {
      duration: null,
      dt_start: "",
      name_org: "",
      content: "",
      reason: "",
    },
    signers: [],
  });

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const handleTypeChange = (value) => {
    setFormData({ ...formData, id_type: value });
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
        className={styles.select}
        popupClassName={styles.selectList}
        onChange={handleSignersChange}
        options={formatedUsersList}
      />
      <div className="pdf-preview">
        <NewPDF
          captionRequest={templateFormatedData[formData.id_type]}
          userName={user ? user.fio : ""}
          chief={""}
          captionFactory={captionFactory}
          content={content}
          justification={justification}
          status={status}
        />
      </div>
    </div>
  );
};

export default PdfGenerator;
