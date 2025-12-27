import { Button } from 'antd';
import type { ReactNode } from 'react';

interface ButtonPrimaryProps {
  children: ReactNode;
  size?: 'large' | 'middle' | 'small';
  type: 'submit' | 'button';
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export const ButtonPrimary = ({
  children,
  size,
  loading,
  type,
  disabled,
  onClick,
}: ButtonPrimaryProps) => {
  return (
    <Button
      type="primary"
      size={size}
      loading={loading}
      disabled={disabled}
      onClick={onClick}
      htmlType={type}
    >
      {children}
    </Button>
  );
};
