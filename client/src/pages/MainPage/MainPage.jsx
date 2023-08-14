import React, { useEffect } from "react";
import styles from "./MainPage.module.scss";
import Table from "../../components/Table/Table";
// import testData from "../ForSigningPage/mock_data";
import Search from "../../components/Search/Search";
import signsStore from "../../stores/SignStore";
import userStore from "../../stores/UserStore";
import { observer } from "mobx-react-lite";

const MainPage = observer(() => {
  const [inputValue, setInputValue] = React.useState("");
  const { fetchMySign, mySign } = signsStore;
  const { user } = userStore;

  useEffect(() => {
    if (user) {
      fetchMySign();
    }
  }, [user]);

  const transformedArray = mySign.map(el => {
    const [datePart, timePart] = el.dt_create.split("T");
    return {
      id: el.id,
      id_user: user?.fio,
      name: el.name,
      dt_create: datePart,
    };
  });

  const filteredData = transformedArray?.filter((value) => {
    return value.name.toLowerCase().includes(inputValue.toLowerCase());
  });

  return (
    <div className={styles.main}>
      {mySign.length > 0 && (
        <Search input={inputValue} setInput={setInputValue} />
      )}
      {mySign.length > 0 && <Table data={filteredData} />}
      {mySign.length === 0 && (
        <div className={styles.nullMySign}>Нет созданных заявок</div>
      )}
    </div>
  );
});

export default MainPage;
