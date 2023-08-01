import React from "react";
import styles from "./ForSigningPage.module.scss";
import testData from "./mock_data";
import Table from "../../components/Table/Table";
import Search from "../../components/Search/Search";

export function ForSigningPage() {

  const [inputValue, setInputValue] = React.useState("");

  const filteredData = testData?.filter((value) => {
    return value.name.toLowerCase().includes(inputValue.toLowerCase());
  });

  return (
    <div className={styles.main}>
      <Search input={inputValue} setInput={setInputValue}/>
      <Table data={filteredData} sign={true}/>
    </div>
  );
}

export default ForSigningPage;