'use strict';

var expect = require('chai').expect,
    rewire = require('rewire'),
    path = require('path');

var lookup = require('../index');

describe('without filename', function() {
    it('can look the caller of current file', function() {
        var caller = lookup();
        expect(caller).to.equal(__filename);
    });
});

describe('with filename', function() {
    var info = require('./support/lib/info'),
        app = require('./support/lib/app');

    it('can lookup info caller, if call info.js directly', function() {
        expect(info().caller).to.equal(__filename);
    });

    it('can lookup app caller via info.js', function() {
        /* app().caller is computed by info.js */
        expect(app().caller).to.equal(__filename);
    });

    describe('inside instance file', function() {
        var instanceFile = path.resolve(__dirname, './support/instance.js');

        afterEach(function() {
            delete require.cache[instanceFile];
        });

        it('can get caller from app instance file', function() {
            var instance = require('./support/instance');
            expect(instance.caller).to.equal( instanceFile );

            var dipatch = require('./support/bin/dispatch');
            expect(dipatch.caller).to.equal( instanceFile );
        });

        it('can get caller from app dispatch file', function() {
            var dipatch = require('./support/bin/dispatch');
            expect(dipatch.caller).to.equal( instanceFile );
        });
    });
});

describe('target file generator', function() {
    var getTargetFile = rewire('../index').__get__('getTargetFile');

    it('should return self name, if no provide any arg', function() {
        expect( getTargetFile() ).to.equal( require.resolve('../index') );
    });

    it('should return directly, if arg is a path', function() {
        expect( getTargetFile( __filename) ).to.equal( __filename );
    });

    it('can resolve path', function() {
        var result = getTargetFile( __dirname, 'index.js');
        expect( result ).to.equal( path.resolve(__dirname, 'index.js') );
    });

    it('will add js extname if no extname', function() {
        var result = getTargetFile( __dirname, 'index');
        expect( result ).to.equal( path.resolve(__dirname, 'index.js') );
    });

    it('will add index.js, if path is endswith "/"', function() {
        var result = getTargetFile( __dirname + '/' );
        expect( result ).to.equal( path.resolve(__dirname, 'index.js') );
    });
});
