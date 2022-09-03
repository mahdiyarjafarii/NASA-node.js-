const request=require("supertest");
const app=require("../../app")
describe("Test Get/launches",()=>{
    test("It should response is 200",async()=>{
     const response=  await request(app).get("/launches").expect(200);
        // expect(response.statusCode).toBe(200)
    })
});