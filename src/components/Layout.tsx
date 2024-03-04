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
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 30px 100px 30px;
`;
