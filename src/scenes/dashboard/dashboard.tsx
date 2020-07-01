import React from 'react';
import DailyTasks from './daily-tasks';

const Dashboard = (): JSX.Element => {
  return (
    <div>
      <h1>Bem-vindo!</h1>
      <DailyTasks />
    </div>
  );
};

export default Dashboard;
