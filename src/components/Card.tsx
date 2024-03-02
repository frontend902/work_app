import React, { useState } from 'react';
import styled from 'styled-components';
import Bedge from './Bedge';
import { DocumentData } from 'firebase/firestore';
import TaskModal from './Modal/TaskModal';

const Card = (db: DocumentData) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(true);
  };
  return (
    <>
      <Container onClick={handleClick}>
        <BedgeContainer>
          <Bedge color='#E1AFD1'>{db.location}</Bedge>
          <Bedge color='#FFE6E6'>{db.person}</Bedge>
        </BedgeContainer>

        <HotelTitle>{db.hotel}</HotelTitle>
        <MailTitle>{db.mail}</MailTitle>
        <Progress>{db.state}</Progress>
      </Container>

      {isOpen && <TaskModal setOpen={setIsOpen} db={db} />}
    </>
  );
};

export default Card;

const Container = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 20%;
  padding: 20px;
  border: 2px solid #ddd;
  border-radius: 20px;
`;

const BedgeContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
`;

const MailTitle = styled.p`
  margin: 0;
`;

const HotelTitle = styled.h2`
  margin: 0;
  font-size: 1rem;
`;

const Progress = styled.div`
  display: flex;
  gap: 10px;
`;
