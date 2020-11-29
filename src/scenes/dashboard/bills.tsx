import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import Box from '../../components/box';

const BILLS_COLLECTION = 'bills';

type BillType = {
  id: string;
  name: string;
  dueDate: number;
  value?: number;
};

const Bills = () => {
  const [bills, setBills] = useState<BillType[]>([]);

  useEffect(() => {
    const unsubscribe = db
      .collection(BILLS_COLLECTION)
      .onSnapshot((querySnapshot) => {
        const resultTasks: BillType[] = [];
        querySnapshot.forEach((doc) => {
          const task = {
            id: doc.id,
            ...doc.data(),
          } as BillType;
          resultTasks.push(task);
        });
        setBills(resultTasks);
      });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Box title="Contas do Mês">
      <div>Teste</div>
    </Box>
  );
};

export default Bills;
