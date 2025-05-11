import { components } from "react-select";
import { useAuthoritiesDropdown } from "../../context/AuthoritiesDropDownContext";
import styles from "./CustomMenuList.module.css";

const CustomMenuList = (props: any) => {
    const ctx = useAuthoritiesDropdown();
    if (!ctx) throw Error("Context not exists");

    const { hasMore, handleLoadMore, isFetchingNextPage, menuRef } = ctx;
    
    return (
        <components.MenuList {...props} innerRef={(ref) => (menuRef.current = ref)}>
            {props.children}
            {hasMore && (
                <div
                    className={styles.loadMoreStyle}
                    onClick={handleLoadMore}
                >
                    {isFetchingNextPage ? 'Loading more...' : 'Load more'}
                </div>
            )}
        </components.MenuList>
    );
}
export default CustomMenuList;