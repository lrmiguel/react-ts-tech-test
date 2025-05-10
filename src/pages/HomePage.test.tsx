import { render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import HomePage from "./HomePage";
import { MemoryRouter } from "react-router-dom";
import { FavouritesProvider } from "../context/FavouritesContext";

const createQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        cacheTime: 0,
        staleTime: 0,
      },
    },
  });
};

const renderWithProviders = () => {
  return render(
    <MemoryRouter>
      <QueryClientProvider client={createQueryClient()}>
        <FavouritesProvider>
          <HomePage />
        </FavouritesProvider>
      </QueryClientProvider>
    </MemoryRouter>
  );
};

describe("HomePage", () => {
  it("matches snapshot", () => {
    const { container } = renderWithProviders();
    expect(container).toMatchSnapshot();
  });
});