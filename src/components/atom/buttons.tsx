import React from 'react';
import styled from '@emotion/styled';
import { jsx, css } from '@emotion/react'
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

const Contained = css({
  background: '#59B6A7',
});

const Outlined = css({

})


const Text = css({
  
})

const Styles = {
  contained: Contained,
  outlined: Outlined,
  text: Text,
}

const PrimaryStyled = styled(Core)(
  (props: Props) => (
    Styles[props.variant]
  )
);

export const Button = ({ children, color, variant }: Props): JSX.Element => {
  return (
    <PrimaryStyled color={color} variant={variant}>
      {children}
    </PrimaryStyled>
  );
};
