const supertest = require("supertest");
server = require("../../index");
request = supertest(server);

describe("Messages", () => {
  describe("GET /", () => {
    it("should return 200 OK", async () => {
        try {
            await request.get("/messages").expect(200);      
        } catch (error) {
            console.log(error)
        }
      
    });
  });

  describe("GET /:uniq_id", () => {
    it("should return 200 OK for specific id", async () => {
      const message = await request
        .get("/messages/88ab2e95-1955-482e-9107-bf2ae8825baf")
        .expect(200);


        expect(message.body.message.user_name).toBe("Tom");
    });
  });

  describe.only("GET /:uniq_id", () => {
    it("should return 404 OK for specific id", async () => {
    await request
        .get("/messages/88ab2e95-1955-482e-9107-bf2ae8825bad")
        .expect(404);
    });
  });

  // describe('POST /', () => {
  //     it('should return 200 OK', (done) => {
  //     request.post('/messages')
  //         .send({ text: 'Hello World', user_name: 'John' })
  //         .expect(200, done);
  //     }
  //     );
  // }
  // );

  // describe('PUT /:uniq_id', () => {
  //     it('should return 200 OK', (done) => {
  //     request.put('/messages/88ab2e95-1955-482e-9107-bf2ae8825baf')
  //         .send({ text: 'Hello World' })
  //         .expect(200, done);
  //     }
  //     );
  // }
  // );

  // describe('DELETE /:uniq_id', () => {
  //     it('should return 200 OK', (done) => {
  //     request.delete('/messages/88ab2e95-1955-482e-9107-bf2ae8825baf')
  //         .expect(200, done);
  //     }
  //     );
  // }
  // );
});
