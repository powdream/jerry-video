import React from 'react';
import Progress from '../component/Progress';

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
  const { isLoaded } = programStatus;
  const { title, description } = programStatus.program;
  if (!isLoaded) {
    return (
      <div>
        <h3>{title} - {description}</h3>
        <Progress isVisible={true} />
      </div>
    );
  } else {
    return (
      <h3>{title} - {description}</h3>
    );
  }
};

export default Program;