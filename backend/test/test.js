//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai'); // http://chaijs.com/api/bdd/ & https://gist.github.com/yoavniran/1e3b0162e1545055429e
let chaiHttp = require('chai-http');
let app = require('../server');

let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('API', () => {

    beforeEach((done) => { //Before each test we empty the database

        done();
    });

    /*
     * Test the /GET route
     */
    describe('/planes/', () => {
        it('it should GET all the planes', (done) => {
            chai.request(app.server)
                .get('/planes')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    //res.body.length.should.be.eql(0);
                    done();
                });
        });
    });

    describe('/users', () => {
        it('it should POST a new user to database only if name not taken', (done) => {
            chai.request(app.server)
                .put('/planes/59c93f0f6fbae4b938fe84d4/seats/59c93f0f6fbae4b938fe83e4')
                .send({
                    user: {
                        id: "testid",
                        name: "testname", balance: 10000},
                    seat: {
                        reserved: true
                    }
                })
                .end((err, res) => {
                    res.should.have.status(200);
                });
        });

    });

});