import { useFavourites } from "../../context/FavouritesContext";
import { truncate } from "../../utils/string.utils";
import styles from "./FavouritesTable.module.css";

const FavouritesTable: React.FC = () => {
  const { favourites, removeFavourite } = useFavourites();

  if (favourites.length === 0) return null;

  return (
    <div id="favourites-container" className={styles.layout}>
      <p style={{margin: "3px"}}><strong>Favourites</strong></p>
      <table style={{width: "100%"}}>
        <thead>
          <tr>
            <th className={styles.header}>Name</th>
            <th className={styles.header}>Rating</th>
            <th className={styles.header}></th>
          </tr>
        </thead>
        <tbody>
          {favourites.map((fav) => (
            <tr key={fav.id}>
              <td className={styles.tbody} style={{ width: "17rem" }}>{truncate(30, fav.name)}</td>
              <td className={styles.tbody}>{truncate(3, fav.rating)}</td>
              <td className={styles.tbody}>
                <button aria-label="Remove from favourites" className={styles.button} onClick={() => removeFavourite(fav.id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FavouritesTable;
