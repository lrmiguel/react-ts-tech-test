import React from "react";
import FavouritesTable from "../components/favourites/FavouritesTable";
import styles from "./PageLayout.module.css";

const PageLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className={styles.layoutStyle}>
    <header className={styles.logoStyle} />
    {children}
    <FavouritesTable />
  </div>
);

export default PageLayout;