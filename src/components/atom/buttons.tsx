import React from 'react';
import styled from '@emotion/styled';
// import { JSXChildren } from "../../../core/type";

interface Props {
  children: React.ReactNode;
  color?: ColorTypes;
}

export enum ColorTypes {
  primary = 'primary',
  secondary = 'secondary',
  default = 'default',
}

const Core = styled.button({
  outline: 'none',
  border: '0 none',
  borderRadius: 3,
});

const PrimaryStyled = styled(Core)({
  background: '#59B6A7',
});

export const Button = ({ children }: Props): JSX.Element => {
  return <PrimaryStyled>{children}</PrimaryStyled>;
};
