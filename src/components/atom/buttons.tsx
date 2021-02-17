import React from 'react';
import styled from '@emotion/styled';
import { jsx, css } from '@emotion/react';
// import { JSXChildren } from "../../../core/type";

interface Props {
  children: React.ReactNode;
  color?: Color;
  variant: Variant;
}

export const Color = {
  primary: 'primary',
  secondary: 'secondary',
  default: 'default',
} as const;
type Color = typeof Color[keyof typeof Color];

export const Variant = {
  text: 'text',
  outlined: 'outlined',
  contained: 'contained',
};
type Variant = typeof Variant[keyof typeof Variant];

const Core = styled.button({
  outline: 'none',
  border: '0 none',
  borderRadius: 3,
  padding: '8px 16px',
  lineHeight: 1,
  cursor: 'pointer',
});

const ContainedpPrimary = css({
  background: '#59B6A7',
  color: '#fff',
});

const ContainedpSecondary = css({
  background: '#4a79bf',
  color: '#fff',
});

const ContainedpDefault = css({
  background: '#838484',
  color: '#fff',
});

const OutlinedPrimary = css({
  border: '2px solid #59B6A7',
  color: '#59B6A7',
  background: 'none',
});

const OutlinedSecondary = css({
  border: '2px solid #4a79bf',
  color: '#4a79bf',
  background: 'none',
});

const OutlinedDefault = css({
  border: '2px solid #838484',
  color: '#838484',
  background: 'none',
});

const TextPrimary = css({
  background: 'none',
  color: '#59B6A7',
});

const TextSecondary = css({
  background: 'none',
  color: '#4a79bf',
});

const TextDefault = css({
  background: 'none',
  color: '#838484',
});

const VariantStyles = {
  contained: {
    primary: ContainedpPrimary,
    secondary: ContainedpSecondary,
    default: ContainedpDefault,
  },
  outlined: {
    primary: OutlinedPrimary,
    secondary: OutlinedSecondary,
    default: OutlinedDefault,
  },
  text: {
    primary: TextPrimary,
    secondary: TextSecondary,
    default: TextDefault,
  },
};

const ButtonStyled = styled(Core)(
  (props: Props) => VariantStyles[props.variant][props.color]
);

const Label = styled.span({});

export const Button = ({ children, ...props }: Props): JSX.Element => {
  return (
    <ButtonStyled {...props}>
      <Label>{children}</Label>
    </ButtonStyled>
  );
};
