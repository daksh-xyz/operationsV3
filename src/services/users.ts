import { HTTPMethod, HttpResponseCodes } from "../enums";
import { handleRequestAsync } from "./baseService";
import { mockUsers, simulateDelay, User } from "./mockData";

interface PromiseReturnType {
  success: boolean;
  message: string;
  data?: any;
}

// Mock mode flag - set to true to use mock data instead of API
const USE_MOCK_DATA = true;

const getUsersListAsync = async (
  page: number = 1,
  limit: number = 10,
  filters?: any
): Promise<PromiseReturnType> => {
  if (USE_MOCK_DATA) {
    await simulateDelay();
    
    let filteredUsers = [...mockUsers];
    
    // Apply filters
    if (filters) {
      if (filters.role) {
        filteredUsers = filteredUsers.filter(user => user.role === filters.role);
      }
      if (filters.department) {
        filteredUsers = filteredUsers.filter(user => user.department === filters.department);
      }
      if (filters.status) {
        filteredUsers = filteredUsers.filter(user => user.status === filters.status);
      }
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filteredUsers = filteredUsers.filter(user => 
          user.name.toLowerCase().includes(searchLower) ||
          user.email.toLowerCase().includes(searchLower)
        );
      }
    }
    
    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);
    
    return {
      success: true,
      message: "Users fetched successfully",
      data: {
        users: paginatedUsers,
        total: filteredUsers.length,
        page,
        limit,
        totalPages: Math.ceil(filteredUsers.length / limit),
      },
    };
  }

  const payload = {
    method: HTTPMethod.GET,
    url: "/users",
    queryStringParams: { page, limit, ...filters },
  };
  
  const response = await handleRequestAsync(payload, false);
  
  if (response && response.status === HttpResponseCodes.Success) {
    return {
      success: true,
      message: "Users fetched successfully",
      data: response.data,
    };
  }
  
  return {
    success: false,
    message: response?.data?.message || "Failed to fetch users",
  };
};

const getUserByIdAsync = async (id: string): Promise<PromiseReturnType> => {
  if (USE_MOCK_DATA) {
    await simulateDelay();
    
    const user = mockUsers.find(u => u.id === id);
    
    if (user) {
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

  const payload = {
    method: HTTPMethod.GET,
    url: `/users/${id}`,
  };
  
  const response = await handleRequestAsync(payload, false);
  
  if (response && response.status === HttpResponseCodes.Success) {
    return {
      success: true,
      message: "User fetched successfully",
      data: response.data,
    };
  }
  
  return {
    success: false,
    message: response?.data?.message || "Failed to fetch user",
  };
};

const createUserAsync = async (userData: Partial<User>): Promise<PromiseReturnType> => {
  if (USE_MOCK_DATA) {
    await simulateDelay();
    
    const newUser: User = {
      id: String(mockUsers.length + 1),
      email: userData.email || "",
      name: userData.name || "",
      firstName: userData.firstName || "",
      lastName: userData.lastName || "",
      role: userData.role || "staff",
      department: userData.department || "",
      status: "active",
      createdAt: new Date().toISOString(),
      phone: userData.phone,
    };
    
    mockUsers.push(newUser);
    
    return {
      success: true,
      message: "User created successfully",
      data: newUser,
    };
  }

  const payload = {
    method: HTTPMethod.POST,
    url: "/users",
    data: userData,
  };
  
  const response = await handleRequestAsync(payload, false);
  
  if (response && response.status === HttpResponseCodes.Created) {
    return {
      success: true,
      message: "User created successfully",
      data: response.data,
    };
  }
  
  return {
    success: false,
    message: response?.data?.message || "Failed to create user",
  };
};

const updateUserAsync = async (
  id: string,
  userData: Partial<User>
): Promise<PromiseReturnType> => {
  if (USE_MOCK_DATA) {
    await simulateDelay();
    
    const userIndex = mockUsers.findIndex(u => u.id === id);
    
    if (userIndex !== -1) {
      mockUsers[userIndex] = { ...mockUsers[userIndex], ...userData };
      
      return {
        success: true,
        message: "User updated successfully",
        data: mockUsers[userIndex],
      };
    }
    
    return {
      success: false,
      message: "User not found",
    };
  }

  const payload = {
    method: HTTPMethod.PATCH,
    url: `/users/${id}`,
    data: userData,
  };
  
  const response = await handleRequestAsync(payload, false);
  
  if (response && response.status === HttpResponseCodes.Success) {
    return {
      success: true,
      message: "User updated successfully",
      data: response.data,
    };
  }
  
  return {
    success: false,
    message: response?.data?.message || "Failed to update user",
  };
};

const deleteUserAsync = async (id: string): Promise<PromiseReturnType> => {
  if (USE_MOCK_DATA) {
    await simulateDelay();
    
    const userIndex = mockUsers.findIndex(u => u.id === id);
    
    if (userIndex !== -1) {
      mockUsers.splice(userIndex, 1);
      
      return {
        success: true,
        message: "User deleted successfully",
      };
    }
    
    return {
      success: false,
      message: "User not found",
    };
  }

  const payload = {
    method: HTTPMethod.DELETE,
    url: `/users/${id}`,
  };
  
  const response = await handleRequestAsync(payload, false);
  
  if (response && response.status === HttpResponseCodes.Success) {
    return {
      success: true,
      message: "User deleted successfully",
    };
  }
  
  return {
    success: false,
    message: response?.data?.message || "Failed to delete user",
  };
};

const UserService = {
  getUsersListAsync,
  getUserByIdAsync,
  createUserAsync,
  updateUserAsync,
  deleteUserAsync,
};

export default UserService;

