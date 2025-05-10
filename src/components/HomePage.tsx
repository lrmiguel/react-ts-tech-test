import { PaginatedEstablishmentsTable } from "./PaginatedEstablishmentsTable";
import { AuthoritiesDropDown } from "./AuthoritiesDropDown";
import { useState } from "react";
import PageLayout from "./PageLayout";

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
