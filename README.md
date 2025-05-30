# Multi-Round Game Backend

A real-time multiplayer game backend built with NestJS and Socket.IO, supporting multiple game rounds and real-time player interactions.

## Author
Asrat Adane

## Live Demo

You can play the game at: [Multi-Round Game](https://multi-round-front-end.vercel.app/)

## Features

- Real-time multiplayer game support using WebSocket connections
- Multiple game rounds management
- Player session handling
- Game state synchronization
- Built with NestJS for robust and scalable architecture
- TypeScript for type safety and better development experience

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- pnpm (v10.11.0 or higher)

## Installation

### Backend Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd multi-round-backend
```

2. Install dependencies:
```bash
pnpm install
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd ../multi-round-front-end
```

2. Install dependencies:
```bash
pnpm install
```

## Running the Application

### Backend Server

1. Navigate to the backend directory:
```bash
cd multi-round-backend
```

2. Start the development server:
```bash
pnpm start:dev
```

The backend server will run on port 3000 by default.

### Frontend Application

1. Navigate to the frontend directory:
```bash
cd multi-round-front-end
```

2. Start the development server:
```bash
pnpm dev
```

The frontend application will run on port 5173 by default.

## Configuration and Hardcoded Values

### Backend Configuration
- Server Port: 3000
- WebSocket Gateway Port: 3000
- Minimum Players Required: 4
- Maximum Players Allowed: 8 
- Number of Rounds: 3
- Round Duration: 60 seconds

### Frontend Configuration
- Development Server Port: 5173
- Backend API URL: http://localhost:3000
- WebSocket Connection URL: ws://localhost:3000

## Project Structure and Design Decisions

### Backend Structure
```
src/
├── game/              # Game module
│   ├── game.gateway.ts    # WebSocket gateway for real-time communication
│   ├── game.service.ts    # Game business logic
│   └── game.module.ts     # Game module configuration
├── app.module.ts      # Root application module
├── main.ts           # Application entry point
└── app.controller.ts # Basic HTTP endpoints
```

### Design Decisions and Assumptions

1. **WebSocket Implementation**
   - Used Socket.IO for real-time communication
   - Implemented a gateway pattern for handling WebSocket connections
   - Assumed stable network connection for real-time game updates

2. **Game Logic**
   - Implemented round-based gameplay with fixed duration
   - Assumed players will join within a reasonable time frame
   - Implemented automatic game start when minimum players are reached

3. **State Management**
   - Used in-memory state management for game sessions
   - Implemented cleanup for disconnected players
   - Assumed game sessions will be relatively short-lived

4. **Error Handling**
   - Implemented graceful error handling for disconnections
   - Added validation for player actions
   - Assumed client-side error recovery capabilities

## Testing

The project includes comprehensive test suites:

```bash
# Unit tests
pnpm test

# e2e tests
pnpm test:e2e

# Test coverage
pnpm test:cov
```

## Development

### Code Style

The project uses ESLint and Prettier for code formatting. To format your code:

```bash
pnpm format
```

### Linting

To run the linter:

```bash
pnpm lint
```

## License

This project is private and unlicensed.

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
