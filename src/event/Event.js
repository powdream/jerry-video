import {
  EventEmitter
} from 'events';

const EventDefinitions = {
  PROGRAM_CLICKED: "program-clicked",
  PROGRAM_VIEWER_CLICKED: "program-viewer-clicked"
};

export default EventDefinitions;
export const globalEmitter = new EventEmitter();