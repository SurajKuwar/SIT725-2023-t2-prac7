let expect = require('chai').expect;
let request = require('request');
let url = 'http://localhost:3000/api/cats';
let cat = {
    title:'title_Dog1',
    link:'images/Dog3.jpeg',
    path:'title-Dogs',
    description:'Dogs list are added'
}

describe('test get all cats', function() {
    it('return status code of 200', function(done){
        request(url, function(error,response,body){
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    it('return status code of 404', function(done){
        request('http://localhost:3000/api/cats1', function(error,response,body){
            expect(response.statusCode).to.equal(404);
            done();
        });
    });

    it('return succesful message', function(done){
        request(url, function(error,response,body){
            body = JSON.parse(body);
            expect(body.message).to.contain('Success');
            done();
        });
    });

    it('returns an array', function(done){
        request(url, function(error,response,body){
            body = JSON.parse(body);
            expect(body.data).to.be.a('array');
            done();
        });
    });
});

describe('test post a cat', function() {
    it('insert a cat to database and statuscode 200', function(done){
        request.post({url:url, form:cat}, function(error,response,body){
            body = JSON.parse(body);
            expect(response.statusCode).to.equal(200);
            expect(body.message).to.contain('added');
            done();
        });
    });

    it('Test the post cat json response', function(done){
        request.post({url:url, form:cat}, function(error,response,body){
            body = JSON.parse(body);
            expect(body.data.acknowledged).to.equal(true);
            expect(body.message).to.equal("Dogs Successfully added");
            done();
        });
    });
});

describe('delete a cat', function(){
    it('delete a cat from database', function(done){
        request.delete({url:url, form: cat}, function(error,response,body){
            body = JSON.parse(body);
            expect(body.message).to.contain('removed');
            done();
        });
    });
});