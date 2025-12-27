import { Select, Spin } from 'antd';
import { useGetAllUsersQuery } from '../../../app/api/forumApi';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router';

export const FilterByUsers = () => {
  const { data: users, isLoading } = useGetAllUsersQuery();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentUser = Number(searchParams.get('userId')) || null;

  const transformedUsers = useMemo(() => {
    return users
      ? users.map((el) => ({ value: el.id, label: el.username }))
      : [];
  }, [users]);

  const handleChange = (value: number) => {
    setSearchParams((searchParams) => {
      searchParams.set('userId', `${value}`);
      return searchParams;
    });
  };

  const getDefaultVal =
    currentUser && transformedUsers[currentUser]
      ? transformedUsers[currentUser].value
      : null;

  return (
    <Select
      size="large"
      style={{ maxWidth: '40rem', width: '100%' }}
      showSearch
      defaultValue={getDefaultVal}
      onChange={handleChange}
      placeholder="Select user"
      optionFilterProp="label"
      notFoundContent={isLoading ? <Spin size="small" /> : 'No results found'}
      filterSort={(optionA, optionB) =>
        (optionA?.label ?? '')
          .toLowerCase()
          .localeCompare((optionB?.label ?? '').toLowerCase())
      }
      options={transformedUsers}
    />
  );
};
