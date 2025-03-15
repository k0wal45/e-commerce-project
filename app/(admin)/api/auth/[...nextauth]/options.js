import CredentialsProvider from "next-auth/providers/credentials";

export const options = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = { id: 1, name: "Admin" };

        if (
          credentials.username === "admin" &&
          credentials.password === "admin"
        ) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
};
