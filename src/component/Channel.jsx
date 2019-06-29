import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Program from './Program';

const Channel = ({ channel }) => {
  const programList = channel.map((program) => (
    <ListGroup.Item key={program.uniqueId}>
      <Program program={program} />
    </ListGroup.Item>
  ));
  return (<ListGroup>{programList}</ListGroup>);
};

export default Channel;
