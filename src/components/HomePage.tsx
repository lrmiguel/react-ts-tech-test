import { PaginatedEstablishmentsTable } from "./PaginatedEstablishmentsTable";
import Background from "../static/logo.svg";
import { AuthoritiesDropDown } from "./AuthoritiesDropDown";
import { QueryClient, QueryClientProvider } from 'react-query';
import { useState } from "react";

const queryClient = new QueryClient();

const logoStyle: { [key: string]: string | number } = {
  width: "640px",
  height: "200px",
  background: `transparent url(${Background}) no-repeat center`,
  margin: "20px auto",
};
const HomePage = () => {
  const [selectedAuthority, setSelectedAuthority] = useState<string | null>(null);
  
  return (
    <div>
      <header style={logoStyle} />
      <QueryClientProvider client={queryClient}>
        <AuthoritiesDropDown onChange={setSelectedAuthority} />
        <PaginatedEstablishmentsTable authority={selectedAuthority ?? undefined} />
      </QueryClientProvider>
    </div>
  );
};

export default HomePage;
