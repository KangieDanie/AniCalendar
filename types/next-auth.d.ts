import NextAuth from "next-auth";

declare module "next-auth" {
  interface UserImage {
    medium: string;
    large: string;
  }
  interface Session {
    user: {
      id: string | undefined;
      image: UserImage;
      name: string;
    };
  }
}
