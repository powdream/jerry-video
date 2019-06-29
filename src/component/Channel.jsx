import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Program from './Program';


const Channel = ({ channel }) => {
  const programList = channel.map((program, index) => (
    <ListGroup.Item key={program.uniqueId} action as="a">
      <Program program={program} />
    </ListGroup.Item>
  ));
  return (<ListGroup>{programList}</ListGroup>);
};

export default Channel;
