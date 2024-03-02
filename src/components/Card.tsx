import React, { useState } from 'react';
import styled from 'styled-components';
import Bedge from './Bedge';
import { DocumentData } from 'firebase/firestore';
import TaskModal from './Modal/TaskModal';
import { ITask } from '../types';
import { makeTime } from '../utils';

const Card = (task: ITask) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(true);
  };

  return (
    <>
      <Container onClick={handleClick}>
        <BedgeContainer>
          <Bedge color='#E1AFD1'>{task.location}</Bedge>
          <Bedge color='#FFE6E6'>{task.person}</Bedge>
        </BedgeContainer>

        <HotelTitle>{task.hotel}</HotelTitle>
        <MailTitle>{task.mail}</MailTitle>
        <Progress color={task.state}>
          <span></span>
          {task.state}
        </Progress>
        {task.state === '처리중' && <Progress>{makeTime(new Date(task.createdAt))}</Progress>}
        {task.state === '처리완료' && <Progress>{makeTime(new Date(task.endedAt))}</Progress>}
      </Container>

      {isOpen && <TaskModal setOpen={setIsOpen} task={task} />}
    </>
  );
};

export default Card;

const Container = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 2%;
  height: 250px;
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
  font-size: 1.2rem;
  font-weight: 600;
`;

const Progress = styled.div<{ color?: string }>`
  display: flex;
  gap: 10px;
  align-items: center;

  span {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: ${(props) =>
      props.color === '미처리' ? 'red' : props.color === '처리중' ? 'gold' : '#82CD47'};
  }
`;
