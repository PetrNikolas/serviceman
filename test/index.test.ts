//------------------------------------------------------------------------------
// Import all packages
//------------------------------------------------------------------------------
import {} from 'jest';
import * as supertest from "supertest";


//------------------------------------------------------------------------------
// Request url for testing
//------------------------------------------------------------------------------
const request = supertest("http://localhost:8000");


//------------------------------------------------------------------------------
// Test
//------------------------------------------------------------------------------
describe("GET /", () => {
  it("should return 200 OK", (done) => {
    request.get("/")
      .expect(200, done);
  });
});