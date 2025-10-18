import { HttpResponseCodes } from "../enums";
import { getCookie } from "../utils/cookie";
import { handleApiRequest } from "./api";

// Get API base URL from environment or use default
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

export const setStandardHeadersAsync = async (
  headers: Record<string, string>,
  isOpenEndpoint: boolean
): Promise<Record<string, string>> => {
  console.log("Starting setStandardHeadersAsync");
  let userToken = "";
  
  if (!isOpenEndpoint) {
    userToken = getCookie("token") || localStorage.getItem("token") || "";
  }
  
  return {
    ...headers,
    ...(!isOpenEndpoint ? { Authorization: `Bearer ${userToken}` } : {}),
  };
};

const handleApiRequestWithRetryAsync = async (
  payload: any,
  attemptNum: number,
  maxNumRetries: number,
  isOpenEndpoint: boolean
): Promise<any> => {
  if (attemptNum > maxNumRetries) {
    const errorMessage = `Attempt number ${attemptNum} is greater than max number of retries ${maxNumRetries}`;
    console.log(errorMessage, {
      attemptNum,
      maxNumRetries,
    });
    throw new Error(errorMessage);
  }

  const headers = await setStandardHeadersAsync(
    payload.headers || {},
    isOpenEndpoint
  );
  
  // Prepend base URL if not already a full URL
  const url = payload.url.startsWith('http') 
    ? payload.url 
    : `${API_BASE_URL}${payload.url}`;

  const response = await handleApiRequest(
    payload.method,
    url,
    payload.queryStringParams || {},
    headers,
    payload?.data
  );

  if (response.status === HttpResponseCodes.Unauthorized) {
    const retryNumberInfo = `Attempt number ${attemptNum} to get back response from server`;
    console.log(retryNumberInfo);
    
    if (attemptNum >= maxNumRetries) {
      console.log(
        "Unauthorized response from server and maximum retry attempts exceeded"
      );
      // Clear auth data
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      // Redirect to login
      window.location.href = "/login";
      return response;
    }
    
    return handleApiRequestWithRetryAsync(
      payload,
      attemptNum + 1,
      maxNumRetries,
      isOpenEndpoint
    );
  }
  
  return response;
};

export const handleRequestAsync = async (
  payload: any,
  isOpenEndpoint: boolean = false
) => {
  const response = await handleApiRequestWithRetryAsync(
    payload,
    1,
    3,
    isOpenEndpoint
  );
  return response;
};

