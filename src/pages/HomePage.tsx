import { PaginatedEstablishmentsTable } from "../components/establishments/PaginatedEstablishmentsTable";
import { useState } from "react";
import { AuthoritiesDropDown } from "../components/authorities/AuthoritiesDropDown";

const HomePage = () => {
  const [selectedAuthority, setSelectedAuthority] = useState<string | null>(null);
  
  return (
      <>
        <AuthoritiesDropDown onChange={setSelectedAuthority} />
        <PaginatedEstablishmentsTable authority={selectedAuthority ?? undefined} />
      </>
  );
};

export default HomePage;
