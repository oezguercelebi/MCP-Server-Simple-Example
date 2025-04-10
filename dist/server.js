import express from 'express';
import cors from 'cors';
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { ListResourcesRequestSchema, ReadResourceRequestSchema, ListPromptsRequestSchema, GetPromptRequestSchema, CallToolRequestSchema } from '@modelcontextprotocol/sdk/types.js';
// Create Express app
const app = express();
app.use(cors());
app.use(express.json());
// Create MCP server
const server = new Server({
    name: "express-mcp-server",
    version: "1.0.0"
}, {
    capabilities: {
        tools: {},
        resources: {},
        prompts: {}
    }
});
// Define basic health and info endpoints
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});
app.get('/info', (req, res) => {
    res.status(200).json({
        name: "express-mcp-server",
        version: "1.0.0",
        description: "MCP server with Express and SSE transport",
        capabilities: ["tools", "resources", "prompts"]
    });
});
// Tool handlers
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    if (name === 'echo') {
        const message = args?.message;
        return {
            content: [{ type: 'text', text: `Echo: ${message}` }]
        };
    }
    if (name === 'getCurrentTime') {
        const now = new Date();
        return {
            content: [{ type: 'text', text: `Current time: ${now.toISOString()}` }]
        };
    }
    throw new Error(`Unknown tool: ${name}`);
});
// Resource handlers
server.setRequestHandler(ListResourcesRequestSchema, async () => {
    return {
        resources: [
            {
                uri: "example://resource",
                name: "Example Resource"
            }
        ]
    };
});
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
    if (request.params.uri !== "example://resource") {
        throw new Error("Resource not found");
    }
    return {
        contents: [
            {
                uri: "example://resource",
                text: "This is an example resource provided by the Express MCP server."
            }
        ]
    };
});
// Prompt handlers
server.setRequestHandler(ListPromptsRequestSchema, async () => {
    return {
        prompts: [
            {
                name: "greeting",
                description: "A simple greeting prompt",
                arguments: [
                    {
                        name: "name",
                        description: "Name to greet",
                        required: true
                    }
                ]
            }
        ]
    };
});
server.setRequestHandler(GetPromptRequestSchema, async (request) => {
    if (request.params.name !== "greeting") {
        throw new Error("Prompt not found");
    }
    const name = request.params.arguments?.name || "User";
    return {
        description: "A simple greeting prompt",
        messages: [
            {
                role: "user",
                content: {
                    type: "text",
                    text: `Hello! My name is ${name}. How are you today?`
                }
            }
        ]
    };
});
// Export Express app and server for use in other files
export { app, server };
//# sourceMappingURL=server.js.map