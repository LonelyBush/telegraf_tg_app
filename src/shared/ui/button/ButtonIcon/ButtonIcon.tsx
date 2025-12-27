import { Button } from 'antd';
import type { ReactNode } from 'react';

interface ButtonIconsProps {
  icon: ReactNode;
  shape?: 'default' | 'circle' | 'round';
  size?: 'large' | 'middle' | 'small';
  loading?: boolean;
  type: 'submit' | 'button';
  color?: 'default' | 'primary' | 'danger' | 'blue';
  disabled?: boolean;
  onClick?: () => void;
}

export const ButtonIcon = ({
  size,
  icon,
  type,
  shape,
  color,
  loading,
  disabled,
  onClick,
}: ButtonIconsProps) => {
  return (
    <Button
      htmlType={type}
      variant="filled"
      color={color}
      size={size}
      shape={shape}
      loading={loading}
      disabled={disabled}
      onClick={onClick}
      icon={icon}
    ></Button>
  );
};
