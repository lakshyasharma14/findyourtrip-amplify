// import { useQuery, gql } from "@apollo/client";

// export const TripDetails = () => {
//   return <div></div>;
// };
// export const getStaticPaths = async () => {
//   const resp = await fetch("All slugs");
//   const client = graphqlClient(); //
//   const { data } = await client.query({ query: YOUR_QUERY });
//   return {
//     paths,
//     fallback: false,
//   };
// };
// export const getStaticProps = async (context) => {
//   const id = context.paths;
//   const client = graphqlClient(); //
//   const { data } = await client.query({ query: YOUR_QUERY });

//   return {
//     props: { trip: data },
//   };
// };
// const GET_MY_TODOS = gql`
//   query getMyTodos {
//     todos(where: { is_public: { _eq: false } }, order_by: { created_at: desc }) {
//       id
//       title
//       created_at
//       is_completed
//     }
//   }
// `;
