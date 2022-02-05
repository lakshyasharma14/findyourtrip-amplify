import gql from "graphql-tag";

export const GET_USER_BY_EMAIL = gql`
  query getUserById($email: String!) {
    users(limit: 1, where: { email: { _eq: $email } }) {
      email
      email_verified
      id
      image
      name
      roles
    }
  }
`;
export const GET_USER_BY_PROVIDER = gql`
  query getUserById($provider_id: String!, $provider_account_id: String!) {
    users(limit: 1) {
      email
      email_verified
      id
      image
      name
      roles
    }
    accounts(
      where: {
        provider_id: { _eq: $provider_id }
        provider_account_id: { _eq: $provider_account_id }
      }
    ) {
      user_id
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query getUserById($id: Int!) {
    users(limit: 1, where: { id: { _eq: $id } }) {
      email
      email_verified
      id
      image
      name
      roles
    }
  }
`;

export const INSERT_USER = gql`
  mutation insertUser($object: users_insert_input = {}) {
    insert_users_one(object: $object) {
      email
      email_verified
      image
      name
      roles
      id
    }
  }
`;

export const INSERT_ACCOUNT = gql`
  mutation insertAccount($object: accounts_insert_input = {}) {
    insert_accounts_one(object: $object) {
      email
      email_verified
      image
      name
      roles
      id
    }
  }
`;
export const UPDATE_USER = gql`
  mutation updateUser($id: Int!, $object: users_insert_input!) {
    update_users(where: { id: { _eq: $id } }, _set: $object) {
      affected_rows
      returning {
        email
        email_verified
        id
        image
        name
        roles
      }
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($id: Int_comparison_exp = {}) {
    delete_users(where: { id: $id }) {
      returning {
        id
      }
    }
  }
`;

export const DELETE_ACCOUNT_FOR_PROVIDER = gql`
  mutation deleteAccountForProvider(
    $provider_id: String_comparison_exp = {}
    $provider_account_id: String_comparison_exp = {}
  ) {
    delete_accounts(
      where: { provider_id: $provider_id, provider_account_id: $provider_account_id }
    ) {
      returning {
        id
        user_id
      }
    }
  }
`;
