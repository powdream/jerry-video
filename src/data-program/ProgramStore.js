import StoreBase from '../data-base/StoreBase';

export default class ProgramStore extends StoreBase {
  async fetch(program) {
    try {
      let datums = await this.makeRequest(
        "GET",
        this.baseUrl() + "/v2/program/" + program.uniqueId + "/" + program.host
      );
      return JSON.parse(datums);
    } catch (error) {
      throw error;
    }
  }
}