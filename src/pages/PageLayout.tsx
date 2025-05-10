import React from "react";
import Background from "../static/logo.svg"; // adjust the path if needed
import FavouritesTable from "../components/favourites/FavouritesTable";

const layoutStyle: React.CSSProperties = {
    alignItems: "center", 
    color: "white",
    display: "flex",
    flexDirection: "column",
    height: "100vh", 
};

const logoStyle: React.CSSProperties = {
  width: "640px",
  height: "200px",
  background: `transparent url(${Background}) no-repeat center`,
  backgroundSize: "contain",
  flexShrink: 0,
  marginBottom: "20px",
};

const PageLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={layoutStyle}>
    <header style={logoStyle} />
    {children}
    <FavouritesTable />
  </div>
);

export default PageLayout;