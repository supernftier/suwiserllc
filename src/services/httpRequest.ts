import { AxiosInstance } from 'axios';
import { axiosInstance, IConfig } from './initRequest';

class HttpRequest {
  api: AxiosInstance;

  constructor() {
    this.api = axiosInstance;
  }

  async get(url: string, config?: IConfig) {
    return this.api.get(url, config);
  }

  async post(url: string, payload: object, config?: IConfig) {
    return this.api.post(url, payload, config);
  }

  async put(url: string, payload: object, config?: IConfig) {
    return this.api.put(url, payload, config);
  }

  async delete(url: string, config?: IConfig) {
    return this.api.delete(url, config);
  }
}

const httpRequest = new HttpRequest();

export default httpRequest;
