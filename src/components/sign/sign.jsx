import React from "react";
import styles from "./sign.module.scss";
import testData from "./mock_data";
import Table from "../Table/Table";
import Search from "../search/search";

export function SignApplication() {

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

export default SignApplication;