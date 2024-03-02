import React from 'react';
import styled from 'styled-components';

interface HeaderProps {
  setState: React.Dispatch<React.SetStateAction<string>>;
}

const Header = ({ setState }: HeaderProps) => {
  const handleOptions = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setState(e.target.value);
  };
  return (
    <Container>
      <Title>Hotel Contents</Title>
      <Tracking>
        <div>
          <span>처리 완료 :</span>
          <span>0</span>
        </div>
        <div>
          <span>처리 중 :</span>
          <span>0</span>
        </div>

        <div>
          <select name='options' id='options' onChange={handleOptions}>
            <option value='선택' disabled selected>
              선택
            </option>
            <option value='모두'>모두</option>
            <option value='질의중'>질의중</option>
            <option value='미처리'>미처리</option>
            <option value='처리중'>처리중</option>
            <option value='처리완료'>처리완료</option>
          </select>
        </div>
      </Tracking>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  margin-bottom: 20px;
`;

const Tracking = styled.div`
  display: flex;
  gap: 20px;

  span {
    margin-right: 5px;
  }
`;

const Title = styled.h1``;
