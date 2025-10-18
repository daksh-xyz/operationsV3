# OperationsV3 - Frontend Application

A modern React + TypeScript frontend application following the operations codebase patterns, with built-in mock data for development.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🔑 Login Credentials

Use any of these mock users (password is always "password"):

- `admin@novocuris.com`
- `zal.cante@novocuris.com`
- `doctor@novocuris.com`
- `nurse.jane@novocuris.com`
- `staff.mike@novocuris.com`

## 📁 Project Structure

```
src/
├── enums/              # HTTP methods, response codes, roles
├── utils/              # Cookie & localStorage utilities
├── hooks/              # useAuth, useLocalStorage
├── services/           # API services with mock data
│   ├── api.ts          # Axios-based HTTP handler
│   ├── baseService.ts  # Auth wrapper & retry logic
│   ├── mockData.ts     # Mock users, departments, roles
│   ├── authentication.ts
│   ├── users.ts
│   ├── departments.ts
│   └── roles.ts
├── components/         # React components
├── pages/              # Page components
└── App.tsx
```

## 🎯 Key Features

### ✅ Built-in Mock Data
- No backend server required
- Complete mock data for users, departments, and roles
- Simulated API delays for realistic experience
- Easy to switch to real API (change `USE_MOCK_DATA` flag)

### ✅ Matches Operations Codebase
- Same service architecture pattern
- Same naming conventions (functionAsync)
- Same return format: `{ success, message, data }`
- Uses Axios (same as operations)

### ✅ Modern Stack
- React 18 + TypeScript
- Context API (no Redux)
- Axios for HTTP requests
- TailwindCSS for styling
- Vite for fast builds

## 🔧 Development

### Mock Data Mode (Default)
All services have `USE_MOCK_DATA = true` by default:

```typescript
// src/services/authentication.ts
const USE_MOCK_DATA = true; // Uses mock data
```

### Switch to Real API
When your backend is ready:

1. Set `USE_MOCK_DATA = false` in each service file
2. Configure API base URL in `.env`:
   ```
   VITE_API_URL=http://your-backend-url/api
   ```

## 📚 Documentation

- **SERVICE_ARCHITECTURE.md** - Complete architecture guide
- **IMPLEMENTATION_SUMMARY.md** - Implementation details
- **FINAL_STATUS.md** - Project status and verification

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## 🎨 Features Implemented

- ✅ User authentication with mock data
- ✅ User management page with CRUD operations
- ✅ Protected routes
- ✅ Mock departments and roles
- ✅ Responsive design
- ✅ Type-safe with TypeScript

## 📝 Service Pattern

All services follow this pattern:

```typescript
import { HTTPMethod, HttpResponseCodes } from "../enums";
import { handleRequestAsync } from "./baseService";

const getUsersListAsync = async (
  page: number = 1,
  limit: number = 10
): Promise<{ success: boolean; message: string; data?: any }> => {
  const payload = {
    method: HTTPMethod.GET,
    url: "/users",
    queryStringParams: { page, limit },
  };
  
  const response = await handleRequestAsync(payload, false);
  
  if (response && response.status === HttpResponseCodes.Success) {
    return { success: true, message: "Success", data: response.data };
  }
  
  return { success: false, message: "Failed" };
};

export default { getUsersListAsync };
```

## 🔐 Authentication Flow

1. User enters credentials
2. `AuthenticationService.loginAsync()` checks mock data
3. If valid, generates mock token
4. Stores user + token in localStorage
5. `AuthProvider` manages auth state
6. Protected routes check `isAuthenticated`

## 🎯 Tech Stack

| Technology | Purpose |
|------------|---------|
| React 18 | UI framework |
| TypeScript | Type safety |
| Vite | Build tool |
| TailwindCSS | Styling |
| Axios | HTTP client |
| Context API | State management |
| React Router | Routing |

## 🚀 Production Build

```bash
npm run build
```

The build is output to the `dist/` folder.

## 📄 License

Private project for Novocuris.

## 👥 Mock Users

| Email | Role | Department |
|-------|------|------------|
| admin@novocuris.com | admin | IT |
| zal.cante@novocuris.com | super_admin | Hospital Administration |
| doctor@novocuris.com | doctor | Cardiology |
| nurse.jane@novocuris.com | nurse | Emergency |
| staff.mike@novocuris.com | staff | Reception |

All passwords: `password`

---

**Note**: This is a 100% frontend application. All data is stored in browser localStorage during mock mode. No backend server is required for development.
