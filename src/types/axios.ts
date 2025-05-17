import type {
  AxiosError,
  AxiosHeaders,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

export interface CustomResponse extends AxiosResponse {
  data: {
    msg: string;
    data?: unknown;
  };
}

export interface RetryAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export interface CustomAxiosError extends AxiosError {
  response: {
    data: {
      msg: string;
    };
    status: number;
    statusText: string;
    headers: AxiosHeaders;
    config: InternalAxiosRequestConfig;
  };
}
