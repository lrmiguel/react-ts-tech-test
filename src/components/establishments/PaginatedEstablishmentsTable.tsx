import { useState, useEffect } from "react";
import { EstablishmentsTable } from "./EstablishmentsTable";
import { EstablishmentsTableNavigation } from "./EstablishmentsTableNavigation";
import { getEstablishmentRatings, getEstablishmentsByAuthority } from "../../api/ratingsAPI";
import { useQuery } from "react-query";

const tableStyle = {
  background: "#82C7AF",
  color: "white",
  padding: "10px 20px",
  width: "50rem",
  height: "29rem",
};

interface EstablishmentsTableProps {
  authority?: string;
}

export const PaginatedEstablishmentsTable: React.FC<EstablishmentsTableProps> = ({ authority }) => {
  const [error, setError] =
    useState<{ message: string; [key: string]: string }>();
  const [pageNum, setPageNum] = useState(1);

  // Fetches data from API based on 'establishments', authority, pageNum 
  const { data, isLoading, isFetching } = useQuery(
    ['establishments', authority, pageNum],
    () => fetchEstablishmentRatings(authority), // Pass authority as filter param
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
      onError: (error: unknown) => {
        setError({ message: JSON.stringify(error) });
        console.error("Error occurred when fetching establishments", error);
      }
    }
  );
  const establishments = data ?? [];

  const [pageCount] = useState(100);

  useEffect(() => {
    setPageNum(1);
  }, [authority]);

  async function handlePreviousPage() {
    pageNum > 1 && setPageNum(pageNum - 1);
  }

  async function handleNextPage() {
    pageNum < pageCount && setPageNum(pageNum + 1);
  }
  
  async function fetchEstablishmentRatings(authority?: string): Promise<{}[]> {
    const results = (authority) ? await getEstablishmentsByAuthority(authority, pageNum) : await getEstablishmentRatings(pageNum);
    return results.establishments;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <div style={tableStyle}>
        <h2>Food Hygiene Ratings</h2>
        <EstablishmentsTable establishments={establishments} loading={isLoading || isFetching} />
        <EstablishmentsTableNavigation
          loading={isLoading || isFetching}
          pageNum={pageNum}
          pageCount={pageCount}
          onPreviousPage={handlePreviousPage}
          onNextPage={handleNextPage}
        />
      </div>
    );
  }
};
