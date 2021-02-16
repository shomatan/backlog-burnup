import React from 'react';
import styled from '@emotion/styled';
// import { JSXChildren } from "../../../core/type";

interface Props {
  children: React.ReactNode;
  color?: Color;
  variant?: Variant;
}

export enum Color {
  primary = 'primary',
  secondary = 'secondary',
  default = 'default',
}

export enum Variant {
  text = 'text',
  outlined = 'outlined',
  contained = 'contained',
}

const Core = styled.button({
  outline: 'none',
  border: '0 none',
  borderRadius: 3,
});

const Contained = {
  background: '#59B6A7',
};

const PrimaryStyled = styled(Core)(
  {
    background: '#59B6A7',
  },
  (props: Props) => ({
    color: props.variant === Variant.contained ? '#fff' : '#444',
  })
);

export const Button = ({ children, color, variant }: Props): JSX.Element => {
  return (
    <PrimaryStyled color={color} variant={variant}>
      {children}
    </PrimaryStyled>
  );
};
