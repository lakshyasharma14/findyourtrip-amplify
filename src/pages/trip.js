import { GET_SLUGS_QUERY } from "../utils/graphql/queries";
import client from "../utils/apollo-client";

const Trip = (props) => {
  return (
    <div>
      <p>{props.trip[0].slug}</p>
    </div>
  );
};
export async function getStaticProps() {
  const { data } = await client.query({
    query: GET_SLUGS_QUERY,
  });
  return {
    props: {
      trip: data.trip,
    },
  };
}

export default Trip;
