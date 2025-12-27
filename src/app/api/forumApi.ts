import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { type Posts, type User } from '../interfaces/api';

export const forumApi = createApi({
  reducerPath: 'forumApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com/',
  }),
  endpoints: (build) => ({
    getAllPosts: build.query<Posts[], void>({
      async queryFn(arg, queryApi, extraOptions, baseQuery) {
        const postsResult = await baseQuery('posts');
        if (postsResult.error) {
          return { error: postsResult.error };
        }
        const posts = postsResult.data as Posts[];

        const usersResult = await baseQuery('users');
        const users = usersResult.data as User[];
        const enhancedPosts = users
          ? posts.map((post) => ({
              ...post,
              userName:
                users.find((user) => user.id === post.userId)?.username ?? '',
            }))
          : posts;

        return { data: enhancedPosts };
      },
    }),
    getPost: build.query<Posts, number>({
      async queryFn(arg, queryApi, extraOptions, baseQuery) {
        const postsResult = await baseQuery(`posts/${arg}`);
        if (postsResult.error) {
          return { error: postsResult.error };
        }
        const posts = postsResult.data as Posts;

        const userResult = await baseQuery(`users/${posts.userId}`);
        const user = userResult.data as User;

        return { data: { ...posts, userName: user.username } };
      },
    }),
    getPostComments: build.query<Posts, string>({
      query: (num) => `posts/${num}/comments`,
    }),
    getPostByUserId: build.query<Posts, string>({
      query: (num) => `posts?userId=${num}`,
    }),
    getAllUsers: build.query<User[], void>({
      query: () => `users`,
    }),
  }),
});

export const {
  useGetAllPostsQuery,
  useGetPostQuery,
  useGetPostCommentsQuery,
  useGetPostByUserIdQuery,
  useGetAllUsersQuery,
} = forumApi;
