import StoreBase from '../data-base/StoreBase';

export default class ProgramStore extends StoreBase {
  async fetchViewerListAsync(program) {
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

  async fetchViewerUrl(programId, programHost, viewerPostData) {
    try {
      let extra = {
        "body": JSON.stringify(viewerPostData)
      };
      return await this.makeRequest(
        "POST",
        this.baseUrl() + "/v2/program/" + programId + "/" + programHost + "/viewer",
        extra
      );
    } catch (error) {
      throw error;
    }
  }
}