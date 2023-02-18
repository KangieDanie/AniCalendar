import { client } from "@/apolloClient";
import { GET_CURRENT_USER } from "@/queries";
import NextAuth, { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  debug: true,
  providers: [
    {
      id: "AniListProvider",
      name: "AniList",
      type: "oauth",
      token: "https://anilist.co/api/v2/oauth/token",
      authorization: {
        url: "https://anilist.co/api/v2/oauth/authorize",
        params: { scope: "", response_type: "code" },
      },
      userinfo: {
        url: process.env.GRAPHQL_ENDPOINT,
        async request(context) {
          const { data } = await client.query<any>({
            query: GET_CURRENT_USER,
            context: {
              headers: {
                Authorization: "Bearer " + context.tokens.access_token,
              },
            },
          });

          return {
            name: data.Viewer.name,
            sub: data.Viewer.id,
            image: data.Viewer.avatar,
          };
        },
      },
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile?.name,
          image: profile.image,
        };
      },
    },
  ],
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
