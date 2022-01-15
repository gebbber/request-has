const expect = require('chai').expect;

const {sessionMustHave} = require('../index');

describe('sessionMustHave(properties) checks whether req.session has properties', ()=>{
    
    it('returns a function', ()=>{
        const middleware = sessionMustHave(['userId','loggedInAt']);
        expect(middleware).to.be.a('function');
    });
    
    it('runs sendStatus(401) if there is no req.session', (done)=>{
        const middleware = sessionMustHave(['userId','loggedInAt']);
        const req={};
        const res={sendStatus: (n)=>{
            expect(n).to.equal(401);
            done();
        }};
        const next=()=>{};
        middleware(req, res, next);
    });
    
    it('runs sendStatus(401) if there is no req.session and some properties were required', (done)=>{
        const middleware = sessionMustHave(['userId','loggedInAt']);
        const req={};
        const res={sendStatus: (n)=>{
            expect(n).to.equal(401);
            done();
        }};
        const next=()=>{};
        middleware(req, res, next);
    });
    
    it('runs sendStatus(401) if there is no req.session and no properties were required', (done)=>{
        const middleware = sessionMustHave();
        const req={};
        const res={sendStatus: (n)=>{
            expect(n).to.equal(401);
            done();
        }};
        const next=()=>{};
        middleware(req, res, next);
    });
    
    it('executes next() if req.session has the required properties', (done)=>{
        const middleware = sessionMustHave(['userId','loggedInAt']);
        const req={session:{userId: "", loggedInAt: ""}};
        const res={};
        const next=done;
        middleware(req, res, next);
    });
    
    
    it('executes next() if req.session exists and no properties are required', (done)=>{
        const middleware = sessionMustHave();
        const req={session:{}};
        const res={};
        const next=done;
        middleware(req, res, next);
    });
    
    it('runs sendStatus(401) if there is a missing req.session property', (done)=>{
        const middleware = sessionMustHave(['userId', 'loggedInAt']);
        const req={session: {userId: ''}};
        const res={sendStatus: (n)=>{
            expect(n).to.equal(401);
            done();
        }};
        const next=()=>{};
        middleware(req, res, next);
    });
    
    
});

describe('sessionMustHave(properties, errCode) responds with a custom error code 999', ()=>{

it('runs sendStatus(999) if there is a missing req.session property', (done)=>{
    const middleware = sessionMustHave(['userId', 'loggedInAt'],999);
    const req={session: {userId: ''}};
    const res={sendStatus: (n)=>{
        expect(n).to.equal(999);
        done();
    }};
    const next=()=>{};
    middleware(req, res, next);
});

it('runs sendStatus(999) if there is no req.session', (done)=>{
    const middleware = sessionMustHave(['userId','loggedInAt'],999);
    const req={};
    const res={sendStatus: (n)=>{
        expect(n).to.equal(999);
        done();
    }};
    const next=()=>{};
    middleware(req, res, next);
});

it('runs sendStatus(999) if there is no req.session and some properties were required', (done)=>{
    const middleware = sessionMustHave(['userId','loggedInAt'],999);
    const req={};
    const res={sendStatus: (n)=>{
        expect(n).to.equal(999);
        done();
    }};
    const next=()=>{};
    middleware(req, res, next);
});

it('runs sendStatus(999) if there is no req.session and no properties were required', (done)=>{
    const middleware = sessionMustHave('', 999);
    const req={};
    const res={sendStatus: (n)=>{
        expect(n).to.equal(999);
        done();
    }};
    const next=()=>{};
    middleware(req, res, next);
});

});