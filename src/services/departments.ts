import { HTTPMethod, HttpResponseCodes } from "../enums";
import { handleRequestAsync } from "./baseService";
import { mockDepartments, simulateDelay, Department } from "./mockData";

interface PromiseReturnType {
  success: boolean;
  message: string;
  data?: any;
}

// Mock mode flag - set to true to use mock data instead of API
const USE_MOCK_DATA = true;

const getDepartmentsListAsync = async (
  page: number = 1,
  limit: number = 10
): Promise<PromiseReturnType> => {
  if (USE_MOCK_DATA) {
    await simulateDelay();
    
    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedDepartments = mockDepartments.slice(startIndex, endIndex);
    
    return {
      success: true,
      message: "Departments fetched successfully",
      data: {
        departments: paginatedDepartments,
        total: mockDepartments.length,
        page,
        limit,
        totalPages: Math.ceil(mockDepartments.length / limit),
      },
    };
  }

  const payload = {
    method: HTTPMethod.GET,
    url: "/departments",
    queryStringParams: { page, limit },
  };
  
  const response = await handleRequestAsync(payload, false);
  
  if (response && response.status === HttpResponseCodes.Success) {
    return {
      success: true,
      message: "Departments fetched successfully",
      data: response.data,
    };
  }
  
  return {
    success: false,
    message: response?.data?.message || "Failed to fetch departments",
  };
};

const getDepartmentByIdAsync = async (id: string): Promise<PromiseReturnType> => {
  if (USE_MOCK_DATA) {
    await simulateDelay();
    
    const department = mockDepartments.find(d => d.id === id);
    
    if (department) {
      return {
        success: true,
        message: "Department fetched successfully",
        data: department,
      };
    }
    
    return {
      success: false,
      message: "Department not found",
    };
  }

  const payload = {
    method: HTTPMethod.GET,
    url: `/departments/${id}`,
  };
  
  const response = await handleRequestAsync(payload, false);
  
  if (response && response.status === HttpResponseCodes.Success) {
    return {
      success: true,
      message: "Department fetched successfully",
      data: response.data,
    };
  }
  
  return {
    success: false,
    message: response?.data?.message || "Failed to fetch department",
  };
};

const createDepartmentAsync = async (
  departmentData: Partial<Department>
): Promise<PromiseReturnType> => {
  if (USE_MOCK_DATA) {
    await simulateDelay();
    
    const newDepartment: Department = {
      id: String(mockDepartments.length + 1),
      name: departmentData.name || "",
      description: departmentData.description || "",
      headOfDepartment: departmentData.headOfDepartment || "",
      employeeCount: departmentData.employeeCount || 0,
      status: "active",
    };
    
    mockDepartments.push(newDepartment);
    
    return {
      success: true,
      message: "Department created successfully",
      data: newDepartment,
    };
  }

  const payload = {
    method: HTTPMethod.POST,
    url: "/departments",
    data: departmentData,
  };
  
  const response = await handleRequestAsync(payload, false);
  
  if (response && response.status === HttpResponseCodes.Created) {
    return {
      success: true,
      message: "Department created successfully",
      data: response.data,
    };
  }
  
  return {
    success: false,
    message: response?.data?.message || "Failed to create department",
  };
};

const updateDepartmentAsync = async (
  id: string,
  departmentData: Partial<Department>
): Promise<PromiseReturnType> => {
  if (USE_MOCK_DATA) {
    await simulateDelay();
    
    const departmentIndex = mockDepartments.findIndex(d => d.id === id);
    
    if (departmentIndex !== -1) {
      mockDepartments[departmentIndex] = { 
        ...mockDepartments[departmentIndex], 
        ...departmentData 
      };
      
      return {
        success: true,
        message: "Department updated successfully",
        data: mockDepartments[departmentIndex],
      };
    }
    
    return {
      success: false,
      message: "Department not found",
    };
  }

  const payload = {
    method: HTTPMethod.PATCH,
    url: `/departments/${id}`,
    data: departmentData,
  };
  
  const response = await handleRequestAsync(payload, false);
  
  if (response && response.status === HttpResponseCodes.Success) {
    return {
      success: true,
      message: "Department updated successfully",
      data: response.data,
    };
  }
  
  return {
    success: false,
    message: response?.data?.message || "Failed to update department",
  };
};

const deleteDepartmentAsync = async (id: string): Promise<PromiseReturnType> => {
  if (USE_MOCK_DATA) {
    await simulateDelay();
    
    const departmentIndex = mockDepartments.findIndex(d => d.id === id);
    
    if (departmentIndex !== -1) {
      mockDepartments.splice(departmentIndex, 1);
      
      return {
        success: true,
        message: "Department deleted successfully",
      };
    }
    
    return {
      success: false,
      message: "Department not found",
    };
  }

  const payload = {
    method: HTTPMethod.DELETE,
    url: `/departments/${id}`,
  };
  
  const response = await handleRequestAsync(payload, false);
  
  if (response && response.status === HttpResponseCodes.Success) {
    return {
      success: true,
      message: "Department deleted successfully",
    };
  }
  
  return {
    success: false,
    message: response?.data?.message || "Failed to delete department",
  };
};

const DepartmentService = {
  getDepartmentsListAsync,
  getDepartmentByIdAsync,
  createDepartmentAsync,
  updateDepartmentAsync,
  deleteDepartmentAsync,
};

export default DepartmentService;

