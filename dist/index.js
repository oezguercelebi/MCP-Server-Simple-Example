import { app, server } from './server.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
// Start the MCP server with StdioServerTransport
async function main() {
    console.log('Starting MCP server with StdioServerTransport...');
    try {
        const transport = new StdioServerTransport();
        await server.connect(transport);
        console.log('MCP server connected with StdioServerTransport');
    }
    catch (error) {
        console.error('Error connecting transport:', error);
        process.exit(1);
    }
}
// If called directly (not imported)
if (import.meta.url === import.meta.resolve(process.argv[1])) {
    main().catch(err => {
        console.error('Error starting server:', err);
        process.exit(1);
    });
}
// We'll also start the Express server on a port for debugging/testing
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Express server running on http://localhost:${PORT}`);
    console.log(`Health check available at http://localhost:${PORT}/health`);
    console.log(`Server info available at http://localhost:${PORT}/info`);
});
//# sourceMappingURL=index.js.map