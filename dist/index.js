"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//------------------------------------------------------------------------------
// Import all packages
//------------------------------------------------------------------------------
const http = require("http");
const debug = require("debug");
const app_1 = require("./app");
//------------------------------------------------------------------------------
// Debug function
//------------------------------------------------------------------------------
debug('ts-express:server');
//------------------------------------------------------------------------------
// Error handling
//------------------------------------------------------------------------------
function error(error) {
    if (error.syscall !== 'listen')
        throw error;
    const bind = (typeof port === 'string') ? 'Pipe ' + port : 'Port ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
}
//------------------------------------------------------------------------------
// Listening handling
//------------------------------------------------------------------------------
function listening() {
    const addr = server.address();
    const bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
    debug(`Listening on ${bind}`);
}
//------------------------------------------------------------------------------
// Setup port
//------------------------------------------------------------------------------
const port = process.env.PORT || 3000;
app_1.default.set('port', port);
//------------------------------------------------------------------------------
// Start server
//------------------------------------------------------------------------------
const server = http.createServer(app_1.default);
server.listen(port, (err) => {
    // Error message
    if (err) {
        return console.log(err);
    }
    // Success server running
    return console.log(`Server running at https://127.0.0.1:${port}`);
});
server.on('error', error);
server.on('listening', listening);
//# sourceMappingURL=index.js.map