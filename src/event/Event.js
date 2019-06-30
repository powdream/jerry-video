import {
  EventEmitter
} from 'events';

const EventDefinitions = {
  PROGRAM_CLICKED: "program-clicked"
};

export default EventDefinitions;
export const globalEmitter = new EventEmitter();