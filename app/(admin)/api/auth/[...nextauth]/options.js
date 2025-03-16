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
        const user = { id: 1, name: "Admin", password: "admin", role: "admin" };

        if (
          credentials?.username === user.name &&
          credentials?.password === user.password
        ) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callback: {
    async jwt({token, user}) {
      if (user) {
        token.role = user.role
        return token
      }
    },
      async session({session, token}) {
        if (session.user) {
          session.user.role = token.role
          return session
        }
      }
    }
  }
};
