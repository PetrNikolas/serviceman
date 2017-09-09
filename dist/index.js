"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//------------------------------------------------------------------------------
// Import all packages
//------------------------------------------------------------------------------
const app_1 = require("./app");
//------------------------------------------------------------------------------
// Start server
//------------------------------------------------------------------------------
const port = process.env.PORT || 3000;
app_1.default.listen(port, (err) => {
    // Error message
    if (err) {
        return console.log(err);
    }
    // Success server running
    return console.log(`Server running at https://127.0.0.1:${port}`);
});
//# sourceMappingURL=index.js.map