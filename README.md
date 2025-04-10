# MCP Express Server

A Model Context Protocol (MCP) server implemented with Node.js, Express, and TypeScript.

## Features

- Implements MCP tools, resources, and prompts
- Supports both StdioServerTransport for command-line usage
- Express HTTP server for testing and debugging

## Available MCP Capabilities

### Tools
- `echo` - Echoes back a message
- `getCurrentTime` - Returns the current time in ISO format

### Resources
- `example://resource` - A simple example resource

### Prompts
- `greeting` - A simple greeting prompt template

## Setup

```bash
# Install dependencies
npm install

# Build the TypeScript code
npm run build
```

## Running the Server

### Using StdioServerTransport (for MCP Clients)

```bash
npm start
```

### Running the Express Server for Testing

```bash
npm run dev
```

## Adding to Cursor

To add this server to Cursor, add the following to your `~/.cursor/mcp.json` file:

```json
{
  "mcpServers": {
    "Express MCP Server": {
      "command": "node",
      "args": ["path/to/dist/index.js"],
      "transport": "stdio"
    }
  }
}
```

Replace `path/to/dist/index.js` with the actual path to your built index.js file.

## Testing API Endpoints

- Health check: `http://localhost:3000/health`
- Server info: `http://localhost:3000/info`

## Development

```bash
# Run in development mode
npm run dev
``` 