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
  padding: 8,
  borderRadius: 3,
});

const Contained = css({
  background: '#59B6A7',
});

const Outlined = css({
  border: "1px solid #cfcfcf"
})

const Text = css({
  background: '#cfcfcf'
})

const VariantStyles = {
  contained: Contained,
  outlined: Outlined,
  text: Text
}

const PrimaryColor = css({
  color: "#fff"
})

const SecondaryColor = css({
  color: "#fff"
})

const DefaultColor = css({
  color: "#fff"
})

const ColorStyles = {
  primary: PrimaryColor,
  secondary: SecondaryColor,
  default: DefaultColor
}

const ButtonStyled = styled(Core)(
  (props: Props) => (
    VariantStyles[props.variant]
  ),
  (props: Props) => (
    ColorStyles[props.color]
  )
);

export const Button = ({ children, color, variant }: Props): JSX.Element => {
  return (
    <ButtonStyled color={color} variant={variant}>
      {children}
    </ButtonStyled>
  );
};
