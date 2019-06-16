import StoreBase from '../data-base/StoreBase';

export default class ToplistStore extends StoreBase {
  async fetch() {
    try {
      let datums = await this.makeRequest("GET", this.baseUrl() + "/v2/toplist");
      return JSON.parse(datums);
    } catch (error) {
      throw error;
    }
  }
}