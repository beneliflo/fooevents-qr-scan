const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3443; // Update the port number to the desired HTTPS port

app.use(
  '/',
  createProxyMiddleware({
    target: 'http://localhost:3000', // Update this to match the existing Next.js server URL
    changeOrigin: true,
  })
);

const sslOptions = {
  key: fs.readFileSync(path.resolve(__dirname, 'localhost-key.pem')),
  cert: fs.readFileSync(path.resolve(__dirname, 'localhost.pem')),
};

https.createServer(sslOptions, app).listen(port, () => {
  console.log(`Proxy server running on https://localhost:${port}`);
});