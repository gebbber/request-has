const expect = require('chai').expect;

const {ifSessionHas} = require('../index');

describe('ifSessionHas(properties) checks whether req.session has properties', ()=>{
    
    it('returns a function', ()=>{
        const middleware = ifSessionHas(['userId','loggedInAt']);
        expect(middleware).to.be.a('function');
    });

    it('sets status 400 if there is no req.session', (done)=>{
        const middleware = ifSessionHas(['userId','loggedInAt']);
        const req={};
        const res={status: (n)=>{
            expect(n).to.equal(400);
            done();
        }};
        const next=()=>{};
        middleware(req, res, next);
    });

    it('sends an error message if there is no req.session and some properties were required', (done)=>{
        const middleware = ifSessionHas(['userId','loggedInAt']);
        const req={};
        const res={
            status: ()=>{return res;},
            send: (text)=>{
                expect(text).to.be.a('string');
                expect(text.length).to.be.greaterThan(0);
                done();
            }
        };
        const next=()=>{};
        middleware(req, res, next);
    });

    it('sends an error message if there is no req.session and no properties were required', (done)=>{
        const middleware = ifSessionHas();
        const req={};
        const res={
            status: ()=>{return res;},
            send: (text)=>{
                expect(text).to.be.a('string');
                expect(text.length).to.be.greaterThan(0);
                done();
            }
        };
        const next=()=>{};
        middleware(req, res, next);
    });

    it('executes next() if req.session has the required properties', (done)=>{
        const middleware = ifSessionHas(['userId','loggedInAt']);
        const req={session:{userId: "", loggedInAt: ""}};
        const res={};
        const next=done;
        middleware(req, res, next);
    });

    
    it('executes next() if req.session exists and no properties are required', (done)=>{
        const middleware = ifSessionHas();
        const req={session:{}};
        const res={};
        const next=done;
        middleware(req, res, next);
    });

    it('sets status 400 if there is a missing req.session property', (done)=>{
        const middleware = ifSessionHas(['userId', 'loggedInAt']);
        const req={session: {userId: ''}};
        const res={status: (n)=>{
            expect(n).to.equal(400);
            done();
        }};
        const next=()=>{};
        middleware(req, res, next);
    });

    it('sends an error message if there is a missing req.session property', (done)=>{
        const middleware = ifSessionHas(['userId', 'loggedInAt']);
        const req={session: {userId: ''}};
        const res={
            status: ()=>{return res;},
            send: (text)=>{
                expect(text).to.be.a('string');
                expect(text.length).to.be.greaterThan(0);
                done();
            }
        };
        const next=()=>{};
        middleware(req, res, next);
    });

    it('mentions the name of a missing req.session property', (done)=>{
        const middleware = ifSessionHas(['userId', 'loggedInAt']);
        const req={session: {userId: ''}};
        const res={
            status: ()=>{return res;},
            send: (text)=>{
                console.log(text);
                expect(text).to.be.a('string');
                expect(text.includes('loggedInAt')).to.be.true;
                done();
            }
        };
        const next=()=>{};
        middleware(req, res, next);
    });

    
        
});
