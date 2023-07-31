import React from "react";
import { Link } from "react-router-dom";
import styles from "./main.module.scss";
import Table from "../Table/Table";
import testData from "../sign/mock_data";
import Search from "../search/search";

const Main = () => {
  const [inputValue, setInputValue] = React.useState("");

  const filteredData = testData?.filter((value) => {
    return value.name.toLowerCase().includes(inputValue.toLowerCase());
  });

  return (
    <div className={styles.main}>
      <div className={styles.form}>
        <Link to="/creature">
          <button type="button">Создать заявку</button>
        </Link>
        <Link to="/sign">
          <button type="button">Заявки на подписание</button>
        </Link>
      </div>

      <Search input={inputValue} setInput={setInputValue} />

      <div className={styles.table}>
        <Table data={filteredData} />
      </div>
    </div >
  );
};

export default Main;
