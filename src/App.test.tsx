import { render } from "@testing-library/react";
import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";
import { FavouritesProvider } from "./context/FavouritesContext";

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

test("renders learn react link", () => {
  render(
    <QueryClientProvider client={createQueryClient()}>
      <FavouritesProvider>
        <App />
      </FavouritesProvider>
    </QueryClientProvider>
  );
});
