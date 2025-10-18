# Redux Store Setup

This project uses Redux Toolkit for global state management to avoid prop-drilling and provide a centralized state management solution.

## Store Structure

The Redux store is organized into the following slices:

### 1. Auth Slice (`authSlice.ts`)
Manages authentication state including:
- User login/logout
- User information
- Authentication tokens
- Loading states
- Error handling

**State Shape:**
```typescript
interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}
```

### 2. UI Slice (`uiSlice.ts`)
Manages UI-related state including:
- Sidebar toggle
- Theme management
- Notifications
- Loading states
- Modal states

**State Shape:**
```typescript
interface UiState {
  sidebarOpen: boolean;
  theme: 'light' | 'dark';
  notifications: Notification[];
  loading: { global: boolean; [key: string]: boolean };
  modals: { [key: string]: boolean };
}
```

### 3. User Slice (`userSlice.ts`)
Manages user management state including:
- User list
- Selected user
- Filters and pagination
- CRUD operations

**State Shape:**
```typescript
interface UserState {
  users: User[];
  selectedUser: User | null;
  loading: boolean;
  error: string | null;
  filters: { role: string; department: string; search: string };
  pagination: { page: number; limit: number; total: number };
}
```

## Usage

### 1. Using Redux in Components

```typescript
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loginStart, loginSuccess } from '../store/slices/authSlice';

const MyComponent = () => {
  const dispatch = useAppDispatch();
  
  // Access state
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const { sidebarOpen } = useAppSelector((state) => state.ui);
  
  // Dispatch actions
  const handleLogin = () => {
    dispatch(loginStart());
    // ... login logic
  };
  
  return (
    <div>
      {isAuthenticated ? `Welcome ${user?.name}` : 'Please login'}
    </div>
  );
};
```

### 2. Available Actions

#### Auth Actions
- `loginStart()` - Start login process
- `loginSuccess({ user, token })` - Login successful
- `loginFailure(error)` - Login failed
- `logout()` - Logout user
- `clearError()` - Clear auth errors
- `updateUser(userData)` - Update user information

#### UI Actions
- `toggleSidebar()` - Toggle sidebar
- `setSidebarOpen(boolean)` - Set sidebar state
- `setTheme('light' | 'dark')` - Set theme
- `addNotification({ type, message })` - Add notification
- `removeNotification(id)` - Remove notification
- `setLoading({ key, loading })` - Set loading state
- `setModalOpen({ key, open })` - Control modals

#### User Actions
- `setUsers(users[])` - Set user list
- `addUser(user)` - Add new user
- `updateUser(user)` - Update user
- `deleteUser(id)` - Delete user
- `setSelectedUser(user)` - Set selected user
- `setFilters(filters)` - Set user filters
- `setPagination(pagination)` - Set pagination

### 3. TypeScript Support

The store is fully typed with TypeScript:
- `RootState` - Type for the entire store state
- `AppDispatch` - Type for dispatch function
- `useAppSelector` - Typed selector hook
- `useAppDispatch` - Typed dispatch hook

## Best Practices

1. **Use selectors for state access**: Always use `useAppSelector` instead of direct state access
2. **Use typed hooks**: Use `useAppDispatch` and `useAppSelector` for better TypeScript support
3. **Keep actions simple**: Actions should be pure functions that return new state
4. **Use async thunks for API calls**: For complex async operations, consider using `createAsyncThunk`
5. **Normalize data**: For complex data structures, consider normalizing the state
6. **Avoid deep nesting**: Keep state structure flat when possible

## Example Implementation

See `src/components/ReduxExample.tsx` for a comprehensive example of how to use the Redux store in components.

## Adding New Slices

To add a new slice:

1. Create a new file in `src/store/slices/`
2. Define the state interface
3. Create the slice with `createSlice`
4. Export actions and reducer
5. Add the reducer to the store in `src/store/index.ts`
6. Update the `RootState` type if needed

## DevTools

Redux DevTools Extension is supported and will automatically work with the store configuration.
