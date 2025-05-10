import { useFavourites } from "../../context/FavouritesContext";
import { truncate } from "../../utils/string.utils";

const layoutStyle: React.CSSProperties = {
    background: "#82C7AF",
    flexGrow: 1,
    fontSize: "20px",
    margin: "10px 5px 10px 5px",
    maxHeight: "400px",
    padding: "10px",
    textAlign: "left",
    overflowY: "auto",
    width: "30rem"
};

const headerStyle: React.CSSProperties = { 
    background: "#82C7AF",
    height: "10px", 
    padding: "10px", 
    position: "sticky", 
    top: -10,
}

const tbodyStyle: React.CSSProperties = {
    padding: "0 10px"
}

const buttonStyle: React.CSSProperties = {
    backgroundColor: "#82C7AF",
    border: "1px solid green",
    borderRadius: "4px",
    color: "white",
    fontSize: "15px",
    fontWeight: "bold",
    padding: "5px",
    width: "5rem"
};
const FavouritesTable: React.FC = () => {
  const { favourites, removeFavourite } = useFavourites();

  if (favourites.length === 0) return null;

  return (
    <div id="favourites-container" style={layoutStyle}>
      <p style={{margin: "3px"}}><strong>Favourites</strong></p>
      <table style={{width: "100%"}}>
        <thead>
          <tr>
            <th style={headerStyle}>Name</th>
            <th style={headerStyle}>Rating</th>
            <th style={headerStyle}></th>
          </tr>
        </thead>
        <tbody>
          {favourites.map((fav) => (
            <tr key={fav.id}>
              <td style={{ ...tbodyStyle, width: "17rem" }}>{truncate(30, fav.name)}</td>
              <td style={tbodyStyle}>{truncate(10, fav.rating)}</td>
              <td style={tbodyStyle}>
                <button aria-label="Remove from favourites" style={buttonStyle} onClick={() => removeFavourite(fav.id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FavouritesTable;
