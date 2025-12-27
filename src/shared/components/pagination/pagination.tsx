import { Pagination, type PaginationProps } from 'antd';
import { useSearchParams } from 'react-router';

interface CustomPaginationProps {
  pageSize: number;
  dataLength: number;
}

export const CustomPagination = ({
  pageSize,
  dataLength,
}: CustomPaginationProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const handleCurrent: PaginationProps['onChange'] = (page) => {
    setSearchParams((searchParams) => {
      searchParams.set('page', `${page}`);
      return searchParams;
    });
  };
  const totalPages = Math.ceil(dataLength / pageSize);

  return (
    <Pagination
      total={totalPages * pageSize}
      pageSize={pageSize}
      align="center"
      showSizeChanger={false}
      current={currentPage}
      onChange={handleCurrent}
    />
  );
};
