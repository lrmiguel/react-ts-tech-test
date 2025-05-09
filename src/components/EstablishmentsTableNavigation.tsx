const buttonStyle = {
  margin: "10px 5px",
};

type EstablishmentsTableNavigationType = {
  loading: boolean;
  pageNum: number;
  pageCount: number;
  onPreviousPage: () => void;
  onNextPage: () => void;
};

export const EstablishmentsTableNavigation = (
  props: EstablishmentsTableNavigationType
) => {
  const { loading, pageNum, pageCount, onPreviousPage, onNextPage } = props;
  return (
    <nav>
      {
        <button
          type="button"
          style={buttonStyle}
          disabled={pageNum <= 1 || loading}
          onClick={onPreviousPage}
        >
          -
        </button>
      }
      {pageNum}
      {
        <button
          type="button"
          style={buttonStyle}
          disabled={pageNum >= pageCount || loading}
          onClick={onNextPage}
        >
          +
        </button>
      }
    </nav>
  );
};
