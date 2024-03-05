import React, { useEffect, useState } from 'react';
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
  const { startedAt, endedAt, hotel, id, location, mail, option, person, state, textarea } = task;
  const [progress, setProgress] = useState(state);
  const [text, setText] = useState<string>(textarea);

  const handleClick = async () => {
    try {
      await updateDoc(doc(db, 'tasks', id), {
        textarea: text,
      });
    } catch (e) {
      console.log(e);
    } finally {
      setOpen(false);
    }
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

  const handleOptions = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (progress === e.target.value) return;
    setProgress(e.target.value);
  };

  useEffect(() => {
    (async () => {
      if (progress === '처리중' && startedAt === '-') {
        await updateDoc(doc(db, 'tasks', id), {
          state: progress,
          startedAt: Date.now(),
        });
      } else if (progress === '처리완료' && endedAt === '-') {
        await updateDoc(doc(db, 'tasks', id), {
          state: progress,
          endedAt: Date.now(),
        });
      } else if (progress === '미처리') {
        await updateDoc(doc(db, 'tasks', id), {
          state: progress,
          startedAt: '-',
          endedAt: '-',
        });
      }
    })();
  }, [progress]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  return (
    <Container>
      <Overlay></Overlay>

      <Modal>
        <>
          <BedgeContainer>
            <Bedge color='#AD88C6'>{option}</Bedge>
            <Bedge color='#E1AFD1'>{location}</Bedge>
            <Bedge color='#FFE6E6'>{person}</Bedge>
          </BedgeContainer>
          <h2>{hotel}</h2>
          <Mail>{mail}</Mail>
          <Header>
            <div>
              <p>
                <span>Start_ </span>
                {startedAt !== '-' && <span>{makeTime(new Date(startedAt))}</span>}
              </p>
              <p>
                <span>End_ </span>
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
        </>
        <TextArea onChange={handleChange}>{textarea}</TextArea>
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
  display: flex;
  flex-direction: column;
  width: 800px;
  height: 70vh;
  padding: 30px 50px;
  border: 1px solid #ccc;
  background-color: #fff;
  border-radius: 20px;

  @media screen and (max-width: 900px) {
    width: 90%;
  }

  h2 {
    margin-bottom: 0;
    font-size: 1.2rem;
    font-weight: 600;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  p {
    margin-bottom: 10px;

    span {
      font-size: 1rem;

      &:first-child {
        font-weight: 600;
      }
    }
  }
`;

const BedgeContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const Mail = styled.p`
  font-size: 1.1rem;
  margin: 10px 0 20px 0;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100%;
  margin: 20px 0;
  padding: 20px;
  border-radius: 20px;
  border: 1px solid #ccc;
  overflow-y: scroll;
  font-size: 1rem;
  line-height: 1.5rem;
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
