import { act, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import * as ratingsAPI from "../api/ratingsAPI";
import EstablishmentDetailPage from "./EstablishmentDetailPage";

// Mock the ratingsAPI module
jest.mock("../api/ratingsAPI", () => ({
    getEstablishmentById: jest.fn(),
}));
import userEvent from "@testing-library/user-event";
import { FavouritesProvider } from "../context/FavouritesContext";

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
const renderWithProviders = (id: string, queryClient: QueryClient) => {
    return render(
        <MemoryRouter initialEntries={[`/establishments/${id}`]}>
            <Route path="/establishments/:id">
                <QueryClientProvider client={queryClient}>
                    <FavouritesProvider>
                        <EstablishmentDetailPage />
                    </FavouritesProvider>
                </QueryClientProvider>
            </Route>
        </MemoryRouter>
    );
};

describe("EstablishmentDetailPage", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    
    it("matches snapshot", async () => {
        const mockData = {
            BusinessName: "Test Business",
            AddressLine1: "123 Test Street", 
            AddressLine2: "Test Area",
            AddressLine3: "",
            AddressLine4: "",
            RatingValue: "5",
            RatingDate: "2023-01-01T00:00:00",
        };
        (ratingsAPI.getEstablishmentById as jest.Mock).mockResolvedValue(mockData);

        const { container } = renderWithProviders("123", createQueryClient());

        await waitFor(() => {
            expect(screen.getByText("Test Business")).toBeInTheDocument();
        });

        expect(container).toMatchSnapshot();
    });

    it("renders loading state initially", () => {
        (ratingsAPI.getEstablishmentById as jest.Mock).mockReturnValue(new Promise(() => {}));
        renderWithProviders("123", createQueryClient());

        expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    it("renders establishment details when data is fetched successfully", async () => {
        const mockData = {
            BusinessName: "Test Business",
            AddressLine1: "123 Test Street",
            AddressLine2: "Test Area",
            AddressLine3: "",
            AddressLine4: "",
            RatingValue: "5",
            RatingDate: "2023-01-01T00:00:00",
        };
        (ratingsAPI.getEstablishmentById as jest.Mock).mockImplementation(() => {
            return new Promise((resolve) =>
                setTimeout(() => resolve(mockData), 100)
            );
        });

        renderWithProviders("123", createQueryClient());

        await act(() => new Promise((resolve) => setTimeout(resolve, 100)));
        await waitFor(() => {
            expect(screen.getByText("Establishment Details")).toBeInTheDocument();
            expect(screen.getByText("Test Business")).toBeInTheDocument();
            expect(screen.getByText(/123 Test Street.*Test Area/)).toBeInTheDocument();
            expect(screen.getByText("5")).toBeInTheDocument();
            expect(screen.getByText("01/01/2023")).toBeInTheDocument();
        });
    });

    it("renders error message when API call fails", async () => {
        (ratingsAPI.getEstablishmentById as jest.Mock).mockRejectedValue("Failed to fetch");

        renderWithProviders("123", createQueryClient());

        await waitFor(() => {
            expect(screen.getByText(/Error:/)).toBeInTheDocument();
        });
    });

    it("navigates back to the home page when 'Go back' button is clicked", async () => {
        const mockData = {
            BusinessName: "Test Business",
            AddressLine1: "123 Test Street",
            AddressLine2: "Test Area",
            AddressLine3: "",
            AddressLine4: "",
            RatingValue: "5",
            RatingDate: "2023-01-01",
        };
        (ratingsAPI.getEstablishmentById as jest.Mock).mockResolvedValue(mockData);

        renderWithProviders("123", createQueryClient());

        await waitFor(() => {
            expect(screen.getByText("Go back")).toBeInTheDocument();
        });

        userEvent.click(screen.getByText("Go back"));

        await waitFor(() => {
            expect(window.location.pathname).toBe("/");
        });
    });
    
});