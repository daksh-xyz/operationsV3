#!/bin/bash

# Start development environment for Operations V3

echo "🚀 Starting Operations V3 Development Environment"
echo "=================================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Install server dependencies if not already installed
if [ ! -d "node_modules" ] || [ ! -f "node_modules/express/package.json" ]; then
    echo "📦 Installing server dependencies..."
    npm install express cors jsonwebtoken bcryptjs
    npm install --save-dev nodemon
fi

# Start the server in the background
echo "🔧 Starting API server on port 3001..."
node server.js &
SERVER_PID=$!

# Wait a moment for server to start
sleep 2

# Check if server started successfully
if ! curl -s http://localhost:3001/api/health > /dev/null; then
    echo "❌ Failed to start server. Please check the server logs."
    kill $SERVER_PID 2>/dev/null
    exit 1
fi

echo "✅ API server started successfully!"

# Start the frontend
echo "🌐 Starting frontend development server..."
npm run dev &
FRONTEND_PID=$!

echo ""
echo "🎉 Development environment is running!"
echo "=================================================="
echo "📡 API Server: http://localhost:3001"
echo "🌐 Frontend: http://localhost:5173"
echo "📚 Documentation: See AUTHENTICATION_SETUP.md"
echo ""
echo "Test users:"
echo "  - admin@novocuris.com / password"
echo "  - zal.cante@novocuris.com / password"
echo "  - doctor@novocuris.com / password"
echo ""
echo "Press Ctrl+C to stop both servers"

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Stopping servers..."
    kill $SERVER_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    echo "✅ Servers stopped"
    exit 0
}

# Set trap to cleanup on script exit
trap cleanup SIGINT SIGTERM

# Wait for both processes
wait

