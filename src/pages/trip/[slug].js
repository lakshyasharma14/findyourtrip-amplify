import { useQuery, gql } from "@apollo/client";
import { GET_TRIP_FOR_SLUG_QUERY, GET_SLUGS_QUERY } from "../../utils/graphql/queries";
import client from "../../lib/apollo/apolloServerClient";

const TripDetails = () => {
  return <div></div>;
};
export const getStaticProps = async ({ params }) => {
  const { data } = await client.query({
    query: GET_TRIP_FOR_SLUG_QUERY,
    variables: { slug: params.slug },
  });
  return {
    props: {
      trip: data.trip,
    },
  };
};
export async function getStaticPaths() {
  const { data } = await client.query({
    query: GET_SLUGS_QUERY,
  });
  return {
    paths: [{ params: { slug: data.trip[0].slug } }],
    fallback: false,
  };
}
export default TripDetails;
