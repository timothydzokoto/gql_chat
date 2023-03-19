import { gql } from "apollo-server";

export const typeDefs = gql`
  type User {
    id: String!
    name: String
    email: String!
    password: String
    profile: ExtendedProfile
    posts: [Post!]
    messages: [Message!]
    likes: [Like!]
    replies: [Reply!]
    comments: [Comment!]
  }

  type ExtendedProfile {
    id: Int!
    user: User
    userId: String
    bio: String
    imageUrl: String
  }

  type Post {
    id: Int!
    author: User
    authorId: Int
    title: String
    body: String
    url: String
    likes: [Like]
    comments: [Comment]
  }

  type Message {
    id: Int!
    user: User
    userId: String
    body: String
    replies: [Reply]
  }

 

  type Reply {
    id: Int!
    body: String
    message: Message
    messageId: Int
    user: User
    userId: String
  }

  type Like {
    id: Int!
    post: Post
    postId: Int
    user: User
    userId: String
    status: Boolean
  }

  type Comment {
    id: Int!
    body: String
    post: Post
    postId: Int
    user: User
    userId: String
  }

  type AuthPayload {
    token: String
    user: User
  }

  type Query {
    allUsers: [User]
    allPosts: [Post]
    post: Post!
    allMessages: [Message]
  }

  type Mutation {
    addPost(title: String, body: String!, url: String): Post!
    likePost(postId: Int!): Post!
    signup(name: String!, email: String!, password: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload
  }
`;
