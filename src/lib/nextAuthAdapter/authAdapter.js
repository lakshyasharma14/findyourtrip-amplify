/** @return { import("next-auth/adapters").Adapter } */

import {
  DELETE_ACCOUNT_FOR_PROVIDER,
  GET_USER_BY_ID,
  GET_USER_BY_PROVIDER,
  INSERT_USER,
  GET_USER_BY_EMAIL,
  UPDATE_USER,
  DELETE_USER,
  INSERT_ACCOUNT,
} from "./queries";

export default function AuthAdapter(client, options = {}) {
  return {
    async createUser(user) {
      const { data } = await client.mutate({
        mutation: INSERT_USER,
        variables: {
          object: {
            name: user.name,
            email: user.email,
            image: user.image,
            email_verified: user.emailVerified?.toISOString() ?? null,
            roles: "user",
          },
        },
      });
      return data.insert_users_one;
    },
    async getUser(id) {
      if (!id) return Promise.resolve(null);
      const { data } = await client.query({
        query: GET_USER_BY_ID,
        variables: { id: id },
      });
      return data.users[0];
    },
    async getUserByEmail(email) {
      if (!email) return Promise.resolve(null);
      const { data } = await client.query({
        query: GET_USER_BY_EMAIL,
        variables: { email },
      });
      return data.users[0];
    },
    async getUserByAccount({ providerAccountId, provider }) {
      const { data } = await client.query({
        query: GET_USER_BY_PROVIDER,
        variables: { provider: provider, provider_account_id: providerAccountId },
      });
      return data.accounts[0]?.user;
    },
    async updateUser(user) {
      return await client.mutate({
        mutation: UPDATE_USER,
        variables: {
          object: {
            name: user.name,
            email: user.email,
            image: user.image,
            email_verified: user.emailVerified?.toISOString() ?? null,
            roles: "user",
            ...user,
          },
        },
      });
    },
    async deleteUser(userId) {
      return await client.mutate({ mutation: DELETE_USER, variables: { id: id } });
    },
    async linkAccount(account) {
      return await client.mutate({
        mutation: INSERT_ACCOUNT,
        variables: {
          object: {
            user_id: account.userId,
            provider: account.provider,
            type: account.type,
            provider_account_id: account.providerAccountId,
            refresh_token: "",
            access_token: account.access_token,
            expires_at: account.expires_at,
          },
        },
      });
    },
    async unlinkAccount({ providerAccountId, provider }) {
      return await client.mutate({
        mutation: DELETE_ACCOUNT_FOR_PROVIDER,
        variables: { provider: providerId, provider_account_id: providerAccountId },
      });
    },
    async createSession({ sessionToken, userId, expires }) {
      return;
    },
    async getSessionAndUser(sessionToken) {
      return;
    },
    async updateSession({ sessionToken }) {
      return;
    },
    async deleteSession(sessionToken) {
      return;
    },
    async createVerificationToken({ identifier, expires, token }) {
      return;
    },
    async useVerificationToken({ identifier, token }) {
      return;
    },
  };
}
