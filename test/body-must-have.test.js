const expect = require('chai').expect;

const {bodyMustHave} = require('../index');

describe('bodyMustHave(properties) checks whether req.body has properties', ()=>{
    
    it('returns a function', ()=>{
        const middleware = bodyMustHave(['username','password']);
        expect(middleware).to.be.a('function');
    });

    it('sets status 400 if there is no req.body', (done)=>{
        const middleware = bodyMustHave(['username','password']);
        const req={};
        const res={status: (n)=>{
            expect(n).to.equal(400);
            done();
        }};
        const next=()=>{};
        middleware(req, res, next);
    });

    it('sends an error message if there is no req.body and some properties were required', (done)=>{
        const middleware = bodyMustHave(['username','password']);
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

    it('sends an error message if there is no req.body and no properties were required', (done)=>{
        const middleware = bodyMustHave();
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

    it('executes next() if req.body has the required properties', (done)=>{
        const middleware = bodyMustHave(['username','password']);
        const req={body:{username: "", password: ""}};
        const res={};
        const next=done;
        middleware(req, res, next);
    });

    
    it('executes next() if req.body exists and no properties are required', (done)=>{
        const middleware = bodyMustHave();
        const req={body:{}};
        const res={};
        const next=done;
        middleware(req, res, next);
    });

    it('sets status 400 if there is a missing req.body property', (done)=>{
        const middleware = bodyMustHave(['username', 'password']);
        const req={body: {username: ''}};
        const res={status: (n)=>{
            expect(n).to.equal(400);
            done();
        }};
        const next=()=>{};
        middleware(req, res, next);
    });

    it('sends an error message if there is a missing req.body property', (done)=>{
        const middleware = bodyMustHave(['username', 'password']);
        const req={body: {username: ''}};
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

    it('mentions the name of a missing req.body property', (done)=>{
        const middleware = bodyMustHave(['username', 'password']);
        const req={body: {username: ''}};
        const res={
            status: ()=>{return res;},
            send: (text)=>{
                expect(text).to.be.a('string');
                expect(text.includes('password')).to.be.true;
                done();
            }
        };
        const next=()=>{};
        middleware(req, res, next);
    });

    
        
});
