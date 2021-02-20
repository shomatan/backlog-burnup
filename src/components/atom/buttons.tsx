import React from 'react';
import styled from '@emotion/styled';
import { jsx, css } from '@emotion/react';
// import { JSXChildren } from "../../../core/type";
import * as Config from '../_config/color';

interface Props {
  children: React.ReactNode;
  onClick?: (e) => void;
  color?: Color;
  variant: Variant;
  fullWidth?: boolean;
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
  cursor: 'pointer',
});

const Label = styled.span({
  display: 'flex',
  lineHeight: 1,
});

const ContainedpPrimary = css({
  background: Config.Color.primary,
  color: '#fff',
  '&:hover': {
    background: Config.Color.button.hover.primary,
  },
});

const ContainedpSecondary = css({
  background: Config.Color.secondary,
  color: '#fff',
  '&:hover': {
    background: Config.Color.button.hover.secondary,
  },
});

const ContainedpDefault = css({
  background: Config.Color.default,
  color: '#fff',
  '&:hover': {
    background: Config.Color.button.hover.default,
  },
});

const OutlinedPrimary = css({
  border: `2px solid ${Config.Color.primary}`,
  background: 'none',
  color: `${Config.Color.primary}`,
});

const OutlinedSecondary = css({
  border: `2px solid ${Config.Color.secondary}`,
  background: 'none',
  color: `${Config.Color.secondary}`,
});

const OutlinedDefault = css({
  border: `2px solid ${Config.Color.default}`,
  background: 'none',
  color: `${Config.Color.default}`,
});

const TextPrimary = css({
  background: 'none',
  color: `${Config.Color.primary}`,
});

const TextSecondary = css({
  background: 'none',
  color: `${Config.Color.secondary}`,
});

const TextDefault = css({
  background: 'none',
  color: `${Config.Color.default}`,
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
  (props: Props) => VariantStyles[props.variant][props.color],
  (props: Props) => ({
    width: props.fullWidth ? '100%' : 'auto',
  })
);

export const Button = ({ children, ...props }: Props): JSX.Element => {
  return (
    <ButtonStyled {...props}>
      <Label>{children}</Label>
    </ButtonStyled>
  );
};
