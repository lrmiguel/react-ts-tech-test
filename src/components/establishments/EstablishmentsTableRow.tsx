import { Link } from "react-router-dom";
import { useFavourites } from "../../context/FavouritesContext";
import { truncate } from "../../utils/string.utils";
import styles from "./EstablishmentsTableRow.module.css"; // Ensure this path is correct and matches the file location

export const EstablishmentsTableRow: React.FC<{
  establishment: { [key: string]: string } | null | undefined;
}> = ({ establishment }) => {
  const { toggleFavourite, isFavourited } = useFavourites();

  const businessName: string = establishment?.BusinessName!;
  const id = establishment?.FHRSID;

  return (
    <tr className={styles.tableRowsStyle}>
      <td style={{width: "auto"}}>
        <label className={styles.checkboxWrapper}>
          <input
            type="checkbox"
            checked={isFavourited(id!)}
            onChange={() =>
              toggleFavourite({
                id: id!,
                name: establishment?.BusinessName!,
                rating: establishment?.RatingValue!,
              })
            }
            aria-label={`Favourite ${establishment?.BusinessName}`}
            className={styles.checkbox}
          />
        </label>
      </td>
      <td>
        {establishment?.FHRSID ? (
          <Link to={`/establishments/${id}`} className={styles.linkStyle}>
            {truncate(40, businessName)}
          </Link>
        ) : (
          truncate(40, businessName)
        )}
      </td>
      <td>{truncate(10, establishment?.RatingValue)}</td>
    </tr>
  );
};
