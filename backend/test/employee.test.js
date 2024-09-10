const request = require("supertest");
const app = require("../app");

const id = 184510836;
const inputTest = {
    id,
    name: "Test Employee",
    salary: 4000
  };
  
  describe("test case Requests Routes", () => {
  
    it("test case for creating a employee", async () => {
        const createRequest = await request(app).post("/employees").send(inputTest);
        expect(createRequest.status).toBe(201);
        expect(createRequest.body.isDeleted).toBeFalsy();
      });

    it("test case for getting all employees", async () => {
      const response = await request(app).get("/employees");
      expect(response.status).toBe(200);
    });

    it("test case for getting a single employee", async () => {
        const response = await request(app).get("/employees/" + id);
        expect(response.status).toBe(200);
        expect(response.body.name).toBe(inputTest.name);
    });
  });