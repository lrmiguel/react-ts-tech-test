import React, { useState, useMemo, useRef, useEffect } from "react";
import Select from "react-select";
import { useInfiniteQuery, useQuery } from 'react-query';
import { getAuthorities, getAuthoritiesByName } from "../../api/ratingsAPI";
import CustomMenuList from "./CustomMenuList";
import { AuthoritiesDropdownContext } from "../../context/AuthoritiesDropDownContext";
import styles from "./AuthoritiesDropDown.module.css";

const PAGE_SIZE = 10;

interface AuthorityOptionType {
    label: string;
    value: number;
}
interface AuthoritiesDropDownProps {
    onChange: (value: string | null) => void;
}

export const AuthoritiesDropDown: React.FC<AuthoritiesDropDownProps> = ({ onChange }) => {

    const [inputValue, setInputValue] = useState("");
    
    const [debouncedSearch, setDebouncedSearch] = useState("");

    const isSearchMode = inputValue.trim().length > 0;

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebouncedSearch(inputValue);
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [inputValue]);

    const handleSelect = (option: AuthorityOptionType | null) => {
        onChange(option ? String(option.value) : null);
    };

    // Fetch paginated list (no search input)
    const {
        data: paginatedData,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading: isPaginatedLoading,
    } = useInfiniteQuery(
        ['dropdown-paginated'],
        async ({ pageParam = 1 }) => {
            const results = await getAuthorities(pageParam);
            return results.authorities;
        },
        {
            getNextPageParam: (lastPage, allPages) =>
                lastPage.length === PAGE_SIZE ? allPages.length + 1 : undefined,
            enabled: !isSearchMode,
            refetchOnWindowFocus: false
        }
    );

    // Search query with caching
    const {
        data: searchData,
        isLoading: isSearchLoading,
    } = useQuery(
        ['dropdown-search', debouncedSearch],
        async () => {
            const results = await getAuthoritiesByName(debouncedSearch);
            return results.authorities;
        },
        {
            enabled: isSearchMode && debouncedSearch.length > 0,
            staleTime: Infinity,
            cacheTime: Infinity,
        }
    );

    const options: AuthorityOptionType[] = useMemo(() => {
        const source = isSearchMode
          ? searchData || []
          : paginatedData?.pages?.flat() || [];
        return source.map((item) => ({
          label: item.Name,
          value: item.LocalAuthorityId,
        }));
      }, [isSearchMode, searchData, paginatedData]);

    const hasMore = !isSearchMode && hasNextPage;

    const handleLoadMore = () => {
        if (!isSearchMode && fetchNextPage) {
            fetchNextPage();
        }
    };
    const menuRef = useRef<HTMLDivElement | null>(null);

    // prevents the dropdown to be defined again every time this component re-renders
    const MenuList = CustomMenuList;
    
    return (
        <AuthoritiesDropdownContext.Provider
            value={{
                menuRef,
                hasMore,
                handleLoadMore,
                isFetchingNextPage,
            }}
        >
            <div className={styles.selectStyle}>
                <label htmlFor="authoritiesDropDown" style={{fontWeight: 'bold'}}>Authorities:</label>
                <Select<AuthorityOptionType, false>
                    components={{ MenuList }}
                    options={options}
                    onInputChange={(value: string) => {
                        setInputValue(value);
                    }}
                    onChange={handleSelect}
                    isLoading={isPaginatedLoading || isSearchLoading}
                    placeholder="Search or select..."
                    isClearable
                    id="authoritiesDropDown"
                    classNames={{
                        control: () => styles.control,
                        menu: () => styles.menu,
                        option: (state: any) => state.isFocused ? styles.optionFocused : 
                            state.isSelected ? styles.optionSelected : styles.option,
                        singleValue: () => styles.singleValue,
                        placeholder: () => styles.placeholder,
                    }}
                />
            </div>
        </AuthoritiesDropdownContext.Provider>
    )
};
