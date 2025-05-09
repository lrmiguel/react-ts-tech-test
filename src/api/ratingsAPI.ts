type RatingsMetadataType = {
  dataSource: string;
  extractDate: string;
  itemCount: number;
  returncode: string;
  totalCount: number;
  totalPages: number;
  pageSize: number;
  pageNumber: number;
};

type LinkType = {
  rel: string;
  href: string;
};

export type EstablishmentsType = {
  establishments: {}[];
  meta: RatingsMetadataType;
  links: LinkType[];
};

export type AuthorityType = {
  Name: string;
  LocalAuthorityId: number;
}

export type AuthoritiesType = {
  authorities: AuthorityType[];
  meta?: RatingsMetadataType;
  links?: LinkType[];
};

export function getEstablishmentRatings(
  pageNum: number
): Promise<EstablishmentsType> {
  return fetch(
    `http://api.ratings.food.gov.uk/Establishments/basic/${pageNum}/10`,
    { headers: { "x-api-version": "2" } }
  ).then((res) => res.json());
}

export function getEstablishmentsByAuthority(
  authority: string,
  pageNum: number
): Promise<EstablishmentsType> {
  return fetch(
    `http://api.ratings.food.gov.uk/Establishments?localAuthorityId=${authority}&pageSize=10&pageNumber=${pageNum}`,
    { headers: { "x-api-version": "2" } }
  ).then((res) => res.json())
}

export function getAuthorities(
  pageNum: number
): Promise<AuthoritiesType> {
  return fetch(
    `http://api.ratings.food.gov.uk/Authorities/basic/${pageNum}/10`,
    { headers: { "x-api-version": "2" } }
  ).then((res) => res.json())
}

export function getAuthoritiesByName(
  name: string,
): Promise<AuthoritiesType> {
  // neither pageSize or pageNumber parameters are being applied when sent to the API
  return fetch(
    `http://api.ratings.food.gov.uk/Authorities?name=${name}`,
    { headers: { "x-api-version": "2" } }
  ).then((res) => res.json())
}