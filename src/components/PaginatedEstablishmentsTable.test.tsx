import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { PaginatedEstablishmentsTable } from "./PaginatedEstablishmentsTable";
import * as ratingsAPI from "../api/ratingsAPI";

jest.mock("../api/ratingsAPI");

const mockData = [
    { BusinessName: "McDonald's", RatingValue: "4" },
    { BusinessName: "Burger King", RatingValue: "4" },
];

(ratingsAPI.getEstablishmentRatings as jest.Mock).mockResolvedValue({ establishments: mockData });

describe("PaginatedEstablishmentsTable", () => {
    beforeEach(() => {
        (ratingsAPI.getEstablishmentRatings as jest.Mock).mockImplementation(() => {
            return new Promise((resolve) =>
                setTimeout(() => resolve({ establishments: mockData }), 100)
            );
        });
    });

    /* Snapshot Tests */
    it("renders the table with updated font size", async () => {
        const { container } = render(<PaginatedEstablishmentsTable />);
        await screen.findByText("McDonald's");
        expect(container).toMatchSnapshot();
    });
    
    /* Unit and Integration Tests */
    it("renders loading state initially", async () => {
        render(<PaginatedEstablishmentsTable />);
        expect(screen.getByText("Loading...")).toBeInTheDocument();
        expect(await screen.findByText("McDonald's")).toBeInTheDocument();
    });

    it("shows loading when navigating to next page", async () => {
        render(<PaginatedEstablishmentsTable />);
        await screen.findByText("McDonald's");
        fireEvent.click(screen.getByText("+"));
        expect(await screen.findByText("Loading...")).toBeInTheDocument();
        
        await act(() => new Promise((resolve) => setTimeout(resolve, 100)));
        
        expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
        expect(await screen.findByText("McDonald's")).toBeInTheDocument();
    });

    it("shows loading when navigating to previous page", async () => {
        render(<PaginatedEstablishmentsTable />);
        await screen.findByText("McDonald's");

        fireEvent.click(screen.getByText("+"));
        expect(await screen.findByText("Loading...")).toBeInTheDocument();
        await act(() => new Promise((resolve) => setTimeout(resolve, 100)));
        expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
        expect(await screen.findByText("McDonald's")).toBeInTheDocument();

        // Simulate going back to the previous page

        fireEvent.click(screen.getByText("-"));
        expect(await screen.findByText("Loading...")).toBeInTheDocument();
        await act(() => new Promise((resolve) => setTimeout(resolve, 100)));
        expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
        expect(await screen.findByText("McDonald's")).toBeInTheDocument();
    });
})