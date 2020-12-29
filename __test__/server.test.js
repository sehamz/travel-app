const request = require("supertest");
const app = require('../src/server/index')

describe("Testing:", () => {
    test("GET function", end => {
        request(app).get("/getTrips")
            .then(response => {
                expect(response.statusCode).toBe(200);
                end()
            });
    })
});