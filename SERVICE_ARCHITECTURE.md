# Service Architecture Documentation

This document describes the service layer architecture implemented in operationsV3, following the patterns established in the operations codebase.

## Overview

The application uses a **Context-based state management** approach (no Redux) with a structured service layer for API calls and mock data support.

## Architecture Components

### 1. Enums (`src/enums/`)

Defines constants used throughout the application:

- **HTTPMethod**: GET, POST, PUT, PATCH, DELETE
- **HttpResponseCodes**: Success (200), Created (201), BadRequest (400), Unauthorized (401), etc.
- **Roles**: doctor, admin, super_admin, nurse, staff
- **HTTPHeader**: Content-Type, Authorization, Accept
- **HTTPContentType**: application/json, multipart/form-data, etc.

```typescript
import { HTTPMethod, HttpResponseCodes } from '../enums';
```

### 2. Utils (`src/utils/`)

Utility functions for common operations:

#### Cookie Management (`utils/cookie.ts`)
```typescript
getCookie(cookieName: string): string | undefined
setCookie(cookieName: string, cookieValue: string, days?: number): void
removeCookie(cookieName: string): void
```

#### Local Storage (`utils/generic.ts`)
```typescript
setValueInLocalStorage(key: string, value: any): void
getValueFromLocalStorage<T>(key: string): T | null
removeValueFromLocalStorage(key: string): void
clearLocalStorage(): void
```

### 3. API Layer (`src/services/api.ts`)

Base HTTP request handler using Axios (matching the operations codebase):

```typescript
handleApiRequest(
  method: HTTPMethod,
  url: string,
  queryStringParams?: Record<string, any>,
  headers?: Record<string, string>,
  data?: any
): Promise<{ status: number; data: any; headers: any; message: string }>
```

Features:
- Uses Axios for HTTP requests (same as operations codebase)
- Automatic query string building via `params`
- Request/response logging
- Error handling with proper error.response parsing
- 30-second timeout
- Content-type detection

### 4. Base Service (`src/services/baseService.ts`)

Wrapper around `handleApiRequest` that adds:
- Automatic authentication headers (Bearer token)
- Retry logic for unauthorized requests (up to 3 attempts)
- Automatic logout on repeated auth failures
- Base URL prepending

```typescript
handleRequestAsync(
  payload: {
    method: HTTPMethod;
    url: string;
    queryStringParams?: Record<string, any>;
    headers?: Record<string, string>;
    data?: any;
  },
  isOpenEndpoint: boolean = false
): Promise<Response>
```

### 5. Service Files

Each service follows this pattern:

#### Naming Convention
- Service files: `serviceName.ts` (e.g., `authentication.ts`, `users.ts`)
- Functions: `verbNounAsync` (e.g., `loginAsync`, `getUsersListAsync`, `createUserAsync`)
- Service export: `ServiceNameService` (e.g., `AuthenticationService`, `UserService`)

#### Return Type Pattern
```typescript
interface PromiseReturnType {
  success: boolean;
  message: string;
  data?: any;
}
```

#### Example Service Structure

```typescript
// services/users.ts
import { HTTPMethod, HttpResponseCodes } from "../enums";
import { handleRequestAsync } from "./baseService";

interface PromiseReturnType {
  success: boolean;
  message: string;
  data?: any;
}

const getUsersListAsync = async (
  page: number = 1,
  limit: number = 10,
  filters?: any
): Promise<PromiseReturnType> => {
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

const UserService = {
  getUsersListAsync,
  getUserByIdAsync,
  createUserAsync,
  updateUserAsync,
  deleteUserAsync,
};

export default UserService;
```

### 6. Mock Data (`src/services/mockData.ts`)

Provides mock data for development when backend is not available:

```typescript
export const mockUsers: User[] = [...];
export const mockDepartments: Department[] = [...];
export const mockRoles: Role[] = [...];

// Helpers
export const simulateDelay = (ms: number = 500) => Promise<...>;
export const mockResponse = <T>(data: T, status: number = 200) => {...};
```

**Enable/Disable Mock Mode:**
```typescript
// In each service file
const USE_MOCK_DATA = true; // Set to false when backend is ready
```

### 7. Available Services

#### Authentication Service (`services/authentication.ts`)
```typescript
AuthenticationService.loginAsync(email, password)
AuthenticationService.logoutAsync()
AuthenticationService.getCurrentUserAsync()
AuthenticationService.verifyTokenAsync()
```

