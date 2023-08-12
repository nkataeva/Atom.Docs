import React from "react";
import styles from "./header.module.scss";
import Logo from "../logo/logo";
import { Dropdown, Space } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { APPRoute } from "../../const";
import { ReactComponent as AvatarIcon } from "../../assets/avatar.svg";
import { observer } from "mobx-react-lite";
import { userStore } from "../../index";

const Header = observer(() => {
  const naigate = useNavigate();
  const LogoutClick = () => {
    userStore.deleteUser();
    localStorage.setItem("user", null);
    naigate(APPRoute.ENTRY);
  };

  const items = [
    {
      key: "1",
      label: <Link to={APPRoute.MAIN}>Мои заявки</Link>,
    },
    {
      key: "2",
      label: <Link to={APPRoute.FORSIGNING}>Заявки на подписание</Link>,
    },
    {
      key: "3",
      label: <Link to={APPRoute.CREATURE}>Создать заявку</Link>,
    },
    {
      key: "4",
      label: (
        <div to={APPRoute.MAIN} onClick={LogoutClick}>
          Выйти
        </div>
      ),
    },
  ];
  return (
    <header>
      <div className={styles.container}>
        <Logo width={"476px"} height={"144px"} fs={"48px"} />
        <Dropdown
          menu={{ items }}
          className={styles.menu}
          overlayClassName={styles.dropdownContainer}
          placement="bottomRight"
        >
          <Space>
            {userStore.getUser?.fio}
            <AvatarIcon width={"35px"} height={"35px"} />
          </Space>
        </Dropdown>
      </div>
    </header>
  );
});

export default Header;
