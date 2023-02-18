import { client } from "@/apolloClient";
import { GET_CURRENT_USER } from "@/queries";
import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { NextAuthOptions } from "next-auth";
import { NextAuthOptionsCallback } from "types/next-auth";

export const authOptions: NextAuthOptionsCallback = (req, res) => {
  return {
    debug: false,
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
    session: {
      //Sets the session to use JSON Web Token
      strategy: "jwt",
      //Sets the max idle time before token expires in seconds - Currently 1hr
      maxAge: 3600,
    },
    callbacks: {
      session: async ({ session, token }) => {
        console.log(session);

        if (session?.user) {
          session.user.id = token.sub;
        }
        return session;
      },
    },
    events: {
      async signOut({ token, session }) {
        client.resetStore();
      },
    },
  };
};

const auth: any = (req: NextApiRequest, res: NextApiResponse) => {
  return NextAuth(req, res, authOptions(req, res));
};

export default auth;
