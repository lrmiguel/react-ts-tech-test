import { createContext, useContext } from "react";

interface AuthoritiesDropdownContextProps {
    menuRef: React.MutableRefObject<HTMLDivElement | null>;
    hasMore: boolean | void;
    handleLoadMore: () => void;
    isFetchingNextPage: boolean;
}

export const AuthoritiesDropdownContext = createContext<AuthoritiesDropdownContextProps | undefined>(undefined);

export const useAuthoritiesDropdown = () => {
    const ctx = useContext(AuthoritiesDropdownContext);
    if (!ctx) throw new Error("useAuthoritiesDropdown must be used within AuthoritiesDropdownContext.Provider");
    return ctx;
  };