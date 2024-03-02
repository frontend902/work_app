import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { collection, addDoc, setDoc, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { database } from '../../firebase';

interface AddModalProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface DataProps {
  location: string;
  person: string;
  option: string;
  hotel: string;
  mail: string;
  textarea: string;
  state: string;
}

const AddModal = ({ setOpen }: AddModalProps) => {
  const { register, handleSubmit } = useForm<DataProps>();

  const docRef = doc(database, 'data', 'jiho');

  const onValid = async (data: DataProps) => {
    // const finalData = {
    //   ...data,
    //   state: '미처리',
    // };
    // try {
    //   await updateDoc(docRef, { task: arrayUnion(finalData) });
    //   setOpen(false);
    // } catch (e) {
    //   console.error(e);
    // }
  };

  const handleCancle = () => {
    setOpen(false);
  };

  return (
    <Container>
      <Overlay></Overlay>

      <Modal>
        <h2>Add Task</h2>
        <Form onSubmit={handleSubmit(onValid)}>
          <InputContainer>
            <HalfInput type='text' placeholder='지역' {...register('location')} />
            <HalfInput type='text' placeholder='담당자' {...register('person')} />
          </InputContainer>
          <input type='text' placeholder='업무 구분' {...register('option')} />
          <input type='text' placeholder='호텔 이름' {...register('hotel')} />
          <input type='text' placeholder='메일 제목' {...register('mail')} />
          <TextArea id='' cols={30} rows={10} {...register('textarea')}></TextArea>
          <ButtonCotnainer>
            <Button type='button' color='red' onClick={handleCancle}>
              Cancel
            </Button>
            <Button type='submit' color='#40A2E3'>
              Add
            </Button>
          </ButtonCotnainer>
        </Form>
      </Modal>
    </Container>
  );
};

export default AddModal;

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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;

  input {
    padding: 15px;
    border: 1px solid #ccc;
    border-radius: 20px;
  }
`;

const InputContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const HalfInput = styled.input`
  width: 100%;
`;

const TextArea = styled.textarea`
  height: 200px;
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
