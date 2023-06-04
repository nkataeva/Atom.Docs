import React from "react";
import Header from "../header/header";
import styles from "./layout.module.scss";

const Layout = ({children}) => {
    return (
        <div className={styles.page}>
            <Header/>
            <main className={styles.main}>
                {children}
            </main>
        </div>
    )
}

export default Layout;