const chaiHttp = require('chai-http');
var chai = require('chai');
let { server } = require('../bin/www');

chai.use(chaiHttp);
var expect = chai.expect;
var request = chai.request;

describe('Check server up', () => {
  it('Call turtle/list', function (done) { // <= Pass in done callback
    request(server)
      .get('/turtle/list')
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();                               // <= Call done to signal callback end
      });
  });
});
