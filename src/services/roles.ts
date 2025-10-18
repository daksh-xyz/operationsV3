import { HTTPMethod, HttpResponseCodes } from "../enums";
import { handleRequestAsync } from "./baseService";
import { mockRoles, simulateDelay, Role } from "./mockData";

interface PromiseReturnType {
  success: boolean;
  message: string;
  data?: any;
}

// Mock mode flag - set to true to use mock data instead of API
const USE_MOCK_DATA = true;

const getRolesListAsync = async (
  page: number = 1,
  limit: number = 10
): Promise<PromiseReturnType> => {
  if (USE_MOCK_DATA) {
    await simulateDelay();
    
    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedRoles = mockRoles.slice(startIndex, endIndex);
    
    return {
      success: true,
      message: "Roles fetched successfully",
      data: {
        roles: paginatedRoles,
        total: mockRoles.length,
        page,
        limit,
        totalPages: Math.ceil(mockRoles.length / limit),
      },
    };
  }

  const payload = {
    method: HTTPMethod.GET,
    url: "/roles",
    queryStringParams: { page, limit },
  };
  
  const response = await handleRequestAsync(payload, false);
  
  if (response && response.status === HttpResponseCodes.Success) {
    return {
      success: true,
      message: "Roles fetched successfully",
      data: response.data,
    };
  }
  
  return {
    success: false,
    message: response?.data?.message || "Failed to fetch roles",
  };
};

const getRoleByIdAsync = async (id: string): Promise<PromiseReturnType> => {
  if (USE_MOCK_DATA) {
    await simulateDelay();
    
    const role = mockRoles.find(r => r.id === id);
    
    if (role) {
      return {
        success: true,
        message: "Role fetched successfully",
        data: role,
      };
    }
    
    return {
      success: false,
      message: "Role not found",
    };
  }

  const payload = {
    method: HTTPMethod.GET,
    url: `/roles/${id}`,
  };
  
  const response = await handleRequestAsync(payload, false);
  
  if (response && response.status === HttpResponseCodes.Success) {
    return {
      success: true,
      message: "Role fetched successfully",
      data: response.data,
    };
  }
  
  return {
    success: false,
    message: response?.data?.message || "Failed to fetch role",
  };
};

const createRoleAsync = async (
  roleData: Partial<Role>
): Promise<PromiseReturnType> => {
  if (USE_MOCK_DATA) {
    await simulateDelay();
    
    const newRole: Role = {
      id: String(mockRoles.length + 1),
      name: roleData.name || "",
      description: roleData.description || "",
      permissions: roleData.permissions || [],
      userCount: 0,
    };
    
    mockRoles.push(newRole);
    
    return {
      success: true,
      message: "Role created successfully",
      data: newRole,
    };
  }

  const payload = {
    method: HTTPMethod.POST,
    url: "/roles",
    data: roleData,
  };
  
  const response = await handleRequestAsync(payload, false);
  
  if (response && response.status === HttpResponseCodes.Created) {
    return {
      success: true,
      message: "Role created successfully",
      data: response.data,
    };
  }
  
  return {
    success: false,
    message: response?.data?.message || "Failed to create role",
  };
};

const updateRoleAsync = async (
  id: string,
  roleData: Partial<Role>
): Promise<PromiseReturnType> => {
  if (USE_MOCK_DATA) {
    await simulateDelay();
    
    const roleIndex = mockRoles.findIndex(r => r.id === id);
    
    if (roleIndex !== -1) {
      mockRoles[roleIndex] = { 
        ...mockRoles[roleIndex], 
        ...roleData 
      };
      
      return {
        success: true,
        message: "Role updated successfully",
        data: mockRoles[roleIndex],
      };
    }
    
    return {
      success: false,
      message: "Role not found",
    };
  }

  const payload = {
    method: HTTPMethod.PATCH,
    url: `/roles/${id}`,
    data: roleData,
  };
  
  const response = await handleRequestAsync(payload, false);
  
  if (response && response.status === HttpResponseCodes.Success) {
    return {
      success: true,
      message: "Role updated successfully",
      data: response.data,
    };
  }
  
  return {
    success: false,
    message: response?.data?.message || "Failed to update role",
  };
};

const deleteRoleAsync = async (id: string): Promise<PromiseReturnType> => {
  if (USE_MOCK_DATA) {
    await simulateDelay();
    
    const roleIndex = mockRoles.findIndex(r => r.id === id);
    
    if (roleIndex !== -1) {
      mockRoles.splice(roleIndex, 1);
      
      return {
        success: true,
        message: "Role deleted successfully",
      };
    }
    
    return {
      success: false,
      message: "Role not found",
    };
  }

  const payload = {
    method: HTTPMethod.DELETE,
    url: `/roles/${id}`,
  };
  
  const response = await handleRequestAsync(payload, false);
  
  if (response && response.status === HttpResponseCodes.Success) {
    return {
      success: true,
      message: "Role deleted successfully",
    };
  }
  
  return {
    success: false,
    message: response?.data?.message || "Failed to delete role",
  };
};

const RoleService = {
  getRolesListAsync,
  getRoleByIdAsync,
  createRoleAsync,
  updateRoleAsync,
  deleteRoleAsync,
};

export default RoleService;

