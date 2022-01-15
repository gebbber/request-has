const expect = require('chai').expect;

const {_parse: parse} = require('../index');

// Two syntaxes:
// parse(items, obj) -- parses items, returns object
// parse(obj)        -- items=null, returns object

describe('parse() accepts and recognizes a list of items', ()=>{
    
    it('accepts a string item', ()=>{
        const items = parse('abc');
        expect(items).to.be.an('array');
        expect(items[0]).to.equal('abc');
    })
    
    it('accepts an array of items', ()=>{
        const items = parse(['abc','def']);
        expect(items).to.be.an('array');
        expect(items[0]).to.equal('abc');
        expect(items[1]).to.equal('def');
    })
    
    it('parses a space-delimited string of items', ()=>{
        const items = parse('abc def');
        expect(items).to.be.an('array');
        expect(items[0]).to.equal('abc');
        expect(items[1]).to.equal('def');
    })

    it('returns empty array for no items provided', ()=>{
        const items = parse({});
        expect(items).to.be.an('array');
        expect(items.length).to.equal(0);
    })
});