const expect = require('chai').expect;

const {_have: have} = require('../index');

describe('have() checks whether the object is really an object', ()=>{
    
    it('returns false for no object', ()=>{
        const missing = have(['abc','def']);
        expect(missing).to.be.false;
    })
    
    it('returns false for object as array', ()=>{
        const missing = have(['def'],['def']);
        expect(missing).to.be.false;
    })
    
    it('returns false for object as string', ()=>{
        const missing = have(['def'],'def');
        expect(missing).to.be.false;
    })
    
});

describe('have() checks whether the object has the required properties', ()=>{
    
    it('returns an empty array for an empty object with no required properties', ()=>{
        const missing = have([],{});
        expect(missing).to.be.an('array');
        expect(missing.length).to.be.equal(0);
    })
    
    it('returns an empty array for a populated object with no required properties', ()=>{
        const missing = have([],{abc: 1, def: null});
        expect(missing).to.be.an('array');
        expect(missing.length).to.be.equal(0);
    })
    
    it('returns an empty array when the object has both required properties', ()=>{
        const missing = have(['abc','def'],{abc: 1, def: 1});
        expect(missing).to.be.an('array');
        expect(missing.length).to.be.equal(0);
    });

    it('returns a non-zero-length array when the object is missing a required property', ()=>{
        const missing = have(['abc','def'],{abc: 1});
        expect(missing).to.be.an('array');
        expect(missing.length).to.be.greaterThan(0);
    });

    it('mentions a missing object property', ()=>{
        const missing = have(['abc','def'],{abc: 1});
        expect(missing).to.be.an('array');
        expect(missing.includes('def')).to.be.true;
    });

    it('reports a missing property when the object has the property, but it is set to undefined', ()=>{
        const missing = have(['abc','def'],{abc: 1, def: undefined});
        expect(missing).to.be.an('array');
        expect(missing.includes('def')).to.be.true;
    });

});