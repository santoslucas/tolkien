import React, { ReactNode } from 'react';
import './box.scss';

type Props = {
  title: string;
  children?: ReactNode;
};

const Box = ({ title, children }: Props) => {
  return (
    <div className="box__wrapper">
      <h3 className="box__title">{title}</h3>
      {children}
    </div>
  );
};

export default Box;
