import React from "react";
import { EstablishmentsTableRow } from "./EstablishmentsTableRow";
import PropTypes from "prop-types";

const headerStyle: { [key: string]: string | number } = {
  fontSize: "20px",
  textAlign: "left",
  paddingBottom: "10px",
};

type EstablishmentsTableNavigationType = {
  establishments?: { [key: string]: string }[];
  loading: boolean;
};

export const EstablishmentsTable: React.FC<EstablishmentsTableNavigationType> = ({ establishments, loading }) => {
  return (
    <table>
      <tbody>
      <tr>
        <th style={{ ...headerStyle, paddingRight: "30px"}}>Fav</th>
        <th style={{ ...headerStyle, width: "37.5rem" }}>Business Name</th>
        <th style={{ ...headerStyle }}>Rating Value</th>
      </tr>
      {loading ? (
        <tr style={{ fontSize: '20px', height: '19.15rem' }}>
          <td colSpan={3} style={{ fontWeight: 'bold', textAlign: 'center'}}>Loading...</td>
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
