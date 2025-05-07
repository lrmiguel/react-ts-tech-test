import React from "react";
import { EstablishmentsTableRow } from "./EstablishmentsTableRow";
import PropTypes from "prop-types";

const headerStyle: { [key: string]: string | number } = {
  paddingBottom: "10px",
  textAlign: "left",
  fontSize: "20px",
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
          <th style={headerStyle}>Business Name</th>
          <th style={headerStyle}>Rating Value</th>
        </tr>
        {loading ? (
            <tr>
              <td colSpan={2}>Loading...</td>
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
