import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import EventDefinitions, { globalEmitter } from '../event/Event';

const mergePostData = (base, specific) => {
  const copied = Object.assign({}, base);
  return Object.assign(copied, specific);
};

const ProgramViewers = ({ programViewers }) => {
  const supplierToListItem = (supplier) => {
    const clickHandler = () => {
      globalEmitter.emit(EventDefinitions.PROGRAM_VIEWER_CLICKED, {
        programId: programViewers.programId,
        programHost: programViewers.programHost,
        postData: mergePostData(programViewers.viewers.basePostData, supplier.postData)
      });
    };
    return (
      <ListGroup.Item key={supplier.supplierName} action as="a" onClick={clickHandler}>
        {supplier.supplierName}
      </ListGroup.Item>
    )
  };

  return (
    <ListGroup>
      {programViewers.viewers.suppliers.map(supplierToListItem)}
    </ListGroup>
  );
};

export default ProgramViewers;