import React, { ChangeEvent, useEffect, useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Box from '../../components/box';
import { db } from '../../firebase';
import InlineEdit from '../../components/inline-edit/inline-edit';

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
  const taskRef = db.collection(DAILY_TASKS_COLLECTION).doc(task.id);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const done = event.target.checked;
    taskRef.update({ done: done }).catch((error) => {
      console.log('Erro ao atualizar Task', error);
    });
  };

  const updateText = (text: string) => {
    if (text) {
      taskRef.update({ name: text }).catch((error) => {
        console.log('Erro ao atualizar Task', error);
      });
    } else {
      taskRef.delete().catch((error) => {
        console.log('Erro ao deletar Task', error);
      });
    }
  };

  return (
    <div>
      <Checkbox checked={task.done} onChange={handleChange} />
      <InlineEdit text={task.name} onSetText={updateText} />
    </div>
  );
};

const DailyTasks = () => {
  const [tasks, setTasks] = useState<TaskType[]>([]);

  const updateTasks = (newTasks: TaskType[]) => {
    setTasks(newTasks);
  };

  const addTask = () => {
    db.collection(DAILY_TASKS_COLLECTION)
      .add({
        name: 'Nova tarefa',
        done: false,
      })
      .catch((error) => {
        console.log('Erro ao adicionar Task', error);
      });
  };

  useEffect(() => {
    const unsubscribe = db
      .collection(DAILY_TASKS_COLLECTION)
      .onSnapshot((querySnapshot) => {
        const resultTasks: TaskType[] = [];
        querySnapshot.forEach((doc) => {
          const task = {
            id: doc.id,
            ...doc.data(),
          } as TaskType;
          resultTasks.push(task);
        });
        updateTasks(resultTasks);
      });
    return () => {
      unsubscribe();
    };
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
