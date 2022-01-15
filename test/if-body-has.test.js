const expect = require('chai').expect;

const {ifBodyHas} = require('../index');

describe('ifBodyHas(properties) checks whether req.body has properties', ()=>{
    
    it('returns a function', ()=>{
        const middleware = ifBodyHas(['userId','loggedInAt']);
        expect(middleware).to.be.a('function');
    });

    it('runs next("route") if there is no req.body', (done)=>{
        const middleware = ifBodyHas(['userId','loggedInAt']);
        const req={};
        const res={};
        const next=(a)=>{
            expect(a).to.equal('route');
            done();
        };
        middleware(req, res, next);
    });

    it('runs next("route") if there is no req.body and some properties were required', (done)=>{
        const middleware = ifBodyHas(['userId','loggedInAt']);
        const req={};
        const res={};
        const next=(a)=>{
            expect(a).to.equal('route');
            done();
        };
        middleware(req, res, next);
    });

    it('runs next("route") if there is no req.body and no properties were required', (done)=>{
        const middleware = ifBodyHas();
        const req={};
        const res={};
        const next=(a)=>{
            expect(a).to.equal('route');
            done();
        };
        middleware(req, res, next);
    });

    it('executes next() with no arguments if req.body has the required properties', (done)=>{
        const middleware = ifBodyHas(['userId','loggedInAt']);
        const req={body:{userId: "", loggedInAt: ""}};
        const res={};
        const next=(a)=>{
            expect(a).to.be.undefined;
            done();
        };
        middleware(req, res, next);
    });

    
    it('executes next() with no arguments if req.body exists and no properties are required', (done)=>{
        const middleware = ifBodyHas();
        const req={body:{}};
        const res={};
        const next=(a)=>{
            expect(a).to.be.undefined;
            done();
        };
        middleware(req, res, next);
    });

    it('executes next("route") if there is a missing req.body property', (done)=>{
        const middleware = ifBodyHas(['userId', 'loggedInAt']);
        const req={body: {userId: ''}};
        const res={};
        const next=(a)=>{
            expect(a).to.equal('route');
            done();
        };
        middleware(req, res, next);
    });
  
        
});
