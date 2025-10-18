import { HTTPMethod, HttpResponseCodes } from "../enums";
import { handleRequestAsync } from "./baseService";
import { setValueInLocalStorage } from "../utils/generic";
import { setCookie } from "../utils/cookie";
import { mockUsers, simulateDelay } from "./mockData";

interface PromiseReturnType {
  success: boolean;
  message: string;
  data?: any;
}

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  department?: string;
}

// Mock mode flag - set to true to use mock data instead of API
const USE_MOCK_DATA = true;

const loginAsync = async (
  email: string,
  password: string
): Promise<PromiseReturnType> => {
  if (USE_MOCK_DATA) {
    await simulateDelay();
    
    // Find user by email in mock data
    const user = mockUsers.find(u => u.email === email);
    
    // Check if user exists and password is "password" (mock check)
    if (!user || password !== "password") {
      return {
        success: false,
        message: "Invalid credentials",
      };
    }
    
    // Generate a mock token
    const token = `mock_token_${user.id}_${Date.now()}`;
    
    // Store token in both cookie and localStorage
    await setCookie("token", token);
    localStorage.setItem("token", token);
    
    // Store user data
    const userData = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      department: user.department,
    };
    setValueInLocalStorage("user", userData);
    
    return {
      success: true,
      message: "Login successful",
      data: { user: userData, token },
    };
  }
  
  // Real API call (when USE_MOCK_DATA is false)
  const payload = {
    method: HTTPMethod.POST,
    url: "/auth/login",
    data: {
      email,
      password,
    },
  };
  
  const response = await handleRequestAsync(payload, true);
  
  if (response && response.status === HttpResponseCodes.Success) {
    const token = response?.data?.token;
    const user = response?.data?.user;
    
    // Store token in both cookie and localStorage
    await setCookie("token", token);
    localStorage.setItem("token", token);
    
    // Store user data
    const userData = {
      id: user?.id,
      email: user?.email,
      name: user?.name,
      role: user?.role,
      department: user?.department,
    };
    setValueInLocalStorage("user", userData);
    
    return {
      success: true,
      message: "Login successful",
      data: { user: userData, token },
    };
  }
  
  return {
    success: false,
    message: response?.data?.error || response?.message || "Invalid credentials",
  };
};

const logoutAsync = async (): Promise<PromiseReturnType> => {
  if (USE_MOCK_DATA) {
    await simulateDelay(200);
    
    // Clear local storage and cookies
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    
    return {
      success: true,
      message: "Logout successful",
    };
  }
  
  // Real API call (when USE_MOCK_DATA is false)
  const payload = {
    method: HTTPMethod.POST,
    url: "/auth/logout",
  };
  
  const response = await handleRequestAsync(payload, false);
  
  if (response && response.status === HttpResponseCodes.Success) {
    // Clear local storage and cookies
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    
    return {
      success: true,
      message: "Logout successful",
    };
  }
  
  return {
    success: false,
    message: response?.data?.message || "Logout failed",
  };
};

const getCurrentUserAsync = async (): Promise<PromiseReturnType> => {
  if (USE_MOCK_DATA) {
    await simulateDelay(200);
    
    // Get user from localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      return {
        success: true,
        message: "User fetched successfully",
        data: user,
      };
    }
    
    return {
      success: false,
      message: "User not found",
    };
  }
  
  // Real API call (when USE_MOCK_DATA is false)
  const payload = {
    method: HTTPMethod.GET,
    url: "/auth/me",
  };
  
  const response = await handleRequestAsync(payload, false);
  
  if (response && response.status === HttpResponseCodes.Success) {
    const user = response?.data?.user;
    
    return {
      success: true,
      message: "User fetched successfully",
      data: user,
    };
  }
  
  return {
    success: false,
    message: response?.data?.message || "Failed to fetch user",
  };
};

const verifyTokenAsync = async (): Promise<PromiseReturnType> => {
  if (USE_MOCK_DATA) {
    await simulateDelay(200);
    
    // Check if token exists in localStorage
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    
    if (token && userData) {
      return {
        success: true,
        message: "Token is valid",
        data: JSON.parse(userData),
      };
    }
    
    return {
      success: false,
      message: "Invalid token",
    };
  }
  
  // Real API call (when USE_MOCK_DATA is false)
  const payload = {
    method: HTTPMethod.POST,
    url: "/auth/verify",
  };
  
  const response = await handleRequestAsync(payload, false);
  
  if (response && response.status === HttpResponseCodes.Success) {
    return {
      success: true,
      message: "Token is valid",
      data: response?.data,
    };
  }
  
  return {
    success: false,
    message: "Invalid token",
  };
};

const AuthenticationService = {
  loginAsync,
  logoutAsync,
  getCurrentUserAsync,
  verifyTokenAsync,
};

export default AuthenticationService;

