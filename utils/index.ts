import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig } from "axios";

export class Request {
  private instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      timeout: 10000,
    });
  }
  request<T>(config: AxiosRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      this.instance
        .request<T>(config)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}
const requestApi = new Request();

export default requestApi;
