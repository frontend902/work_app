import { useEffect, useState } from 'react';
import Header from './components/Header/Header';
import Layout from './components/Layout';
import Card from './components/Card';
import styled from 'styled-components';
import AddModal from './components/Modal/AddModal';
import { db } from './firebase';
import { ITask } from './types';
import { Unsubscribe, collection, onSnapshot, orderBy, query } from 'firebase/firestore';

function App() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [state, setState] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleButton = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;
    const fetchTasks = async () => {
      const tasksQuery = query(collection(db, 'tasks'), orderBy('createdAt', 'desc'));

      unsubscribe = await onSnapshot(tasksQuery, (snapshot) => {
        const tasks = snapshot.docs.map((doc) => {
          const { createdAt, endedAt, hotel, id, location, mail, option, person, state, textarea } =
            doc.data();

          return {
            createdAt,
            endedAt,
            hotel,
            id,
            location,
            mail,
            option,
            person,
            state,
            textarea,
          };
        });
        setTasks(tasks);
      });
    };
    fetchTasks();
    return () => {
      unsubscribe && unsubscribe();
    };
  }, []);

  return (
    <div className='App'>
      <Layout>
        <Header setState={setState} />
        <CardContainer>
          {tasks.map((task) => (
            <Card key={task.id} {...task} />
          ))}
        </CardContainer>
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
