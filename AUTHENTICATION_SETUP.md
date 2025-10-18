# Authentication Setup Guide

This guide explains how to set up and use the authentication system for the Operations V3 application.

## Server Setup

### 1. Install Server Dependencies

First, install the server dependencies:

```bash
# Copy the server package.json
cp server-package.json package-server.json

# Install server dependencies
npm install --prefix . express cors jsonwebtoken bcryptjs
npm install --save-dev --prefix . nodemon
```

### 2. Start the Server

```bash
# Start the server
node server.js

# Or for development with auto-restart
npx nodemon server.js
```

The server will run on `http://localhost:3001`

### 3. Test Server Endpoints

You can test the server endpoints using curl or Postman:

```bash
# Health check
curl http://localhost:3001/api/health

# Login (example)
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@novocuris.com", "password": "password"}'
```

## Frontend Setup

### 1. Install Frontend Dependencies

The frontend dependencies are already installed, but if you need to reinstall:

```bash
npm install
```

### 2. Start the Frontend

```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## Test Users

The server comes with pre-configured test users:

| Email | Password | Role | Department |
|-------|----------|------|------------|
| admin@novocuris.com | password | admin | IT |
| zal.cante@novocuris.com | password | super_admin | Hospital Administration |
| doctor@novocuris.com | password | doctor | Cardiology |

## Authentication Flow

1. **Login**: Users enter credentials on the login page
2. **Token Storage**: JWT token is stored in localStorage
3. **Route Protection**: All routes except `/login` are protected
4. **Auto-login**: If a valid token exists, user is automatically logged in
5. **Logout**: Token is removed and user is redirected to login

## API Endpoints

### Authentication Endpoints

- `POST /api/auth/login` - Login with email and password
- `POST /api/auth/logout` - Logout (requires authentication)
- `GET /api/auth/me` - Get current user info (requires authentication)
- `POST /api/auth/verify` - Verify token (requires authentication)
- `GET /api/health` - Health check

### Request/Response Examples

#### Login Request
```json
{
  "email": "admin@novocuris.com",
  "password": "password"
}
```

#### Login Response
```json
{
  "success": true,
  "user": {
    "id": "1",
    "email": "admin@novocuris.com",
    "name": "Admin User",
    "role": "admin",
    "department": "IT"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

## Security Notes

1. **JWT Secret**: Change the JWT secret in production
2. **Password Hashing**: Passwords are hashed using bcrypt
3. **Token Expiration**: Tokens expire after 24 hours
4. **CORS**: Configure CORS for production domains

## Troubleshooting

### Common Issues

1. **Server not starting**: Check if port 3001 is available
2. **CORS errors**: Ensure the server is running and CORS is configured
3. **Login fails**: Check if the server is running and accessible
4. **Token errors**: Clear localStorage and try logging in again

### Development Tips

1. Use browser dev tools to inspect network requests
2. Check the Redux DevTools for state changes
3. Monitor server logs for API errors
4. Test with different user roles

## Production Considerations

1. Use environment variables for configuration
2. Implement proper error handling
3. Add rate limiting
4. Use HTTPS
5. Implement token refresh mechanism
6. Add proper logging and monitoring
