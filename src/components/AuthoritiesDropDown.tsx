import React, { useState, useMemo, useRef } from "react";
import Select, { components, MenuListProps } from "react-select";
import { useInfiniteQuery, useQuery } from 'react-query';
import { getAuthorities, getAuthoritiesByName } from "../api/ratingsAPI";

const selectStyle = {
    color: 'white',
    fontSize: '20px',
    width: 'calc(50rem + 40px)',
};
const loadMoreStyle: React.CSSProperties = {
    color: '#4CAF50',
    cursor: 'pointer',
    padding: '8px',
    textAlign: 'center',
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

interface AuthorityOptionType {
    label: string;
    value: number;
}
interface AuthoritiesDropDownProps {
    onChange: (value: string | null) => void;
}

const PAGE_SIZE = 10;

export const AuthoritiesDropDown: React.FC<AuthoritiesDropDownProps> = ({ onChange }) => {
    const [inputValue, setInputValue] = useState("");
    const menuRef = useRef<HTMLDivElement | null>(null);
    const isSearchMode = inputValue.trim().length > 0;

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
        ['dropdown-search', inputValue],
        async () => {
            const results = await getAuthoritiesByName(inputValue);
            return results.authorities;
        },
        {
            enabled: isSearchMode && inputValue.length > 0,
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
    
    // Custom dropdown with Load More
    const MenuList = (props: MenuListProps<AuthorityOptionType, false>) => (
        <components.MenuList {...props} innerRef={(ref) => (menuRef.current = ref)}>
          {props.children}
          {hasMore && (
            <div
              style={loadMoreStyle}
              onClick={handleLoadMore}
            >
              {isFetchingNextPage ? 'Loading more...' : 'Load more'}
            </div>
          )}
        </components.MenuList>
    );

    return (
        <div style={selectStyle}>
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
    )
};