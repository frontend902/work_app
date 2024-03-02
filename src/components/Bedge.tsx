import React from 'react';
import styled from 'styled-components';

interface bedgeProps {
  children: React.ReactNode;
  color?: string;
}

const Bedge = ({ children, color }: bedgeProps) => {
  return <Container color={color}>{children}</Container>;
};

export default Bedge;

const Container = styled.div<{ color?: string }>`
  padding: 5px 15px;
  text-align: center;
  font-weight: 600;
  font-size: 14px;
  line-height: 14px;
  border-radius: 30px;
  background-color: ${(props) => props.color};
`;
