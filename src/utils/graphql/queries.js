import gql from "graphql-tag";

export const GET_TRIPS_QUERY = gql`
  query getTrips {
    trip(where: { is_active: { _eq: true } }) {
      id
      images_url
      is_active
      duration
      location
      name
      price
      rating
      review_count
      slug
    }
  }
`;

export const GET_SLUGS_QUERY = gql`
  query getSlugs {
    trip(where: { is_active: { _eq: true } }) {
      slug
    }
  }
`;

export const GET_TRIP_FOR_SLUG_QUERY = gql`
  query getTripForSlug($slug: String!) {
    trip(where: { is_active: { _eq: true }, slug: { _eq: $slug } }, limit: 1) {
      id
      images_url
      is_active
      duration
      location
      name
      price
      rating
      review_count
      slug
      org_id
      tags
      theme_id
      type_id
    }
  }
`;
