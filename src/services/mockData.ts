// Mock data for development until backend is ready

export interface User {
  id: string;
  email: string;
  name: string;
  firstName: string;
  lastName: string;
  role: string;
  department: string;
  status: "active" | "inactive";
  createdAt: string;
  phone?: string;
}

export interface Department {
  id: string;
  name: string;
  description: string;
  headOfDepartment: string;
  employeeCount: number;
  status: "active" | "inactive";
}

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  userCount: number;
}

export const mockUsers: User[] = [
  {
    id: "1",
    email: "admin@novocuris.com",
    name: "Admin User",
    firstName: "Admin",
    lastName: "User",
    role: "admin",
    department: "IT",
    status: "active",
    createdAt: "2024-01-15T10:30:00Z",
    phone: "+1234567890",
  },
  {
    id: "2",
    email: "zal.cante@novocuris.com",
    name: "Zal Cante",
    firstName: "Zal",
    lastName: "Cante",
    role: "super_admin",
    department: "Hospital Administration",
    status: "active",
    createdAt: "2024-01-10T09:00:00Z",
    phone: "+1234567891",
  },
  {
    id: "3",
    email: "doctor@novocuris.com",
    name: "Dr. Smith",
    firstName: "John",
    lastName: "Smith",
    role: "doctor",
    department: "Cardiology",
    status: "active",
    createdAt: "2024-02-01T08:00:00Z",
    phone: "+1234567892",
  },
  {
    id: "4",
    email: "nurse.jane@novocuris.com",
    name: "Jane Nurse",
    firstName: "Jane",
    lastName: "Nurse",
    role: "nurse",
    department: "Emergency",
    status: "active",
    createdAt: "2024-02-15T07:30:00Z",
    phone: "+1234567893",
  },
  {
    id: "5",
    email: "staff.mike@novocuris.com",
    name: "Mike Staff",
    firstName: "Mike",
    lastName: "Staff",
    role: "staff",
    department: "Reception",
    status: "active",
    createdAt: "2024-03-01T06:00:00Z",
    phone: "+1234567894",
  },
];

export const mockDepartments: Department[] = [
  {
    id: "1",
    name: "Cardiology",
    description: "Heart and cardiovascular system care",
    headOfDepartment: "Dr. Smith",
    employeeCount: 25,
    status: "active",
  },
  {
    id: "2",
    name: "Emergency",
    description: "Emergency and urgent care services",
    headOfDepartment: "Dr. Johnson",
    employeeCount: 40,
    status: "active",
  },
  {
    id: "3",
    name: "Pediatrics",
    description: "Children's healthcare",
    headOfDepartment: "Dr. Williams",
    employeeCount: 30,
    status: "active",
  },
  {
    id: "4",
    name: "Radiology",
    description: "Diagnostic imaging services",
    headOfDepartment: "Dr. Brown",
    employeeCount: 15,
    status: "active",
  },
  {
    id: "5",
    name: "Hospital Administration",
    description: "Administrative and management operations",
    headOfDepartment: "Zal Cante",
    employeeCount: 20,
    status: "active",
  },
  {
    id: "6",
    name: "IT",
    description: "Information technology and systems",
    headOfDepartment: "Admin User",
    employeeCount: 10,
    status: "active",
  },
];

export const mockRoles: Role[] = [
  {
    id: "1",
    name: "super_admin",
    description: "Super Administrator with full system access",
    permissions: ["all"],
    userCount: 1,
  },
  {
    id: "2",
    name: "admin",
    description: "Administrator with management capabilities",
    permissions: [
      "user.read",
      "user.create",
      "user.update",
      "user.delete",
      "department.read",
      "department.create",
      "department.update",
      "role.read",
    ],
    userCount: 5,
  },
  {
    id: "3",
    name: "doctor",
    description: "Medical doctor with patient care access",
    permissions: [
      "patient.read",
      "patient.create",
      "patient.update",
      "appointment.read",
      "appointment.create",
      "appointment.update",
      "medical_record.read",
      "medical_record.create",
    ],
    userCount: 50,
  },
  {
    id: "4",
    name: "nurse",
    description: "Nursing staff with patient support access",
    permissions: [
      "patient.read",
      "appointment.read",
      "medical_record.read",
      "medication.read",
      "medication.create",
    ],
    userCount: 120,
  },
  {
    id: "5",
    name: "staff",
    description: "General staff with limited access",
    permissions: [
      "patient.read",
      "appointment.read",
      "appointment.create",
    ],
    userCount: 80,
  },
];

// Helper function to simulate API delay
export const simulateDelay = (ms: number = 500) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Helper function to generate mock response
export const mockResponse = <T>(data: T, status: number = 200) => {
  return {
    status,
    data,
    message: status === 200 ? "Success" : "Error",
  };
};

