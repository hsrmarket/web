/**
 * Created by felix_2 on 04.05.2017.
 */

let request = require('request');

describe("HSRmarket nodejs server spec",function () {

    describe("/GET article with the id 59,", function () {
        it("then the article should have the id 59", function (done) {

            const result = JSON.stringify({
                "id": 59,
                "name": "JUnitElectronic",
                "price": 15,
                "condition": 5,
                "description": "This electronic was created with the JUnit Test",
                "creationDate": "2017-04-21",
                "image": "test.png",
                "type": "electronic",
                "producer": "JUnit",
                "model": "JUnit"
            });

            request("http://duernten.forrer.network:9000/api/articles/59", function (error, response, body) {
                expect(body).toEqual(result);
                done();
            });
        });
    });

    describe("/GET all articles of the user with the id 2", function () {
        it("then there should be 6 articles in the list", function (done) {
            const resultArray = [
                {
                    "id": 3,
                    "name": "Buch \"Betriebssysteme\"",
                    "price": 10000,
                    "condition": 1,
                    "description": "Lehrmittel vom Eduard Glatz",
                    "creationDate": "2017-04-15",
                    "image": "test.jpg",
                    "type": "book",
                    "isbn": "978-3-86490-222-2",
                    "author": "Eduard Glatz",
                    "publisher": "plus"
                },
                {
                    "id": 24,
                    "name": "JUnitBook",
                    "price": 12,
                    "condition": 8,
                    "description": "This book was created with the JUnit Test",
                    "creationDate": "2017-04-21",
                    "image": "test.png",
                    "type": "book",
                    "isbn": "123-456-789",
                    "author": "JUnit",
                    "publisher": "JUnit"
                },
                {
                    "id": 25,
                    "name": "JUnit",
                    "price": 15,
                    "condition": 5,
                    "description": "This book was created with the JUnit Test",
                    "creationDate": "2017-04-21",
                    "image": "test.png",
                    "type": "book",
                    "isbn": "5558-34834-3453-34534",
                    "author": "JUnit",
                    "publisher": "HSR"
                },
                {
                    "id": 26,
                    "name": "JUnitElectronic",
                    "price": 15,
                    "condition": 5,
                    "description": "This electronic was created with the JUnit Test",
                    "creationDate": "2017-04-21",
                    "image": "test.png",
                    "type": "electronic",
                    "producer": "JUnit",
                    "model": "Apple"
                },
                {
                    "id": 27,
                    "name": "JUnitOfficeSupply",
                    "price": 15,
                    "condition": 5,
                    "description": "This office supply was created with the JUnit Test",
                    "creationDate": "2017-04-21",
                    "image": "test.png",
                    "type": "office supply"
                },
                {
                    "id": 28,
                    "name": "JUnitOtherArticle",
                    "price": 15,
                    "condition": 5,
                    "description": "This other Article was created with the JUnit Test",
                    "creationDate": "2017-04-21",
                    "image": "test.png",
                    "type": "other"
                }
            ];

            const result = JSON.stringify(resultArray);

            request("http://duernten.forrer.network:9000/api/user/2/articles", function (error, response, body) {
                expect(body).toEqual(result);
                done();
            });
        });
    });

    describe("/GET information about invalid user,", function () {
        it("then the result should be bad request", function (done) {

            const result = JSON.stringify(
                {
                    "id": 0,
                    "message": "No account with given ID found"
                }
            );

            request('http://duernten.forrer.network:9000/api/accounts/00', function (error, response, body) {
                expect(body).toEqual(result);
                done();
            });
        });
    });

    describe("/GET non-existing articles of invalid user", function () {
       it("then the result should be empty array", function (done) {
           const result = JSON.stringify([]);

           request('http://duernten.forrer.network:9000/api/user/00/articles', function (error, response, body) {
               expect(body).toEqual(result);
               done();
           });
       });
    });

    /*
    describe("/ GET the home page", function () {
        it("returns status code 200", function (done) {
            request.get("http://duernten.forrer.network:3000" ,function (error, response, body) {
                expect(response.statusCode).toBe(200);
            });
        });
    });
    */

    /*
    describe("/ GET my Purchases without login", function () {
        it("the user must be redirected to login page", function (done) {
            request.get("http://duernten.forrer.network:3000" ,function (error, response, body) {
                expect(response.statusCode).toBe(302);
            });
        })
    });
    */

    /*
    describe("/GET the login page", function () {
        it("then the status must be 200", function (done) {
            request.get("http://duernten.forrer.network:3000/user/login" ,function (error, response, body) {
                expect(response.statusCode).toBe(200);
            });
        })
    });
    */


});
