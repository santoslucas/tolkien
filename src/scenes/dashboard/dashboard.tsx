import React from 'react';
import DailyTasks from './daily-tasks';
import Bills from './bills';

const Dashboard = (): JSX.Element => {
  return (
    <div>
      <h1>Bem-vindo!</h1>
      <DailyTasks />
      <Bills />
    </div>
  );
};

export default Dashboard;