#### User Service (`services/users.ts`)
```typescript
UserService.getUsersListAsync(page, limit, filters)
UserService.getUserByIdAsync(id)
UserService.createUserAsync(userData)
UserService.updateUserAsync(id, userData)
UserService.deleteUserAsync(id)
```

#### Department Service (`services/departments.ts`)
```typescript
DepartmentService.getDepartmentsListAsync(page, limit)
DepartmentService.getDepartmentByIdAsync(id)
DepartmentService.createDepartmentAsync(departmentData)
DepartmentService.updateDepartmentAsync(id, departmentData)
DepartmentService.deleteDepartmentAsync(id)
```

#### Role Service (`services/roles.ts`)
```typescript
RoleService.getRolesListAsync(page, limit)
RoleService.getRoleByIdAsync(id)
RoleService.createRoleAsync(roleData)
RoleService.updateRoleAsync(id, roleData)
RoleService.deleteRoleAsync(id)
```

### 8. Hooks

#### useAuth (`hooks/useAuth.tsx`)
```typescript
const { user, setUser, login, logout, isAuthenticated } = useAuth();
```

Features:
- Manages user authentication state
- Provides login/logout functions
- Auto-redirects on logout
- Syncs with localStorage

#### useLocalStorage (`hooks/useLocalStorage.ts`)
```typescript
const [value, setValue] = useLocalStorage<T>('key', defaultValue);
```

## Usage Examples

### 1. Using a Service in a Component

```typescript
import { useState, useEffect } from 'react';
import UserService from '../services/users';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    const response = await UserService.getUsersListAsync(1, 10);
    
    if (response.success) {
      setUsers(response.data.users);
    } else {
      console.error(response.message);
    }
    
    setLoading(false);
  };

  return (
    <div>
      {/* Your component JSX */}
    </div>
  );
};
```

### 2. Using Authentication

```typescript
import { useAuth } from '../hooks/useAuth';
import AuthenticationService from '../services/authentication';

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const response = await AuthenticationService.loginAsync(email, password);
    
    if (response.success && response.data?.user) {
      login(response.data.user);
      // Navigation handled by AuthProvider
    } else {
      console.error(response.message);
    }
  };

  // ... rest of component
};
```

### 3. Protected Routes

```typescript
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
```

## Environment Configuration

Create a `.env` file in the root:

```env
VITE_API_URL=http://localhost:3001/api
```

Access in code:
```typescript
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api";
```

## Migration from Mock to Real API

1. **Set mock flag to false:**
   ```typescript
   const USE_MOCK_DATA = false;
   ```

2. **Ensure backend endpoints match:**
   - `/api/auth/login`
   - `/api/users`
   - `/api/departments`
   - `/api/roles`

3. **Update response format if needed:**
   Backend should return:
   ```json
   {
     "status": 200,
     "data": { ... },
     "message": "Success"
   }
   ```

## Key Differences from Redux Pattern

### Before (Redux):
```typescript
const dispatch = useAppDispatch();
const { user, loading } = useAppSelector(state => state.auth);

await dispatch(loginUser({ email, password })).unwrap();
```

### After (Context):
```typescript
const { user, login } = useAuth();

const response = await AuthenticationService.loginAsync(email, password);
if (response.success) {
  login(response.data.user);
}
```

## Benefits

1. **Simpler State Management**: No Redux boilerplate
2. **Clear Service Layer**: All API calls go through structured services
3. **Mock Data Support**: Easy to develop without backend
4. **Type Safety**: Full TypeScript support
5. **Consistent Patterns**: Following operations codebase conventions
6. **Error Handling**: Built-in retry logic and error handling
7. **Auth Management**: Automatic token handling and refresh

## Testing

Mock credentials (when using mock server):
```
Email: admin@novocuris.com
Password: password

Email: zal.cante@novocuris.com
Password: password

Email: doctor@novocuris.com
Password: password
```

## Best Practices

1. Always use the `Async` suffix for async functions
2. Use proper TypeScript interfaces for request/response types
3. Handle both success and error cases
4. Use the standardized return format: `{ success, message, data? }`
5. Keep services focused on a single domain (users, auth, etc.)
6. Use enums for constants instead of magic strings
7. Log API calls for debugging (already built-in)

## Adding a New Service

1. Create new service file: `src/services/newService.ts`
2. Define interfaces and types
3. Implement service functions following the async pattern
4. Add mock data if needed in `mockData.ts`
5. Export as default: `export default NewService;`
6. Import in components: `import NewService from '../services/newService';`

