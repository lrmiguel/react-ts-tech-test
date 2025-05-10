import { PaginatedEstablishmentsTable } from "../components/establishments/PaginatedEstablishmentsTable";
import { useState } from "react";
import PageLayout from "./PageLayout";
import { AuthoritiesDropDown } from "../components/authorities/AuthoritiesDropDown";

const HomePage = () => {
  const [selectedAuthority, setSelectedAuthority] = useState<string | null>(null);
  
  return (
    <PageLayout>
      <AuthoritiesDropDown onChange={setSelectedAuthority} />
      <PaginatedEstablishmentsTable authority={selectedAuthority ?? undefined} />
    </PageLayout>
  );
};

export default HomePage;
