import { act, render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import * as ratingsAPI from "../../api/ratingsAPI";
import userEvent from "@testing-library/user-event";
import { AuthoritiesDropDown } from "./AuthoritiesDropDown";

jest.mock("../../api/ratingsAPI");

const mockData = [
    { Name: "Aberdeen City", LocalAuthorityId: 197 },
    { Name: "Aberdeenshire", LocalAuthorityId: 198 },
    { Name: "Adur", LocalAuthorityId: 277 },
    { Name: "Amber Valley", LocalAuthorityId: 48 },
    { Name: "Anglesey", LocalAuthorityId: 334 },
    { Name: "Angus", LocalAuthorityId: 199 },
    { Name: "Antrim and Newtownabbey", LocalAuthorityId: 132 },
    { Name: "Ards and North Down", LocalAuthorityId: 133 },
    { Name: "Argyll and Bute",	LocalAuthorityId: 200 },
    { Name: "Armagh City, Banbridge and Craigavon", LocalAuthorityId: 134 },
];
const secondPageData = [
    { Name: "Cambridge City", LocalAuthorityId: 1 },
    { Name: "City of London Corporation", LocalAuthorityId: 95 },
]
const filteredData = [
    { Name: "Cambridge City", LocalAuthorityId: 1 }, 
]

const createQueryClient = () => {
    return new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            cacheTime: 0, // disable cache
            staleTime: 0,
          },
        },
      });
}

function WrapperComponent({ onChange }: { onChange: (val: any) => void }) {
  
    return (
      <AuthoritiesDropDown
        onChange={onChange}
      />
    );
  }

describe("AuthoritiesDropDown", () => {
    beforeEach(() => {
        (ratingsAPI.getAuthorities as jest.Mock).mockImplementation(( pageParam: number ) => {
            return new Promise((resolve) =>
                setTimeout(() => {
                    if (pageParam === 1) {
                        resolve({ authorities: mockData });
                    } else if (pageParam === 2) {
                        resolve({ authorities: secondPageData });
                    } else {
                        resolve({ authorities: [] });
                    }
                }, 100)
            );
        });
        (ratingsAPI.getAuthoritiesByName as jest.Mock).mockImplementation((inputValue: string) => {
            return new Promise((resolve) =>
                setTimeout(() => {
                    resolve({ authorities: filteredData })
                }, 100)
            );
        });
    });

    it("filters establishments by selected authority", async () => {
        const queryClient = createQueryClient();
        const handleChange = jest.fn();
        render(
            <QueryClientProvider client={queryClient}>
                <WrapperComponent onChange={handleChange}/>
            </QueryClientProvider>
        );

        const dropdown = screen.getByText("Search or select...");
        userEvent.click(dropdown);

        // Wait for options to render and select one
        const option = await screen.findByText("Aberdeen City");
        userEvent.click(option);
        // Assert the callback was called with the selected value
        expect(handleChange).toHaveBeenCalledWith(
            expect.stringMatching("197")
        );
    });

    it("loads more authorities", async () => {
        const queryClient = createQueryClient();
        const handleChange = jest.fn();
        render(
            <QueryClientProvider client={queryClient}>
                <WrapperComponent onChange={handleChange}/>
            </QueryClientProvider>
        );

        const dropdown = screen.getByText("Search or select...");
        userEvent.click(dropdown);

        // assert second page items are not present before loading more
        expect(screen.queryByText("Cambridge City")).not.toBeInTheDocument();

        await act(() => new Promise((resolve) => setTimeout(resolve, 100)));
        const loadMoreOption = await screen.findByText("Load more");
        userEvent.click(loadMoreOption);

        expect(await screen.findByText("Loading more...")).toBeInTheDocument();
        await act(() => new Promise((resolve) => setTimeout(resolve, 100)));

        // after loading more
        expect(await screen.findByText("Cambridge City")).toBeInTheDocument();
    });

    it("searches by user input", async () => {
        const queryClient = createQueryClient();
        const handleChange = jest.fn();
        render(
            <QueryClientProvider client={queryClient}>
                <WrapperComponent onChange={handleChange}/>
            </QueryClientProvider>
        );

        const dropdown = screen.getByText("Search or select...");
        userEvent.click(dropdown);
        userEvent.type(dropdown, "Cam");
        await act(() => new Promise((resolve) => setTimeout(resolve, 100)));
        expect(await screen.findByText("Cambridge City")).toBeInTheDocument();
    });
});