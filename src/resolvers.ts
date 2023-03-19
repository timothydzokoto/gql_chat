import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";

export const resolvers = {
  Query: {
    allUsers: async (_, args, context) => {
      return await context.prisma.user.findMany({
        include: {
          posts: true,
          profile: true,
        },
      });
    },
    allPosts: async (_, args, context) => {
      return await context.prisma.post.findMany();
    },
    post: async (_, args, context) => {},
    allMessages: async (_, args, context) => {
      return await context.prisma.message.findMany();
    },
  },

  Mutation: {
    ////////////////////////////////////////////
    //////// AUTHENTICATION MUTATIONS /////////
    ////////////////////////////////////////////

    // LOGIN 0556133754
    login: async (_, args, context) => {
      const { email, password } = args;
      const user = await context.prisma.user.findUnique({
        where: { email },
      });

      if (!user) throw new Error("No such user found!");

      const isValid = await compare(password, user.password);

      if (!isValid) throw new Error("Invalid credentials!");

      const token = sign({ userId: user.id }, process.env.TOKEN_SECRET);

      return {
        token,
        user,
      };
    },

    // SIGN UP MUTATION
    signup: async (_, args, context) => {
      const { name, email, password } = args;

      const hashPassword = await hash(password, 10);
      const user = await context.prisma.user.create({
        data: { name, email, password: hashPassword },
      });

      const token = sign({ userId: user.id }, process.env.TOKEN_SECRET);
      return {
        token,
        user,
      };
    },

    ////////////////////////////////////////////
    //////// OTHER MUTATIONS /////////
    ////////////////////////////////////////////

    // ADD POST
    addPost: async (_, args, context) => {
      const { title, body, url } = args;
      const { userId } = context;

      const post = await context.prisma.post.create({
        data: {
          title,
          body,
          url,
          author: {
            connect: {
              id: userId,
            },
          },
        },
        include: {
          author: true,
        },
      });
      return post;
    },
  },
};
