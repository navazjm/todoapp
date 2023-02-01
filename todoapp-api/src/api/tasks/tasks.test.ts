import request from "supertest";

import app from "../../app";

describe("GET /v1/tasks", () => {
    it("responds with an array of tasks", async () =>
        await request(app)
            .get("/v1/tasks")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toHaveProperty("tasks");
                expect(response.body.tasks).toHaveProperty("length");
            }));
});

let id = "";
describe("POST /v1/tasks", () => {
    const date = new Date();
    date.setDate(date.getDate() - 1);

    it("responds with an error if the task is invalid", async () =>
        await request(app)
            .post("/v1/tasks")
            .set("Accept", "application/json")
            .send({
                content: ""
            })
            .expect("Content-Type", /json/)
            .expect(422)
            .then((response) => {
                expect(response.body).toHaveProperty("message");
            }));
    it("responds with an inserted object", async () =>
        await request(app)
            .post("/v1/tasks")
            .set("Accept", "application/json")
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
});

describe("GET /v1/tasks/:id", () => {
    it("responds with a single task", async () =>
        await request(app)
            .get(`/v1/tasks/${id}`)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
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
    it("responds with an task ID not found error", (done) => {
        request(app)
            .get("/v1/tasks/30")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(404, done);
    });
    it("responds with an invalid task ID error", (done) => {
        request(app)
            .get("/v1/tasks/a")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(404, done);
    });
});

describe("PUT /api/v1/todos/:id", () => {
    it("responds with an invalid task ID error", (done) => {
        request(app)
            .put("/v1/tasks/adsfa")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(404, done);
    });
    it("responds with a not found error", (done) => {
        request(app)
            .put("/v1/tasks/30")
            .set("Accept", "application/json")
            .send({
                content: "This is a test",
                isDone: true
            })
            .expect("Content-Type", /json/)
            .expect(404, done);
    });
    it("responds with a single task", async () =>
        await request(app)
            .put(`/v1/tasks/${id}`)
            .set("Accept", "application/json")
            .send({
                isDone: true
            })
            .expect("Content-Type", /json/)
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
    it("responds with a single todo", async () =>
        await request(app)
            .put(`/v1/tasks/${id}`)
            .set("Accept", "application/json")
            .send({
                content: "This is the new content"
            })
            .expect("Content-Type", /json/)
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
    it("responds with a single todo", async () =>
        await request(app)
            .put(`/v1/tasks/${id}`)
            .set("Accept", "application/json")
            .send({
                content: "This is the new content 2",
                isDone: false
            })
            .expect("Content-Type", /json/)
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
});

describe("DELETE /v1/tasks/:id", () => {
    it("responds with an invalid task ID error", (done) => {
        request(app)
            .delete("/v1/tasks/adsfa")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(404, done);
    });
    it("responds with a not found error", (done) => {
        request(app)
            .delete("/v1/tasks/30")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(404, done);
    });
    it("responds with a 204 status code", async () => {
        request(app)
            .delete(`/v1/tasks/${id}`)
            .expect(200)
            .then((response) => {
                expect(response.body).toHaveProperty("message");
                expect(response.body.message).toBe(`task ${id} was deleted successfully`);
            });
    });
    it("responds with a not found error", (done) => {
        request(app).get(`/v1/tasks/${id}`).set("Accept", "application/json").expect(404, done);
    });
});
