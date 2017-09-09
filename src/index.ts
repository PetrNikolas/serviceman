//------------------------------------------------------------------------------
// Import all packages
//------------------------------------------------------------------------------
import app from './app';


//------------------------------------------------------------------------------
// Start server
//------------------------------------------------------------------------------
const port = process.env.PORT || 3000;

app.listen(port, (err: any) => {
  // Error message
  if (err) {
    return console.log(err);
  }

  // Success server running
  return console.log(`Server running at https://127.0.0.1:${port}`);
});