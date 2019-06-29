import React from 'react';
import './Program.css';

const ProgramTitle = ({ program }) => (<p className="Program-title">{program.title}</p>);

const ProgramDescription = ({ program }) => {
  if (!program.optionalDescription) {
    return (
      <div className="Program-description">
        {program.description}
      </div>
    );
  } else {
    return (
      <div className="Program-description">
        {program.description}<br />
        {program.optionalDescription}
      </div>
    );
  }
};

const Program = ({ program }) => (
  <div className="Program">
    <ProgramTitle program={program} />
    <ProgramDescription program={program} />
  </div>
);

export default Program;
