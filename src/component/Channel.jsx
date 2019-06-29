import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Program from './Program';

const isEven = (index) => index % 2 === 0;

const getVariant = (index) => {
  if (isEven(index)) {
    return "light";
  } else {
    return "dark";
  }
};

const Channel = ({ channel }) => {
  const programList = channel.map((program, index) => (
    <ListGroup.Item key={program.uniqueId} variant={getVariant(index)}>
      <Program program={program} />
    </ListGroup.Item>
  ));
  return (<ListGroup>{programList}</ListGroup>);
};

export default Channel;
