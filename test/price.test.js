const app = require("../app.js");
const request = require("supertest");
const { describe, it, expect } = require("@jest/globals");

describe("Calculate Price API", () => {
    it("Return an error for missing required fields", async () => {
        const response = await request(app)
            .post("/api/calculate-price")
            .send({
                // Missing required field: zone
                // Missing required field: organization_id
                // Missing required field: total_distance
                // Missing required field: item_type
            });

        expect(response.statusCode).toEqual(400);
        expect(response.body.success).toBeFalsy();
        expect(response.body.error).toContain("Missing required fields: zone, organization_id, total_distance, item_type");
    });

    it("Return an error for incorrect zone", async () => {
        const response = await request(app)
            .post("/api/calculate-price")
            .send({
                zone: "india",
                organization_id: "005",
                total_distance: 12,
                item_type: "perishable"
            });

        expect(response.statusCode).toEqual(400);
        expect(response.body.success).toBeFalsy();
        expect(response.body.error).toContain("Invalid zone: must be one of north, north-east, east, south-east, south, south-west, west, north-west, central");
    });

    it("Return an error for invalid organization_id", async () => {
        const response = await request(app)
            .post("/api/calculate-price")
            .send({
                zone: "india",
                organization_id: 5,
                total_distance: 12,
                item_type: "perishable"
            });

        expect(response.statusCode).toEqual(400);
        expect(response.body.success).toBeFalsy();
        expect(response.body.error).toContain("Invalid organization_id: must be a string");
    });

    it("Return an error for incorrect total_distance", async () => {
        const response = await request(app)
            .post("/api/calculate-price")
            .send({
                zone: "india",
                organization_id: 5,
                total_distance: -12,
                item_type: "perishable"
            });

        expect(response.statusCode).toEqual(400);
        expect(response.body.success).toBeFalsy();
        expect(response.body.error).toContain("Invalid total_distance: cannot be negative");
    });

    it("Return an error for invalid item_type", async () => {
        const response = await request(app)
            .post("/api/calculate-price")
            .send({
                zone: "india",
                organization_id: 5,
                total_distance: -12,
                item_type: "fresh"
            });

        expect(response.statusCode).toEqual(400);
        expect(response.body.success).toBeFalsy();
        expect(response.body.error).toContain("Invalid item_type: must be one of perishable, non-perishable");
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

    it("Return an error for no pricing found for given parameters", async () => {
        const response = await request(app)
            .post("/api/calculate-price")
            .send({
                zone: "central",
                organization_id: "005",
                total_distance: 12,
                item_type: "non-perishable"
            });

        expect(response.statusCode).toEqual(400);
        expect(response.body.success).toBeFalsy();
        expect(response.body.error).toContain("No data found");
    });
});