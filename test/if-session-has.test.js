const expect = require('chai').expect;

const {ifSessionHas} = require('../index');

describe('ifSessionHas(properties) checks whether req.session has properties', ()=>{
    
    it('returns a function', ()=>{
        const middleware = ifSessionHas(['userId','loggedInAt']);
        expect(middleware).to.be.a('function');
    });

    it('runs next("route") if there is no req.session', (done)=>{
        const middleware = ifSessionHas(['userId','loggedInAt']);
        const req={};
        const res={};
        const next=(a)=>{
            expect(a).to.equal('route');
            done();
        };
        middleware(req, res, next);
    });

    it('runs next("route") if there is no req.session and some properties were required', (done)=>{
        const middleware = ifSessionHas(['userId','loggedInAt']);
        const req={};
        const res={};
        const next=(a)=>{
            expect(a).to.equal('route');
            done();
        };
        middleware(req, res, next);
    });

    it('runs next("route") if there is no req.session and no properties were required', (done)=>{
        const middleware = ifSessionHas();
        const req={};
        const res={};
        const next=(a)=>{
            expect(a).to.equal('route');
            done();
        };
        middleware(req, res, next);
    });

    it('executes next() with no arguments if req.session has the required properties', (done)=>{
        const middleware = ifSessionHas(['userId','loggedInAt']);
        const req={session:{userId: "", loggedInAt: ""}};
        const res={};
        const next=(a)=>{
            expect(a).to.be.undefined;
            done();
        };
        middleware(req, res, next);
    });

    
    it('executes next() with no arguments if req.session exists and no properties are required', (done)=>{
        const middleware = ifSessionHas();
        const req={session:{}};
        const res={};
        const next=(a)=>{
            expect(a).to.be.undefined;
            done();
        };
        middleware(req, res, next);
    });

    it('executes next("route") if there is a missing req.session property', (done)=>{
        const middleware = ifSessionHas(['userId', 'loggedInAt']);
        const req={session: {userId: ''}};
        const res={};
        const next=(a)=>{
            expect(a).to.equal('route');
            done();
        };
        middleware(req, res, next);
    });
  
        
});
