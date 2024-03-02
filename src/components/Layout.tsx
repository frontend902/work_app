import React from 'react';
import styled from 'styled-components';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return <Wrapper>{children}</Wrapper>;
};

export default Layout;

const Wrapper = styled.div`
  position: relative;
  width: 1280px;
  margin: 0 auto;
`;
