var compile = require('../');
var assert = require('assert');

describe('protobuf-jsonschema', function() {
  it('should generate a json schema for a very simple proto3 message', function() {
    var opt = {}
    assert.deepEqual(compile(__dirname + '/simple.proto', opt), require('./simple.json'));
  });

  it('should generate a json schema for all messages', function() {
    var opt = {}
    assert.deepEqual(compile(__dirname + '/test.proto', opt), require('./test.json'));
  });
  
  it('should generate a json schema for a single message', function() {
    var defs = require('./test.json').definitions;
    var opt = {model: 'Parent'}
    assert.deepEqual(compile(__dirname + '/test.proto', opt), {
      definitions: {
        Parent: defs.Parent,
        'Parent.Child': defs['Parent.Child'],
        'test2.Basic': defs['test2.Basic']
      }
    });
  });

  it('should disallow additional properties.', function() {
    var opt = {additionalProperties: false}
    assert.deepEqual(compile(__dirname + '/test.proto', opt),
        require('./test_no_additional_properties.json'));
  });


  it('should handle external definitions', function() {
    var opt = {additionalProperties: false, paths: [__dirname + '/externals']}
    assert.deepEqual(compile(__dirname + '/external_ref.proto', opt),
        require('./external_ref.json'));
  });
});
