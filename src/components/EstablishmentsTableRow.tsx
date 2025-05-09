const tableRowsStyle = {
  fontSize: "20px",
  height: "1.8rem"
}
export const EstablishmentsTableRow: React.FC<{
  establishment: { [key: string]: string } | null | undefined;
}> = ({ establishment }) => {
  return (
    <tr style={tableRowsStyle}>
      <td>{establishment?.BusinessName && establishment.BusinessName.length > 60 ?
        establishment.BusinessName.slice(0, 60) + '...'
        :
        establishment?.BusinessName}</td>
      <td>{establishment?.RatingValue}</td>
    </tr>
  );
};
