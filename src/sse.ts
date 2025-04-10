// UNCOMMENT AND FIX WHEN WE HAVE THE CORRECT SSE IMPLEMENTATION
/*
import express from 'express';
import { app, server } from './server.js';
import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse.js';

// Setup SSE transport on Express route
app.all('/mcp', (req, res) => {
  console.log('MCP SSE connection received');
  
  // Set necessary headers for SSE
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  
  try {
    // Initialize SSE transport with request and response
    // Note: This is a simplified implementation and may need adjustments
    // based on the actual SSE transport implementation in the SDK
    const transport = new SSEServerTransport(req, res);
    
    // Handle client disconnect
    req.on('close', () => {
      console.log('MCP SSE connection closed');
    });
    
    // Connect the server to the transport
    server.connect(transport).catch(err => {
      console.error('Error connecting transport:', err);
    });
  } catch (error) {
    console.error('Error setting up transport:', error);
    res.status(500).send('Internal Server Error');
  }
});

export default app;
*/ 