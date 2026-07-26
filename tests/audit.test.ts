import request from "supertest";
import app from "../src/app";

describe("Page Pulse Audit API", () => {
  it("GET /health - Should return 200 OK", async () => {
    const res = await request(app).get("/health");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("status", "ok");
    expect(res.headers).toHaveProperty("x-request-id");
  });

  it("POST /api/audit - Should reject invalid URL input", async () => {
    const res = await request(app)
      .post("/api/audit")
      .send({ url: "not-a-valid-url" });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("code", "INVALID_INPUT");
  });

  it("POST /api/audit - Should reject missing body", async () => {
    const res = await request(app).post("/api/audit").send({});

    expect(res.statusCode).toEqual(400);
  });
});
