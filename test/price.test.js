const request = require("supertest");
const app = require("../app.js");

describe("Calculate Price API", () => {
    it("Return an error for missing required fields", async () => {
        const response = await request(app)
            .post("/api/calculate-price")
            .send({
                zone: "north",
                // Missing required field: organization_id
                total_distance: 3,
                item_type: "perishable"
            });

        expect(response.statusCode).toEqual(400);
        expect(response.body.success).toBeFalsy();
        expect(response.body.error).toContain("Missing required fields");
    });

    it("Calculate price for perishable items within base distance", async () => {
        const response = await request(app)
            .post("/api/calculate-price")
            .send({
                zone: "north",
                organization_id: "001",
                total_distance: 1,
                item_type: "perishable"
            });

        expect(response.statusCode).toEqual(200);
        expect(response.body.success).toBeTruthy();
        expect(response.body.total_price).toEqual(1000 / 100);
    });

    it("Calculate price for non-perishable items within base distance", async () => {
        const response = await request(app)
            .post("/api/calculate-price")
            .send({
                zone: "east",
                organization_id: "002",
                total_distance: 2,
                item_type: "non-perishable"
            });

        expect(response.statusCode).toEqual(200);
        expect(response.body.success).toBeTruthy();
        expect(response.body.total_price).toEqual(1000 / 100);
    });

    it("Calculate price for perishable items beyond base distance", async () => {
        const response = await request(app)
            .post("/api/calculate-price")
            .send({
                zone: "central",
                organization_id: "005",
                total_distance: 12,
                item_type: "perishable"
            });

        expect(response.statusCode).toEqual(200);
        expect(response.body.success).toBeTruthy();
        expect(response.body.total_price).toEqual((1000 + (12 - 5) * 150) / 100);
    });

    it("Calculate price for non-perishable items beyond base distance", async () => {
        const response = await request(app)
            .post("/api/calculate-price")
            .send({
                zone: "north",
                organization_id: "004",
                total_distance: 20,
                item_type: "non-perishable"
            });

        expect(response.statusCode).toEqual(200);
        expect(response.body.success).toBeTruthy();
        expect(response.body.total_price).toEqual((1000 + (20 - 5) * 100) / 100);
    });
});