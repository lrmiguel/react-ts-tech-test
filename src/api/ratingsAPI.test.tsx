import { enableFetchMocks } from "jest-fetch-mock";
import { getAuthorities, getAuthoritiesByName, getEstablishmentRatings, getEstablishmentsByAuthority } from "./ratingsAPI";
import fetch from "jest-fetch-mock";

enableFetchMocks();

describe("Ratings API", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it("call the rating establishments api with the provided page number and return the data", async () => {
    // Given
    let pageNum = 1;
    let expected = { testing: "test" };
    fetch.mockResponseOnce(JSON.stringify(expected));
    // When
    let actual = await getEstablishmentRatings(pageNum);

    // Then
    expect(actual).toEqual(expected);
    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual(
      `http://api.ratings.food.gov.uk/Establishments/basic/${pageNum}/10`
    );
  });

  it("call the rating establishments api with the provided authority and pageNumber and return the data", async () => {
    // Given
    const authority = "95";
    let pageNum = 1;
    let expected = { testing: "test" };
    fetch.mockResponseOnce(JSON.stringify(expected));
    // When
    let actual = await getEstablishmentsByAuthority(authority, pageNum);

    // Then
    expect(actual).toEqual(expected);
    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual(
      `http://api.ratings.food.gov.uk/Establishments?localAuthorityId=${authority}&pageSize=10&pageNumber=${pageNum}`
    );
  });

  it("call the rating authorities api with the provided page number and return the data", async () => {
    // Given
    let pageNum = 1;
    let expected = { testing: "test" };
    fetch.mockResponseOnce(JSON.stringify(expected));
    // When
    let actual = await getAuthorities(pageNum);

    // Then
    expect(actual).toEqual(expected);
    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual(
      `http://api.ratings.food.gov.uk/Authorities/basic/${pageNum}/10`
    );
  });

  it("call the ratings api to filter the authorities by name and return the data", async () => {
    // Given
    let name = "test";
    let expected = { testing: "test" };
    fetch.mockResponseOnce(JSON.stringify(expected));
    // When
    let actual = await getAuthoritiesByName(name);

    // Then
    expect(actual).toEqual(expected);
    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual(
      `http://api.ratings.food.gov.uk/Authorities?name=${name}`
    );
  });
});
