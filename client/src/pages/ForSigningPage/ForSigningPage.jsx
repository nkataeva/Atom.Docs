import React, { useEffect } from "react";
import styles from "./ForSigningPage.module.scss";
// import testData from "./mock_data";
import Table from "../../components/Table/Table";
import Search from "../../components/Search/Search";
import signsStore from "../../stores/SignStore";
import userStore from "../../stores/UserStore";
import { observer } from "mobx-react-lite";

const ForSigningPage = observer (() => {
  const [inputValue, setInputValue] = React.useState("");
  const { fetchForSigning, forSigning } = signsStore;
  const { user, users, getAllUser } = userStore;
  const [data, setData] = React.useState([]);

  useEffect(() => {
    if (user) {
      fetchForSigning();
      const transformedArray = forSigning.map(el => {
        const [datePart, timePart] = el.dt_create.split("T");
        getAllUser();
        const user1 = users.find(user => user.id === el.id_user);
        return {
          id: el.id,
          id_user: user1?.fio,
          name: el.name,
          dt_create: datePart,
        };
      });
      setData(transformedArray)
    }
  }, [user, forSigning]);

  const filteredData = data?.filter((value) => {
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
});

export default ForSigningPage;
