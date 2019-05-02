var autopsy = require('..');
var expect = require('chai').expect;
var fs = require('fs');

describe('autopsy.identify(fn)', ()=> {

	it('should correctly identify when a function flavours', ()=> {
		expect(autopsy.identify(()=> 1)).to.be.deep.equal('plain');
		expect(autopsy.identify(()=> {})).to.be.deep.equal('plain');
		expect(autopsy.identify(function (){})).to.be.deep.equal('plain');
		expect(autopsy.identify(function namedFunc(){})).to.be.deep.equal('plain');
		expect(autopsy.identify(async ()=> {})).to.be.deep.equal('async');
		expect(autopsy.identify(async ()=> 'one')).to.be.deep.equal('async');
		expect(autopsy.identify(async function (){})).to.be.deep.equal('async');
		expect(autopsy.identify(async function namedFunc(){})).to.be.deep.equal('async');
		expect(autopsy.identify(x => {})).to.be.deep.equal('cb');
		expect(autopsy.identify(x => true)).to.be.deep.equal('cb');
		expect(autopsy.identify(function(x) {})).to.be.deep.equal('cb');
		expect(autopsy.identify(function namedFunc(x) {})).to.be.deep.equal('cb');
		expect(autopsy.identify(async x => {})).to.be.deep.equal('async');
		expect(autopsy.identify(async x => new Date())).to.be.deep.equal('async');
		expect(autopsy.identify(async function (x){})).to.be.deep.equal('async');
		expect(autopsy.identify(async function namedFunc (x){})).to.be.deep.equal('async');
		expect(autopsy.identify((a, b, c) => {})).to.be.deep.equal('cb');
		expect(autopsy.identify((a, b, c) => new Set())).to.be.deep.equal('cb');
		expect(autopsy.identify(function (a, b, c){})).to.be.deep.equal('cb');
		expect(autopsy.identify(function namedFunc	(a, b, c){})).to.be.deep.equal('cb');
		expect(autopsy.identify(async (a, b, c) => {})).to.be.deep.equal('async');
		expect(autopsy.identify(async (a, b, c) => Date.now())).to.be.deep.equal('async');
		expect(autopsy.identify(async function (a, b, c){})).to.be.deep.equal('async');
		expect(autopsy.identify(async function   namedFunc(a, b, c){})).to.be.deep.equal('async');
	});

});

describe('autopsy.hasCallback(fn)', ()=> {

	it('should correctly identify when a function has a callback', ()=> {
		expect(autopsy.hasCallback(()=> 1)).to.be.false;
		expect(autopsy.hasCallback(()=> {})).to.be.false;
		expect(autopsy.hasCallback(function (){})).to.be.false;
		expect(autopsy.hasCallback(function namedFunc(){})).to.be.false;
		expect(autopsy.hasCallback(async ()=> {})).to.be.false;
		expect(autopsy.hasCallback(async ()=> 'one')).to.be.false;
		expect(autopsy.hasCallback(async function (){})).to.be.false;
		expect(autopsy.hasCallback(async function namedFunc(){})).to.be.false;
		expect(autopsy.hasCallback(x => {})).to.be.true;
		expect(autopsy.hasCallback(x => true)).to.be.true;
		expect(autopsy.hasCallback(function(x) {})).to.be.true;
		expect(autopsy.hasCallback(function namedFunc(x) {})).to.be.true;
		expect(autopsy.hasCallback(async x => {})).to.be.false;
		expect(autopsy.hasCallback(async x => new Date())).to.be.false;
		expect(autopsy.hasCallback(async function (x){})).to.be.false;
		expect(autopsy.hasCallback(async function namedFunc (x){})).to.be.false;
		expect(autopsy.hasCallback((a, b, c) => {})).to.be.true;
		expect(autopsy.hasCallback((a, b, c) => new Set())).to.be.true;
		expect(autopsy.hasCallback(function (a, b, c){})).to.be.true;
		expect(autopsy.hasCallback(function namedFunc	(a, b, c){})).to.be.true;
		expect(autopsy.hasCallback(async (a, b, c) => {})).to.be.false;
		expect(autopsy.hasCallback(async (a, b, c) => Date.now())).to.be.false;
		expect(autopsy.hasCallback(async function (a, b, c){})).to.be.false;
		expect(autopsy.hasCallback(async function   namedFunc(a, b, c){})).to.be.false;
	});

	it('should correctly identify when a function has a callback with native functions', ()=> {
		expect(autopsy.hasCallback(console.log)).to.be.false;
		expect(autopsy.hasCallback(fs.stat)).to.be.true;
		expect(autopsy.hasCallback(fs.promises.stat)).to.be.false;
	});

});
