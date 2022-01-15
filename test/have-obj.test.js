const expect = require('chai').expect;

const {_haveObj: haveObj} = require('../index');

describe('haveObj() tests for an object', ()=>{
    
    it('returns true for an object', ()=>{
        const result = haveObj({});
        expect(result).to.be.true;
    })
    
    it ('returns false for a string', ()=>{
        const result = haveObj('abc');
        expect(result).to.be.false;
    })
    
    it ('returns false for an array', ()=>{
        const result = haveObj([1,2,3]);
        expect(result).to.be.false;
    })
    
    it ('returns false for a number', ()=>{
        const result = haveObj(1);
        expect(result).to.be.false;
    })
    
    it ('returns false for undefined', ()=>{
        const result = haveObj();
        expect(result).to.be.false;
    })
    
    it ('returns false for null', ()=>{
        const result = haveObj();
        expect(result).to.be.false;
    })
    
});