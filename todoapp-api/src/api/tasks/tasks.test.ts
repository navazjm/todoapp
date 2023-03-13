import request from "supertest";
import * as jwt from "jsonwebtoken";
import app from "../../app";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../../common/constants";

describe("/v1/tasks", () => {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    let id = "";
    let refreshToken = "";
    let accessToken = "";

    beforeAll(() => {
        refreshToken = jwt.sign({ user: { id: 1 } }, REFRESH_TOKEN_SECRET, {
            expiresIn: "5m"
        });
        accessToken = jwt.sign({ user: { id: 1 } }, ACCESS_TOKEN_SECRET, {
            expiresIn: "5m"
        });
    });

    // get all tasks
    test("GET /", async () =>
        await request(app)
            .get("/v1/tasks")
            .set("Accept", "application/json")
            .set("Cookie", [`jwt=${refreshToken}`])
            .set("Authorization", `Bearer ${accessToken}`)
            .expect(200)
            .then((response) => {
                expect(response.body).toHaveProperty("tasks");
                expect(response.body.tasks).toHaveProperty("length");
            }));

    // create new tasks
    test("POST / => responds with an error if the task is invalid", async () =>
        await request(app)
            .post("/v1/tasks")
            .set("Cookie", [`jwt=${refreshToken}`])
            .set("Authorization", `Bearer ${accessToken}`)
            .set("Accept", "application/json")
            .send({
                content: ""
            })
            .expect(422)
            .then((response) => {
                expect(response.body).toHaveProperty("message");
            }));
    test("POST / => responds with an inserted object", async () =>
        await request(app)
            .post("/v1/tasks")
            .set("Accept", "application/json")
            .set("Cookie", [`jwt=${refreshToken}`])
            .set("Authorization", `Bearer ${accessToken}`)
            .send({
                content: "Pass this test",
                assignedAt: date
            })
            .expect("Content-Type", /json/)
            .expect(201)
            .then((response) => {
                expect(response.body).toHaveProperty("task");
                expect(response.body.task).toHaveProperty("id");
                id = response.body.task.id;
                expect(response.body.task).toHaveProperty("content");
                expect(response.body.task.content).toBe("Pass this test");
                expect(response.body.task).toHaveProperty("isDone");
                expect(response.body.task.isDone).toBe(false);
                expect(response.body.task).toHaveProperty("createdAt");
                expect(response.body.task).toHaveProperty("updatedAt");
                expect(response.body.task).toHaveProperty("assignedAt");
                expect(response.body.task.assignedAt).toBe(date.toISOString());
                expect(response.body).toHaveProperty("message");
                expect(response.body.message).toBe(`task ${id} was created successfully`);
            }));

    // get a single task
    test("GET /:id => responds with a single task", async () =>
        await request(app)
            .get(`/v1/tasks/${id}`)
            .set("Accept", "application/json")
            .set("Cookie", [`jwt=${refreshToken}`])
            .set("Authorization", `Bearer ${accessToken}`)
            .expect(200)
            .then((response) => {
                expect(response.body).toHaveProperty("task");
                expect(response.body.task).toHaveProperty("id");
                expect(response.body.task.id).toBe(id);
                expect(response.body.task).toHaveProperty("content");
                expect(response.body.task.content).toBe("Pass this test");
                expect(response.body.task).toHaveProperty("isDone");
                expect(response.body.task.isDone).toBe(false);
                expect(response.body.task).toHaveProperty("createdAt");
                expect(response.body.task).toHaveProperty("updatedAt");
                expect(response.body.task).toHaveProperty("assignedAt");
                expect(response.body).toHaveProperty("message");
                expect(response.body.message).toBe(`task ${id} was found`);
            }));
    test("GET /:id => responds with an task ID not found error", (done) => {
        request(app)
            .get("/v1/tasks/30")
            .set("Accept", "application/json")
            .set("Cookie", [`jwt=${refreshToken}`])
            .set("Authorization", `Bearer ${accessToken}`)
            .expect(404, done);
    });
    test("GET /:id => responds with an invalid task ID error", (done) => {
        request(app)
            .get("/v1/tasks/a")
            .set("Accept", "application/json")
            .set("Cookie", [`jwt=${refreshToken}`])
            .set("Authorization", `Bearer ${accessToken}`)
            .expect(404, done);
    });

    // update tasks
    test("PUT /:id => responds with an invalid task ID error", (done) => {
        request(app)
            .put("/v1/tasks/adsfa")
            .set("Accept", "application/json")
            .set("Cookie", [`jwt=${refreshToken}`])
            .set("Authorization", `Bearer ${accessToken}`)
            .expect(404, done);
    });
    test("PUT /:id => responds with unauthorized status", (done) => {
        request(app)
            .put("/v1/tasks/30")
            .set("Accept", "application/json")
            .set("Cookie", [`jwt=${refreshToken}`])
            .set("Authorization", `Bearer ${accessToken}`)
            .send({
                content: "This is a test",
                isDone: true
            })
            .expect(403, done);
    });
    test("PUT /:id => responds with a single task", async () =>
        await request(app)
            .put(`/v1/tasks/${id}`)
            .set("Accept", "application/json")
            .set("Cookie", [`jwt=${refreshToken}`])
            .set("Authorization", `Bearer ${accessToken}`)
            .send({
                isDone: true
            })
            .expect(200)
            .then((response) => {
                expect(response.body).toHaveProperty("task");
                expect(response.body.task).toHaveProperty("id");
                expect(response.body.task.id).toBe(id);
                expect(response.body.task).toHaveProperty("content");
                expect(response.body.task.content).toBe("Pass this test");
                expect(response.body.task).toHaveProperty("isDone");
                expect(response.body.task.isDone).toBe(true);
                expect(response.body.task).toHaveProperty("createdAt");
                expect(response.body.task).toHaveProperty("updatedAt");
                expect(response.body.task).toHaveProperty("assignedAt");
                expect(response.body).toHaveProperty("message");
                expect(response.body.message).toBe(`task ${id} was updated successfully`);
            }));
    test("PUT /:id => responds with a single task", async () =>
        await request(app)
            .put(`/v1/tasks/${id}`)
            .set("Accept", "application/json")
            .set("Cookie", [`jwt=${refreshToken}`])
            .set("Authorization", `Bearer ${accessToken}`)
            .send({
                content: "This is the new content"
            })
            .expect(200)
            .then((response) => {
                expect(response.body).toHaveProperty("task");
                expect(response.body.task).toHaveProperty("id");
                expect(response.body.task.id).toBe(id);
                expect(response.body.task).toHaveProperty("content");
                expect(response.body.task.content).toBe("This is the new content");
                expect(response.body.task).toHaveProperty("isDone");
                expect(response.body.task.isDone).toBe(true);
                expect(response.body.task).toHaveProperty("createdAt");
                expect(response.body.task).toHaveProperty("updatedAt");
                expect(response.body.task).toHaveProperty("assignedAt");
                expect(response.body).toHaveProperty("message");
                expect(response.body.message).toBe(`task ${id} was updated successfully`);
            }));
    test("PUT /:id => responds with a single task", async () =>
        await request(app)
            .put(`/v1/tasks/${id}`)
            .set("Accept", "application/json")
            .set("Cookie", [`jwt=${refreshToken}`])
            .set("Authorization", `Bearer ${accessToken}`)
            .send({
                content: "This is the new content 2",
                isDone: false
            })
            .expect(200)
            .then((response) => {
                expect(response.body).toHaveProperty("task");
                expect(response.body.task).toHaveProperty("id");
                expect(response.body.task.id).toBe(id);
                expect(response.body.task).toHaveProperty("content");
                expect(response.body.task.content).toBe("This is the new content 2");
                expect(response.body.task).toHaveProperty("isDone");
                expect(response.body.task.isDone).toBe(false);
                expect(response.body.task).toHaveProperty("createdAt");
                expect(response.body.task).toHaveProperty("updatedAt");
                expect(response.body.task).toHaveProperty("assignedAt");
                expect(response.body).toHaveProperty("message");
                expect(response.body.message).toBe(`task ${id} was updated successfully`);
            }));

    // delete tasks
    test("DELETE /:id => responds with an invalid task ID error", (done) => {
        request(app)
            .delete("/v1/tasks/adsfa")
            .set("Accept", "application/json")
            .set("Cookie", [`jwt=${refreshToken}`])
            .set("Authorization", `Bearer ${accessToken}`)
            .expect(404, done);
    });
    test("DELETE /:id => responds with unauthorized status", (done) => {
        request(app)
            .delete("/v1/tasks/30")
            .set("Accept", "application/json")
            .set("Cookie", [`jwt=${refreshToken}`])
            .set("Authorization", `Bearer ${accessToken}`)
            .expect(403, done);
    });
    test("DELETE /:id => responds with a 204 status (successful delete)", (done) => {
        request(app)
            .delete(`/v1/tasks/${id}`)
            .set("Cookie", [`jwt=${refreshToken}`])
            .set("Authorization", `Bearer ${accessToken}`)
            .expect(204, done);
    });

    // try to fetch task after has been deleted
    test("GET /:id => responds with a not found error", (done) => {
        request(app)
            .get(`/v1/tasks/${id}`)
            .set("Accept", "application/json")
            .set("Cookie", [`jwt=${refreshToken}`])
            .set("Authorization", `Bearer ${accessToken}`)
            .expect(404, done);
    });
});
