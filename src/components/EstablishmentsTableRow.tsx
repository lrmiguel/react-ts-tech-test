import { Link } from "react-router-dom";
import { useFavourites } from "../context/FavouritesContext";
import { truncate } from "../utils/string.utils";

const tableRowsStyle = {
  fontSize: "20px",
  height: "1.8rem",
}
const linkStyle = {textDecoration: "none", color: "white"};

export const EstablishmentsTableRow: React.FC<{
  establishment: { [key: string]: string } | null | undefined;
}> = ({ establishment }) => {
  const { toggleFavourite, isFavourited } = useFavourites();

  const businessName: string = establishment?.BusinessName!;
  const id = establishment?.FHRSID;

  return (
    <tr style={tableRowsStyle}>
      <td style={{width: "auto"}}>
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
        />
      </td>
      <td>
        {establishment?.FHRSID ? (
          <Link to={`/establishments/${id}`} style={linkStyle}>
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
