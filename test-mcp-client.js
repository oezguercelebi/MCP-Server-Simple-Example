// Simple script to test our MCP server as a client
// Run with: node test-mcp-client.js

import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { spawn } from 'child_process';

async function main() {
  // Start the server process
  const serverProcess = spawn('node', ['dist/index.js'], {
    stdio: ['pipe', 'pipe', process.stderr]
  });

  // Create MCP client
  const transport = new StdioClientTransport(
    serverProcess.stdin,
    serverProcess.stdout
  );

  const client = new Client({
    name: 'mcp-test-client',
    version: '1.0.0'
  });

  try {
    // Connect to the server
    await client.connect(transport);
    console.log('Connected to MCP server');

    // Test tool call - echo
    const echoResult = await client.callTool({
      name: 'echo',
      arguments: {
        message: 'Hello from MCP test client!'
      }
    });
    console.log('Echo tool result:', JSON.stringify(echoResult, null, 2));

    // Test tool call - getCurrentTime
    const timeResult = await client.callTool({
      name: 'getCurrentTime',
      arguments: {}
    });
    console.log('Time tool result:', JSON.stringify(timeResult, null, 2));

    // Test reading a resource
    const resource = await client.readResource({
      uri: 'example://resource'
    });
    console.log('Resource result:', JSON.stringify(resource, null, 2));

    // Test getting a prompt
    const prompt = await client.getPrompt({
      name: 'greeting',
      arguments: {
        name: 'MCP Client'
      }
    });
    console.log('Prompt result:', JSON.stringify(prompt, null, 2));

  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Cleanup
    serverProcess.kill();
    console.log('Server process terminated');
  }
}

main().catch(console.error); 