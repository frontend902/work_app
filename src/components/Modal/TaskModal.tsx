import React, { useState } from 'react';
import styled from 'styled-components';
import {
  collection,
  addDoc,
  DocumentData,
  doc,
  getDoc,
  updateDoc,
  setDoc,
  where,
  query,
  getDocs,
} from 'firebase/firestore';
import { database } from '../../firebase';
import Bedge from '../Bedge';

interface AddModalProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  db: DocumentData;
}

const TaskModal = ({ setOpen, db }: AddModalProps) => {
  const [state, setState] = useState(db.state);

  const handleClick = async () => {
    // console.log(docSnap.data());
    // setOpen(false);
  };

  const handleOptions = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setState(e.target.value);
  };

  return (
    <Container>
      <Overlay></Overlay>

      <Modal>
        <BedgeContainer>
          <Bedge color='#AD88C6'>{db.option}</Bedge>
          <Bedge color='#E1AFD1'>{db.location}</Bedge>
          <Bedge color='#FFE6E6'>{db.person}</Bedge>
        </BedgeContainer>
        <Header>
          <h2>{db.hotel}</h2>
          <select name='options' id='options' onChange={handleOptions}>
            <option value='선택' disabled selected>
              선택
            </option>
            <option value='질의중'>질의중</option>
            <option value='미처리'>미처리</option>
            <option value='처리중'>처리중</option>
            <option value='처리완료'>처리완료</option>
          </select>
        </Header>
        <p>{db.mail}</p>
        <TextArea>{db.textarea}</TextArea>
        <ButtonCotnainer>
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
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  justify-content: space-between;

  select {
    height: 30px;
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
  margin-bottom: 20px;
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
