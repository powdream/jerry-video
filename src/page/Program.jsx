import React from 'react';
import Progress from '../component/Progress';
import ProgramViewers from '../component/ProgramViewers';

export class ProgramStatus {
  constructor(data) {
    this.program = data.program;
    this.programViewers = data.programViewers;
    this.isLoaded = data.isLoaded;
    this.error = data.error;
  }

  succeededToLoad(programViewers) {
    return new ProgramStatus({
      program: this.program,
      programViewers: programViewers,
      isLoaded: true
    });
  }

  failedToLoad(error) {
    return new ProgramStatus({
      program: this.program,
      error: error == null ? "Unknown error" : error,
      isLoaded: true
    });
  }

  static loading(program) {
    return new ProgramStatus({ program: program, isLoaded: false });
  }
}

const Program = ({ programStatus }) => {
  const { title, description, optionalDescription } = programStatus.program;
  const header = !optionalDescription ? (
    <div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  ) : (
      <div>
        <h3>{title}</h3>
        <p>{description}<br />{optionalDescription}</p>
      </div>
    );

  const { isLoaded, programViewers, error } = programStatus;
  if (!isLoaded) {
    return (
      <div>
        {header}
        <Progress isVisible={true} />
      </div>
    );
  } else if (programViewers) {
    return (
      <div>
        {header}
        <ProgramViewers programViewers={programStatus.programViewers} />
      </div>
    );
  }
};

export default Program;