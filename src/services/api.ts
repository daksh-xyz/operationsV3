import axios, { AxiosResponse, Method } from "axios";
import { HTTPMethod } from "../enums";

interface ErrorObj {
  method: string;
  url: string;
  status: number;
  message: string;
}

const logSuccess = async (
  response: AxiosResponse<any>,
  requestDurationInMs: number
) => {
  console.log(`Received response: ${response.status} ${response.config.url}`, {
    url: response.config.url,
    status: response.status,
    requestDurationInMs: requestDurationInMs,
  });
  console.log("Response data", { responseData: response.data });
};

const logError = async (error: ErrorObj, requestDurationInMs: number) => {
  console.log(`Received error: ${error.status} ${error.method} ${error.url}`, {
    error: error,
    requestDurationInMs: requestDurationInMs,
  });
};

const logStart = async (
  method: Method,
  url: string,
  queryStringParams: Record<string, any>
) => {
  console.log(`Starting: ${method} ${url}`, {
    method: method,
    url: url,
    queryStringParams: queryStringParams,
  });
};

export const handleApiRequest = async (
  method: HTTPMethod,
  url: string,
  queryStringParams: Record<string, any> = {},
  headers: Record<string, string> = {},
  data: any = undefined
) => {
  logStart(method as Method, url, queryStringParams);

  const startTime = Date.now();
  const returnValue = {
    status: 0,
    data: {} as any,
    headers: headers,
    message: "",
  };

  try {
    const response = await axios({
      method: method as Method,
      url,
      params: queryStringParams,
      headers: headers,
      data: data,
      timeout: 30000,
    });

    const requestDurationInMs = Date.now() - startTime;
    logSuccess(response, requestDurationInMs);
    
    const { status } = response;
    returnValue.data = response?.data;
    returnValue.status = status;
    returnValue.message = response?.data?.message || "";
    
    return returnValue;
  } catch (error: any) {
    const requestDurationInMs = Date.now() - startTime;
    const errorObject: ErrorObj = {
      method: method,
      url: url,
      status: error?.response?.status || 0,
      message: error?.response?.data?.message || error?.message || "Network error",
    };
    logError(errorObject, requestDurationInMs);
    
    returnValue.status = error?.response?.status || 0;
    returnValue.data = {
      message: error?.response?.data?.message || error?.message || "Network error",
    };
    returnValue.message = error?.response?.data?.message || error?.message || "Network error";
    
    return returnValue;
  }
};
