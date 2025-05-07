const tableRowsStyle = {
  fontSize: "20px"
}
export const EstablishmentsTableRow: React.FC<{
  establishment: { [key: string]: string } | null | undefined;
}> = ({ establishment }) => {
  return (
    <tr style={tableRowsStyle}>
      <td>{establishment?.BusinessName}</td>
      <td>{establishment?.RatingValue}</td>
    </tr>
  );
};
