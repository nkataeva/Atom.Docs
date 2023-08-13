import React, { useEffect } from "react";
import styles from "./ForSigningPage.module.scss";
// import testData from "./mock_data";
import Table from "../../components/Table/Table";
import Search from "../../components/Search/Search";
import signsStore from "../../stores/SignStore";
import userStore from "../../stores/UserStore";

export function ForSigningPage() {
  const [inputValue, setInputValue] = React.useState("");
  const { fetchForSigning, forSigning } = signsStore;
  const { user } = userStore;

  useEffect(() => {
    if (user) {
      fetchForSigning();
    }
  }, []);

  const filteredData = forSigning?.filter((value) => {
    return value.name.toLowerCase().includes(inputValue.toLowerCase());
  });

  return (
    <div className={styles.main}>
      {forSigning.length > 0 && (
        <Search input={inputValue} setInput={setInputValue} />
      )}
      {forSigning.length > 0 && <Table data={filteredData} sign={true} />}
      {forSigning.length === 0 && (
        <div className={styles.nullForSigning}>Заявок на подписание нет</div>
      )}
    </div>
  );
}

export default ForSigningPage;
