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
  const [filter, setFilter] = useState<ITask[]>([]);
  const [count, setCount] = useState(0);
  const [state, setState] = useState('모두');
  const [isOpen, setIsOpen] = useState(false);

  const handleButton = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;

    const fetchTasks = async () => {
      const tasksQuery = query(collection(db, 'tasks'));

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

  useEffect(() => {
    const countDone = tasks.filter((task) => task.state === '처리완료').length;
    setCount(countDone);
  }, [tasks]);

  useEffect(() => {
    const filterData = tasks.filter((task) => task.state === state);
    setFilter(filterData);
  }, [tasks, state]);

  return (
    <div className='App'>
      <Layout>
        <Header setState={setState} total={tasks.length} done={count} />
        <CardContainer>
          {state === '모두' && tasks.map((task) => <Card key={task.id} {...task} />)}
          {state !== '모두' && filter.map((task) => <Card key={task.id} {...task} />)}
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
