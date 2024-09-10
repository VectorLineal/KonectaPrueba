const request = require("supertest");
const app = require("../app");

const id = 59576102;
const inputTest = {
    id,
    code: "No.39",
    description: "Test Request",
    sumary: "This Requests is just a Test",
    employeeId: 1
  };
  
  describe("test case Requests Routes", () => {
  
    it("test case for creating a request", async () => {
        const createRequest = await request(app).post("/requests").send(inputTest);
        expect(createRequest.status).toBe(201);
        expect(createRequest.body.isDeleted).toBeFalsy();
      });

    it("test case for getting all requests", async () => {
      const response = await request(app).get("/requests");
      expect(response.status).toBe(200);
    });

    it("test case for getting a single request", async () => {
        const response = await request(app).get("/requests/" + id);
        expect(response.status).toBe(200);
        expect(response.body.code).toBe(inputTest.code);
    });

    it("test case for getting asingle request with certain employeeId", async () => {
        const response = await request(app).get("/requestsEmployee/" + inputTest.employeeId);
        expect(response.status).toBe(200);
        expect(response.body.employeeId).toBe(inputTest.employeeId);
    });
  
    it("test case for deleting the request", async () => {
      const deleteRequest = await request(app).delete("/requests/" + id).send({});
      expect(deleteRequest.status).toBe(200);
    });
  });