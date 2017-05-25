import * as mutations from '../src/js/app/store/mutations'
let assert = require('assert');


describe('mutations', () => {
  it(mutations.ADD_ERROR, function() {
    var state = {
      errors: {}
    };

    mutations.default[mutations.ADD_ERROR](state, { type: 'test', message: 'this is a test' });
    assert.deepEqual(state.errors, { test: [ 'this is a test' ] });
  });

  it(mutations.ADD_ERROR + ' multiple', function() {
    var state = {
      errors: {}
    };

    mutations.default[mutations.ADD_ERROR](state, { type: 'test', message: 'this is a test' });
    mutations.default[mutations.ADD_ERROR](state, { type: 'test', message: 'this is another test' });
    mutations.default[mutations.ADD_ERROR](state, { type: 'bar', message: 'foo bar' });
    assert.deepEqual(state.errors, { bar: [ 'foo bar' ], test: [ 'this is a test', 'this is another test' ] });
  })
});