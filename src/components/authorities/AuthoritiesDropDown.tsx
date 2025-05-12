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
                    styles={dropDownStyle}
                />
            </div>
        </AuthoritiesDropdownContext.Provider>
    )
};

const dropDownStyle = {
    control: (styles: any) => ({
        ...styles,
        backgroundColor: '#82C7AF',
        border: '0',
        borderRadius: '6px',
        caretColor: 'white',
        color: 'white',
        fontSize: '20px',
        margin: '10px 0 10px 0px',
        padding: '5px 10px',
    }),
    menu: (styles: any) => ({
        ...styles,
        backgroundColor: 'white',
        borderRadius: '6px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
        padding: '10px',
    }),
    option: (styles: any, { isFocused, isSelected }: any) => ({
        ...styles,
        backgroundColor: isSelected ? '#4CAF50' : isFocused ? '#E8F5E9' : undefined,
        color: isSelected ? 'white' : isFocused ? 'darkgreen' : 'black',
        padding: '10px',
    }),
    singleValue: (styles: any) => ({
        ...styles,
        color: 'white',
    }),
    placeholder: (styles: any) => ({
        ...styles,
        color: 'white',
    }),
};
