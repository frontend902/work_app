import React, { useEffect, useState } from 'react';
import Header from './components/Header/Header';
import Layout from './components/Layout';
import Card from './components/Card';
import styled from 'styled-components';
import AddModal from './components/Modal/AddModal';
import { database } from './firebase';
import { collection, getDocs, DocumentData, doc, getDoc } from 'firebase/firestore';

function App() {
  const [data, setData] = useState<DocumentData[]>([]);
  const [state, setState] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const docRef = doc(database, 'data', 'jiho');
  const handleButton = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = (await getDoc(docRef)).data();
        setData(querySnapshot?.task);
        // setData(documents);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  });

  return (
    <div className='App'>
      <Layout>
        <Header setState={setState} />
        <CardContainer>{data && data.map((db) => <Card {...db} />)}</CardContainer>
        <AddContainer>
          <AddButton onClick={handleButton}>+</AddButton>
        </AddContainer>

        {isOpen && <AddModal setOpen={setIsOpen} />}
      </Layout>
    </div>
  );
}

export default App;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const AddContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
`;

const AddButton = styled.button`
  cursor: pointer;
  width: 60px;
  height: 60px;
  font-size: 2rem;
  color: #fff;
  background-color: #ad88c6;
  border: none;
  border-radius: 50%;
`;
