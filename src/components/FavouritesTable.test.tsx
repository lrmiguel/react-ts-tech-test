import { render, screen, fireEvent } from "@testing-library/react";
import { FavouritesProvider, useFavourites } from "../context/FavouritesContext";
import FavouritesTable from "./FavouritesTable";

jest.mock("../context/FavouritesContext", () => {
    const originalModule = jest.requireActual("../context/FavouritesContext");
    return {
        ...originalModule,
        useFavourites: jest.fn(),
    };
});

describe("FavouritesTable", () => {
    const mockRemoveFavourite = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders nothing when there are no favourites", () => {
        (useFavourites as jest.Mock).mockReturnValue({
            favourites: [],
            removeFavourite: mockRemoveFavourite,
        });

        const { container } = render(
            <FavouritesProvider>
                <FavouritesTable />
            </FavouritesProvider>
        );

        expect(container.firstChild).toBeNull();
    });

    it("renders a list of favourites", () => {
        const favourites = [
            { id: "1", name: "Favourite 1", rating: "5" },
            { id: "2", name: "Favourite 2", rating: "4" },
        ];

        (useFavourites as jest.Mock).mockReturnValue({
            favourites,
            removeFavourite: mockRemoveFavourite,
        });

        render(
            <FavouritesProvider>
                <FavouritesTable />
            </FavouritesProvider>
        );

        expect(screen.getByText("Favourites")).toBeInTheDocument();
        expect(screen.getByText("Favourite 1")).toBeInTheDocument();
        expect(screen.getByText("Favourite 2")).toBeInTheDocument();
        expect(screen.getByText("5")).toBeInTheDocument();
        expect(screen.getByText("4")).toBeInTheDocument();
    });

    it("calls removeFavourite when the remove button is clicked", () => {
        const favourites = [{ id: "1", name: "Favourite 1", rating: "5" }];

        (useFavourites as jest.Mock).mockReturnValue({
            favourites,
            removeFavourite: mockRemoveFavourite,
        });

        render(
            <FavouritesProvider>
                <FavouritesTable />
            </FavouritesProvider>
        );

        const removeButton = screen.getByText("Remove");
        fireEvent.click(removeButton);

        expect(mockRemoveFavourite).toHaveBeenCalledWith("1");
    });
});