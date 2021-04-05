import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Global, css } from '@emotion/react';
import * as Icon from '../atom/icon';

interface Props {
  children: React.ReactNode;
  onClick?: (e) => void;
  enable?: boolean;
}

const OverlayStyled = styled.div({
    position: 'absolute',
    top: 0,
    left: '100%',
    // display: 'flex',
    height: '100%',
    maxWidth: 700,
    width: '55%',
    background: '#fff',
    zIndex: 100,
    // boxShadow: '0 0 30px rgb(0, 0, 0, 0.1)',
    transition: '.5s cubic-bezier(0.23, 1, 0.32, 1)',
  },
  (props:Props) => ({
    transform: props.enable ? 'translateX(-100%)': 'translateX(0)',
    boxShadow: props.enable ? '0 0 30px rgb(0, 0, 0, 0.1)' : 'none',
  })
)

const Head = styled.div({
  display: 'flex',
  borderBottom: '1px solid #eee',
  padding: 16
})

const Body = styled.div({
  padding: 16
})

const LeftSlideIcon = css({
  cursor: 'pointer',
});

export const Overlay = ({...props}: Props): JSX.Element => {
  return (
    <OverlayStyled enable={props.enable}>
      <Head>
        <Icon.LeftSlide css={LeftSlideIcon} onClick={props.onClick} />
      </Head>
      <Body>
        {props.children}
      </Body>
    </OverlayStyled>
  )
}