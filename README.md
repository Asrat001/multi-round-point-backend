# Multi-Round Game Backend

A real-time multiplayer game backend built with NestJS and Socket.IO, supporting multiple game rounds and real-time player interactions.

## Live Demo

You can play the game at: [Multi-Round Game](https://vercel.com/asrat001s-projects/multi-round-front-end)

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

1. Clone the repository:
```bash
git clone <repository-url>
cd multi-round-backend
```

2. Install dependencies:
```bash
pnpm install
```

## Running the Application

### Development Mode
```bash
pnpm start:dev
```
This will start the application in development mode with hot-reload enabled.

### Production Mode
```bash
# Build the application
pnpm build

# Start the production server
pnpm start:prod
```

### Debug Mode
```bash
pnpm start:debug
```

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

## Project Structure

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

## API Documentation

### WebSocket Events

The game uses WebSocket for real-time communication. Here are the main events:

- `joinGame`: Join a game session
- `leaveGame`: Leave a game session
- `gameState`: Current game state updates
- `roundUpdate`: Updates about game rounds

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
