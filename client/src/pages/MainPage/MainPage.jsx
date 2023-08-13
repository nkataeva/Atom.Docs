import React, { useEffect } from "react";
import styles from "./MainPage.module.scss";
import Table from "../../components/Table/Table";
// import testData from "../ForSigningPage/mock_data";
import Search from "../../components/Search/Search";
import signsStore from "../../stores/SignStore";
import userStore from "../../stores/UserStore";

const MainPage = () => {
  const [inputValue, setInputValue] = React.useState("");
  const { fetchMySign, mySign } = signsStore;
  const { user } = userStore;

  useEffect(() => {
    if (user) {
      fetchMySign();
    }
  }, [user, fetchMySign]);

  const filteredData = mySign?.filter((value) => {
    return value.name.toLowerCase().includes(inputValue.toLowerCase());
  });

  return (
    <div className={styles.main}>
      <Search input={inputValue} setInput={setInputValue} />
      {mySign.length > 0 && <Table data={filteredData} />}
    </div>
  );
};

export default MainPage;
