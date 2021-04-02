import React from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';
import Logo from '../atom/logo';
import * as Icon from '../atom/icon';

const Title = styled.h1({
  display: 'flex',
  alignItems: 'center',
  fontSize: '1.2rem',
  justifyContent: 'space-between',
  color: '#59B6A7',
  margin: '0 0 auto 0',
});

const Github = styled.div({});

const NavStyled = styled.div({
  // width: 200,
  gridArea: 'Nav',
  padding: '30px 20px 30px',
  display: 'grid',
  gridTemplateRows: '70px 1fr 100px',
  boxShadow: '0 0 30px rgb(0, 0, 0, 0.1)',
  margin: '20px 20px 20px 40px',
  borderRadius: 10,
  background: '#fff',
});

const NavList = styled.div({
  // display: 'flex',
});

const Ul = styled.ul({
  padding: 0,
  color: '#59B6A7',
  fontWeight: 700,
  margin: 0,
  listStyle: 'none',
});

const Li = styled.li({
  padding: 0,
});

const LinkText = styled.a({
  display: 'block',
  fontSize: '1.3rem',
  color: '#59B6A7',
  padding: '10px 0',
  textDecoration: 'none',
});

const BottomLink = styled.div({
  marginTop: 'auto',
  color: '#59B6A7',
});

const LinkIcon = styled.a({
  color: '#59B6A7',
});

export const Nav = (): JSX.Element => {
  return (
    <NavStyled>
      <Title>
        <Logo />
        <span>Backlog Burnup</span>
      </Title>
      <NavList>
        <Ul>
          <Li>
            <Link href="/" passHref>
              <LinkText>HOME</LinkText>
            </Link>
          </Li>
        </Ul>
      </NavList>
      <BottomLink>
        <NavList>
          <Ul>
            <Li>
              <Link href="/about" passHref>
                <LinkText>ABOUT</LinkText>
              </Link>
            </Li>
            <Li>
              <Link href="/test" passHref>
                <LinkText>TEST</LinkText>
              </Link>
            </Li>
          </Ul>
        </NavList>
        <Github>
          <Link href="https://github.com/shomatan/backlog-burnup" passHref>
            <LinkIcon>
              <Icon.Github />
            </LinkIcon>
          </Link>
        </Github>
      </BottomLink>
    </NavStyled>
  );
};

export default Nav;
