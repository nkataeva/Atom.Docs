import React from "react";
import { Link } from "react-router-dom";
import styles from "./MainPage.module.scss";
import Table from "../../components/Table/Table";
import testData from "../ForSigningPage/mock_data";
import Search from "../../components/Search/Search";

const MainPage = () => {
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

export default MainPage;
