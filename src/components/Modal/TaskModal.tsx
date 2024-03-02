import React, { useState } from 'react';
import styled from 'styled-components';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import Bedge from '../Bedge';
import { ITask } from '../../types';
import { makeTime } from '../../utils';

interface AddModalProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  task: ITask;
}

const TaskModal = ({ setOpen, task }: AddModalProps) => {
  const { createdAt, endedAt, hotel, id, location, mail, option, person, state, textarea } = task;
  const [progress, setProgress] = useState(state);

  const handleClick = async () => {
    await updateDoc(doc(db, 'tasks', id), {
      state: progress,
    });

    if (progress === '처리중') {
      await updateDoc(doc(db, 'tasks', id), {
        state: progress,
        createdAt: Date.now(),
      });
    } else if (progress === '처리완료') {
      await updateDoc(doc(db, 'tasks', id), {
        state: progress,
        endedAt: Date.now(),
      });
    }

    setOpen(false);
  };

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, 'tasks', id));
    } catch (e) {
      console.log(e);
    } finally {
      setOpen(false);
    }
  };

  const handleOptions = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProgress(e.target.value);
  };

  return (
    <Container>
      <Overlay></Overlay>

      <Modal>
        <BedgeContainer>
          <Bedge color='#AD88C6'>{option}</Bedge>
          <Bedge color='#E1AFD1'>{location}</Bedge>
          <Bedge color='#FFE6E6'>{person}</Bedge>
        </BedgeContainer>
        <h2>{hotel}</h2>
        <p>{mail}</p>
        <Header>
          <div>
            <p>
              <span>시작 시간_</span>
              {createdAt !== '-' && <span>{makeTime(new Date(createdAt))}</span>}
            </p>
            <p>
              <span>완료 시간_</span>
              {endedAt !== '-' && <span>{makeTime(new Date(endedAt))}</span>}
            </p>
          </div>
          <select name='options' id='options' onChange={handleOptions}>
            <option value={state} disabled selected>
              {state}
            </option>
            <option value='질의중'>질의중</option>
            <option value='미처리'>미처리</option>
            <option value='처리중'>처리중</option>
            <option value='처리완료'>처리완료</option>
          </select>
        </Header>
        <TextArea>{textarea}</TextArea>
        <ButtonCotnainer>
          <Button type='button' color='red' onClick={handleDelete}>
            Delete
          </Button>
          <Button type='submit' color='#40A2E3' onClick={handleClick}>
            Confirm
          </Button>
        </ButtonCotnainer>
      </Modal>
    </Container>
  );
};

export default TaskModal;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
`;

const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #000;
  opacity: 0.5;
`;

const Modal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  padding: 30px 50px;
  border: 1px solid #ccc;
  background-color: #fff;
  border-radius: 20px;

  h2 {
    margin-bottom: 0;
    font-size: 1.2rem;
    font-weight: 600;
  }
`;

const Header = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 20px;
  justify-content: space-between;

  select {
    height: 30px;
  }

  span {
    font-size: 0.9rem;
  }
`;

const BedgeContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 200px;
  margin: 20px 0;
  padding: 20px;
  border-radius: 20px;
  border: 1px solid #ccc;
  overflow-y: scroll;
`;

const ButtonCotnainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
`;

const Button = styled.button<{ color: string }>`
  width: 100%;
  height: 50px;
  font-size: 1.2rem;
  color: #fff;
  background-color: ${(props) => props.color};
  border: none;
  border-radius: 20px;
`;
