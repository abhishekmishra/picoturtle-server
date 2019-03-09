process.env.NODE_ENV = 'test';
const chaiHttp = require('chai-http');
var chai = require('chai');
let { server } = require('../bin/www');

chai.use(chaiHttp);
var expect = chai.expect;
var request = chai.request;
var should = chai.should();

describe('Check server up', () => {
  it('Call turtle/list', function (done) {
    request(server)
      .get('/turtle/list')
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe('Create move and stop', () => {
  it('Create turtle', function (done) {
    request(server)
      .get('/turtle/create')
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        let turtle_name = res.body.name;
        request(server)
          .get('/turtle/' + turtle_name + '/start_state')
          .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            request(server)
              .get('/turtle/' + turtle_name + '/forward?d=100')
              .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                request(server)
                .get('/turtle/' + turtle_name + '/stop')
                .end(function (err, res) {
                  expect(err).to.be.null;
                  expect(res).to.have.status(200);
                  res.body.last.should.equal(1);
                  console.log(res.body);
                  done();
                });
              });
          });
        // done();
      });
  });
});
