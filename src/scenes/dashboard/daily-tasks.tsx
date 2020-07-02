import React, { ChangeEvent, useEffect, useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Box from '../../components/box';
import { db } from '../../firebase';

const DAILY_TASKS_COLLECTION = 'daily-tasks';

type TaskType = {
  id: string;
  name: string;
  done: boolean;
};

type TaskProps = {
  task: TaskType;
};

const Task = ({ task }: TaskProps) => {
  const [checked, setChecked] = React.useState(task.done);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const done = event.target.checked;
    setChecked(done);
    const taskRef = db.collection(DAILY_TASKS_COLLECTION).doc(task.id);
    taskRef.update({ done: done }).catch((error) => {
      setChecked(!done);
      console.log('Erro ao atualizar Task', error);
    });
  };

  return (
    <div>
      <Checkbox checked={checked} onChange={handleChange} />
      <span>{task.name}</span>
    </div>
  );
};

const DailyTasks = () => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const loadTasks = async () => {
    const resultTasks: TaskType[] = [];
    const querySnapshot = await db.collection(DAILY_TASKS_COLLECTION).get();
    querySnapshot.forEach((doc) => {
      const task = {
        id: doc.id,
        ...doc.data(),
      } as TaskType;
      resultTasks.push(task);
    });
    setTasks(resultTasks);
  };

  const addTask = () => {
    console.log('vai adicionar');
    db.collection(DAILY_TASKS_COLLECTION)
      .add({
        name: 'Nova tarefa',
        done: false,
      })
      .then(() => {
        loadTasks();
      })
      .catch((error) => {
        console.log('Erro ao adicionar Task', error);
      });
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const tasksList = tasks.map((task) => <Task key={task.id} task={task} />);

  return (
    <Box title="Tarefas do dia">
      {tasksList}
      <IconButton onClick={addTask}>
        <AddIcon />
      </IconButton>
    </Box>
  );
};

export default DailyTasks;
