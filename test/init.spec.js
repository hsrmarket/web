/**
 * Created by felix_2 on 04.05.2017.
 */

let request = require('request');

let base_url = "http://localhost:3000/";

describe("HSRmarket server", function () {
    describe("GET /", function () {
        it("return status code 200",function () {
            request.get(base_url, function (error, response, body) {
                expect(response.statusCode).toBe(200);
            })
        });
    });

    describe("GET /home", function () {
        it("return status code 200",function () {
            request.get(base_url + "home", function (error, response, body) {
                expect(response.statusCode).toBe(200);
            })
        });
    });

    describe("GET /login", function () {
        it("return status code 200",function () {
            request.get(base_url + "login", function (error, response, body) {
                expect(response.statusCode).toBe(200);
            })
        });
    });

    describe("GET /register", function () {
        it("return status code 200",function () {
            request.get(base_url + "register", function (error, response, body) {
                expect(response.statusCode).toBe(200);
            })
        });
    });

    describe("GET /logout", function () {
        it("return status code 301 (redirect)",function () {
            request.get(base_url + "logout", function (error, response, body) {
                expect(response.statusCode).toBe(301);
            })
        });
    });

    describe("GET the article with the id 30 for editing", function () {
        it("then it should return status code 404 and redirect to login page",function () {
            request.get(base_url + "accounts/30/edit", function (error, response, body) {
                expect(response.statusCode).toBe(404);
            })
        });
    });

    describe("DELETE the account with the id 30", function () {
        it("then it should return status code 404 and redirect to login page",function () {
            request.get(base_url + "30/delete", function (error, response, body) {
                expect(response.statusCode).toBe(404);
            })
        });
    });

    describe("POST the account with the id 30", function () {
        it("then it should return status code 200 and redirect to login page",function () {
            request.post(base_url + "/30", function (error, response, body) {
                expect(response.statusCode).toBe(200);
            })
        });
    });

    describe("As normal user accessing the restricted area for administrator should", function () {

        it("return status code 200 and redirect to login page while accessing 'admin/'",function () {
            request.get(base_url + "admin/", function (error, response, body) {
                expect(response.statusCode).toBe(200);
            })
        });

        it("return status code 200 and redirect to login page while accessing 'admin/accounts'",function () {
            request.get(base_url + "admin/accounts", function (error, response, body) {
                expect(response.statusCode).toBe(200);
            })
        });

        it("return status code 200 and redirect to login page while accessing 'admin/articles'",function () {
            request.get(base_url + "admin/articles", function (error, response, body) {
                expect(response.statusCode).toBe(200);
            })
        });
    });

    describe("As a normal user Accessing the article in public area should", function () {

        it("return status code 200 while accessing 'articles/books'",function () {
            request.get(base_url + "articles/books", function (error, response, body) {
                expect(response.statusCode).toBe(200);
            })
        });

        it("return status code 200 while accessing 'articles/electronics'",function () {
            request.get(base_url + "articles/electronics", function (error, response, body) {
                expect(response.statusCode).toBe(200);
            })
        });

        it("return status code 200 while accessing 'articles/officesupplies'",function () {
            request.get(base_url + "articles/officesupplies", function (error, response, body) {
                expect(response.statusCode).toBe(200);
            })
        });

        it("return status code 200 while accessing 'articles/other'",function () {
            request.get(base_url + "articles/other", function (error, response, body) {
                expect(response.statusCode).toBe(200);
            })
        });

        it("return status code 200 while accessing 'articles/recent'",function () {
            request.get(base_url + "articles/recent", function (error, response, body) {
                expect(response.statusCode).toBe(200);
            })
        });

        it("return status code 200 while accessing 'articles/padd'",function () {
            request.get(base_url + "articles/padd", function (error, response, body) {
                expect(response.statusCode).toBe(200);
            })
        });

        it("return status code 200 while accessing 'articles/add'",function () {
            request.get(base_url + "articles/add", function (error, response, body) {
                expect(response.statusCode).toBe(200);
            })
        });

        it("return status code 200 and redirect to login page while accessing 'articles/25/edit'",function () {
            request.get(base_url + "articles/25/edit", function (error, response, body) {
                expect(response.statusCode).toBe(200);
            })
        });
    });

    describe("As a non authenticated user while trying to purchase an article", function () {
        it("then it should return status code 301 and redirect to login page",function () {
            request.post(base_url + "purchases/", function (error, response, body) {
                expect(response.statusCode).toBe(301);
            })
        });
    });

    describe("As a non authenticated user while trying to search for an article", function () {
        it("then it should return status code 200",function () {
            request.post(base_url + "search/", function (error, response, body) {
                expect(response.statusCode).toBe(200);
            })
        });
    });

    describe("As a non authenticated user while trying to access restricted areas which are only form authenticated user", function () {

        it("should return status code 200 and redirect to login page while accessing 'user/'",function () {
            request.post(base_url + "user/", function (error, response, body) {
                expect(response.statusCode).toBe(200);
            })
        });

        it("should return status code 200 and redirect to login page while accessing 'user/articles'",function () {
            request.post(base_url + "user/articles", function (error, response, body) {
                expect(response.statusCode).toBe(200);
            })
        });

        it("should return status code 200 and redirect to login page while accessing 'user/sales'",function () {
            request.post(base_url + "user/sales", function (error, response, body) {
                expect(response.statusCode).toBe(200)
            })
        });

        it("should return status code 200 and redirect to login page while accessing 'user/purchases'",function () {
            request.post(base_url + "user/purchases", function (error, response, body) {
                expect(response.statusCode).toBe(200)
            })
        });

    });
});