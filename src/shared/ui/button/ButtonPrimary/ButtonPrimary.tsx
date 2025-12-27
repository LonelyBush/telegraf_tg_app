import { Button } from 'antd';
import type { CSSProperties, ReactNode } from 'react';

interface ButtonPrimaryProps {
  children: ReactNode;
  size?: 'large' | 'middle' | 'small';
  type: 'submit' | 'button';
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  style?: CSSProperties;
}

export const ButtonPrimary = ({
  children,
  size,
  loading,
  type,
  disabled,
  onClick,
  style,
}: ButtonPrimaryProps) => {
  return (
    <Button
      type="primary"
      size={size}
      loading={loading}
      disabled={disabled}
      onClick={onClick}
      htmlType={type}
      style={style}
    >
      {children}
    </Button>
  );
};
