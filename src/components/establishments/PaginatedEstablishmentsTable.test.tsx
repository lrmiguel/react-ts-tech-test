import { render, screen, fireEvent, act } from "@testing-library/react";
import * as ratingsAPI from "../../api/ratingsAPI";
import { QueryClient, QueryClientProvider } from "react-query";
import { FavouritesProvider } from "../../context/FavouritesContext";
import { PaginatedEstablishmentsTable } from "./PaginatedEstablishmentsTable";

jest.mock("../../api/ratingsAPI");

const mockData = [
    { BusinessName: "McDonald's", RatingValue: "4" },
    { BusinessName: "Burger King", RatingValue: "4" },
];

const mockSelectedData = [
    { BusinessName: "14 Hills", RatingValue: "5" },
    { BusinessName: "Acai Berry The Amazon Boost", RatingValue: "5" },
];

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
        
describe("PaginatedEstablishmentsTable", () => {
    beforeEach(() => {
        (ratingsAPI.getEstablishmentRatings as jest.Mock).mockImplementation(() => {
            return new Promise((resolve) =>
                setTimeout(() => resolve({ establishments: mockData }), 100)
            );
        });
        (ratingsAPI.getEstablishmentsByAuthority as jest.Mock).mockImplementation((authority) => {
            return new Promise((resolve) =>
                setTimeout(() => resolve({ establishments: mockSelectedData }), 100)
            );
        });
    });

    it("renders loading state initially", async () => {
        const queryClient = createQueryClient();
        render(
            <QueryClientProvider client={queryClient}>
                <FavouritesProvider>
                    <PaginatedEstablishmentsTable />
                </FavouritesProvider>
            </QueryClientProvider>
        );
        expect(await screen.findByText("Loading...")).toBeInTheDocument();
        expect(await screen.findByText("McDonald's")).toBeInTheDocument();
    });

    it("shows loading when navigating to next page", async () => {
        const queryClient = createQueryClient();
        render(
            <QueryClientProvider client={queryClient}>
                <FavouritesProvider>
                    <PaginatedEstablishmentsTable />
                </FavouritesProvider>
            </QueryClientProvider>
        );
        await screen.findByText("McDonald's");
        fireEvent.click(screen.getByText("+"));
        expect(await screen.findByText("Loading...")).toBeInTheDocument();
        
        await act(() => new Promise((resolve) => setTimeout(resolve, 100)));
        
        expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
        expect(await screen.findByText("McDonald's")).toBeInTheDocument();
    });

    it("uses cache when navigating to previous page", async () => {
        const queryClient = createQueryClient();
        render(
            <QueryClientProvider client={queryClient}>
                <FavouritesProvider>
                    <PaginatedEstablishmentsTable />
                </FavouritesProvider>
            </QueryClientProvider>
        );
        await screen.findByText("McDonald's");

        fireEvent.click(await screen.findByText("+"));
        expect(await screen.findByText("Loading...")).toBeInTheDocument();
        await act(() => new Promise((resolve) => setTimeout(resolve, 100)));
        expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
        expect(await screen.findByText("McDonald's")).toBeInTheDocument();

        // Simulate going back to the previous page

        fireEvent.click(screen.getByText("-"));
        expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
        await act(() => new Promise((resolve) => setTimeout(resolve, 100)));
        expect(await screen.findByText("McDonald's")).toBeInTheDocument();
    });

    it("filters list by selected authority", async () => {
        const queryClient = createQueryClient();
        render(
            <QueryClientProvider client={queryClient}>
                <FavouritesProvider>
                    <PaginatedEstablishmentsTable authority="95" />
                </FavouritesProvider>
            </QueryClientProvider>
        );
        expect(await screen.findByText("Loading...")).toBeInTheDocument();
        expect(await screen.findByText("Acai Berry The Amazon Boost")).toBeInTheDocument();
    });
    
})