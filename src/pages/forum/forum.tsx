import { Empty, Flex, Spin } from 'antd';
import { CustomPagination } from '../../shared/components/pagination/pagination';
import { Post } from '../../entities/post/post';
import style from './forum.module.css';
import { useGetAllPostsQuery } from '../../app/api/forumApi';
import { Outlet, useSearchParams } from 'react-router';
import { FilterByUsers } from '../../shared/components/filters/forumFilters';
import { ButtonPrimary } from '../../shared/ui/button/ButtonPrimary/ButtonPrimary';
import { useState } from 'react';
import { CreatePostModal } from '../../shared/components/modals/createPostModal';
import { useOutlet } from 'react-router';

export const Forum = () => {
  const [isShow, setShowModal] = useState(false);
  const pageSize = 10;
  const { data: posts } = useGetAllPostsQuery();
  const outlet = useOutlet();
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const currentUser = Number(searchParams.get('userId')) || null;

  const filteredPosts = !currentUser
    ? posts
    : posts?.filter((el) => currentUser === el.userId);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const paginatedPosts = filteredPosts?.slice(startIndex, endIndex) ?? [];

  if (outlet) {
    return <Outlet />;
  }
  return (
    <>
      <Flex
        vertical
        justify="space-between"
        flex="1"
        className={style.forumContainer}
      >
        <Flex wrap align="center" justify="space-between">
          <FilterByUsers />
          <ButtonPrimary
            size="large"
            type="button"
            onClick={() => {
              setShowModal(true);
            }}
          >
            Create post
          </ButtonPrimary>
        </Flex>
        <Flex
          wrap
          gap="middle"
          justify="flex-start"
          className={style.postsContainer}
        >
          {filteredPosts === undefined ? (
            <Spin size="large" />
          ) : filteredPosts.length > 0 ? (
            paginatedPosts.map(({ title, body, id, userName }) => (
              <Post
                key={`${title}_${id}`}
                id={id}
                title={title}
                body={body}
                userName={userName}
              />
            ))
          ) : (
            <Empty />
          )}
        </Flex>
        <CustomPagination
          pageSize={pageSize}
          dataLength={filteredPosts ? filteredPosts.length : 0}
        />
      </Flex>
      <CreatePostModal setOpenModal={setShowModal} open={isShow} />
    </>
  );
};
