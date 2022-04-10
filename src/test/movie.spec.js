/* eslint-disable indent */
/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');

// Assertion Style
chai.should();

chai.use(chaiHttp);

describe('Movies API', () => {
    /**
     * Test the GET route
     */
    describe('GET /api/movies', (done) => {
        it('It should GET all the Movies', () => {
        chai.request(server)
            .get('/api/movies')
            .end((_err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('array');
            });
        });
        it('It should not GET all the Movies', () => {
            chai.request(server)
                .get('/api/movie')
                .end((_err, response) => {
                    response.should.have.status(404);
                });
            });
    });

    /**
     * Test the GET (by id) route
     */
    describe('GET /api/movies/id', () => {
        it('It should GET a Movie by ID', () => {
            const id = 4;
            chai.request(server)
                .get('/api/movies/' + id)
                .end((_err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    response.body.length.should.be.eq(1);
                });
        });
        it('It should not GET a Movie by ID', () => {
            const id = 4000;
            chai.request(server)
                .get('/api/movies/' + id)
                .end((_err, response) => {
                    response.should.have.status(404);
                    response.body.should.be.a('object');
                    response.body.message.should.be.eq(`No movie found for id ${id}`);
                });
        });
    });

    /**
     * Test the POST route
     */
     describe('POST /api/movies', () => {
        it('It should POST a new movie', () => {
            const movie = {
                title: 'A',
                year: '2023',
                actors: 'Puneeth',
                description: 'New movie'
            }
            chai.request(server)
                .post('/api/movies')
                .send(movie)
                .end((_err, response) => {
                    response.should.have.status(201);
                    response.body.should.be.a('object');
                    response.message.should.be.eq('Successfully added a new movie');
                });
        });
    });

    /**
     * Test the DELETE route
     */
     describe('DELETE /api/movies/:id', () => {
        it('It should DELETE an existing movies', () => {
            const id = 10;
            chai.request(server)
                .delete('/api/movies/' + id)
                .end((_err, response) => {
                    response.should.have.status(200);
                });
        });
    });
});
