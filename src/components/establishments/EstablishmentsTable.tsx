import React from "react";
import { EstablishmentsTableRow } from "./EstablishmentsTableRow";
import PropTypes from "prop-types";
import styles from "./EstablishmentsTable.module.css";

type EstablishmentsTableNavigationType = {
  establishments?: { [key: string]: string }[];
  loading: boolean;
};

export const EstablishmentsTable: React.FC<EstablishmentsTableNavigationType> = ({ establishments, loading }) => {
  return (
    <table>
      <thead>
        <tr>
          <th className={styles.headerStyle} style={{ paddingRight: "30px"}}>Fav</th>
          <th className={styles.headerStyle} style={{ width: "37.5rem" }}>Business Name</th>
          <th className={styles.headerStyle}>Rating Value</th>
        </tr>
      </thead>
      <tbody>
        {loading ? (
          <tr style={{ fontSize: "20px", height: "19.15rem" }}>
            <td colSpan={3} style={{ fontWeight: "bold", textAlign: "center"}}>Loading...</td>
          </tr>
          ) : (
          establishments &&
          establishments?.map(
            (
            establishment: { [key: string]: string } | null | undefined,
            index: React.Key | null | undefined
            ) => (
            <EstablishmentsTableRow
              key={index}
              establishment={establishment}
            />
            )
          )
          )
        }
      </tbody>
    </table>
  );
};

EstablishmentsTable.propTypes = {
  establishments: PropTypes.array,
  loading: PropTypes.bool.isRequired,
};
