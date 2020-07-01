import React, { ChangeEvent, useEffect, useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Box from '../../components/box';
import { firestore } from '../../firebase';

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
    setChecked(event.target.checked);
  };

  return (
    <div>
      <Checkbox checked={checked} onChange={handleChange} />
      <span key={task.id}>{task.name}</span>
    </div>
  );
};

const DailyTasks = () => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  useEffect(() => {
    const loadTasks = async () => {
      const resultTasks: TaskType[] = [];
      const querySnapshot = await firestore
        .collection(DAILY_TASKS_COLLECTION)
        .get();
      querySnapshot.forEach((doc) => {
        const task = {
          id: doc.id,
          ...doc.data(),
        } as TaskType;
        resultTasks.push(task);
      });
      setTasks(resultTasks);
    };

    loadTasks();
  }, []);

  const tasksList = tasks.map((task) => <Task task={task} />);

  return <Box title="Tarefas do dia">{tasksList}</Box>;
};

export default DailyTasks;
