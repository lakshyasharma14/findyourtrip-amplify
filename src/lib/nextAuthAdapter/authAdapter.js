/** @return { import("next-auth/adapters").Adapter } */

import {
  DELETE_ACCOUNT_FOR_PROVIDER,
  GET_USER_BY_ID,
  GET_USER_BY_PROVIDER,
  INSERT_USER,
  GET_USER_BY_EMAIL,
  UPDATE_USER,
  DELETE_USER,
} from "./queries";

export default function AuthAdapter(client) {
  return {
    async getAdapter({ session, secret, ...appOptions }) {
      return {
        displayName: "APOLLO",
        createUser(profile) {
          console.log("---create uset-----" + JSON.stringify(client));
          return client.query({
            query: INSERT_USER,
            variables: {
              user: {
                name: profile.name,
                email: profile.email,
                image: profile.image,
                emailVerified: profile.emailVerified?.toISOString() ?? null,
                roles: "user",
                ...profile,
              },
            },
          });
        },

        getUser(id) {
          if (!id) return Promise.resolve(null);
          return client.query({
            query: GET_USER_BY_ID,
            variables: { id: id },
          });
        },

        getUserByEmail(email) {
          if (!email) return Promise.resolve(null);
          return client.query({
            query: GET_USER_BY_EMAIL,
            variables: { email: email },
          });
        },

        async getUserByProviderAccountId(providerId, providerAccountId) {
          return client.query({
            query: GET_USER_BY_PROVIDER,
            variables: { provider_id: providerId, provider_account_id: providerAccountId },
          });
        },

        updateUser(user) {
          return client.query({
            query: UPDATE_USER,
            variables: {
              user: {
                name: user.name,
                email: user.email,
                image: user.image,
                emailVerified: user.emailVerified?.toISOString() ?? null,
                roles: "user",
                ...profile,
              },
            },
          });
        },

        async deleteUser(userId) {
          await client.query({ query: DELETE_USER, variables: { id: id } });
        },

        async linkAccount(
          userId,
          providerId,
          providerType,
          providerAccountId,
          refreshToken,
          accessToken,
          accessTokenExpires
        ) {
          await client.query({
            query: INSERT_ACCOUNT,
            variables: {
              account: {
                userId,
                providerId,
                providerType,
                providerAccountId,
                refreshToken,
                accessToken,
                accessTokenExpires,
              },
            },
          });
        },

        async unlinkAccount(_, providerId, providerAccountId) {
          await client.query({
            query: DELETE_ACCOUNT_FOR_PROVIDER,
            variables: { provider_id: providerId, provider_account_id: providerAccountId },
          });
        },

        createSession(user) {
          return;
        },

        async getSession(sessionToken) {
          return;
        },

        async updateSession(session, force) {
          return;
        },

        async deleteSession(sessionToken) {
          return;
        },

        async createVerificationRequest(identifier, url, token, _, provider) {
          return;
        },

        async getVerificationRequest(identifier, token) {
          return;
        },

        async deleteVerificationRequest(identifier, token) {
          return;
        },
      };
    },
  };
}
