import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Program from './Program';
import EventDefinitions, { globalEmitter } from '../event/Event';

const Channel = ({ channel }) => (<ListGroup>{channel.map(programToListItem)}</ListGroup>);

const programToListItem = (program) => {
  const clickHandler = () => {
    globalEmitter.emit(EventDefinitions.PROGRAM_CLICKED, program);
  };

  return (
    <ListGroup.Item key={program.uniqueId} action as="a" onClick={clickHandler}>
      <Program program={program} />
    </ListGroup.Item>
  )
};

export default Channel;
