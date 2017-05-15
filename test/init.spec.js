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
                "image": "",
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


});
