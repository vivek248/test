const assert = require('assert');
const User = require('../src/users');

describe('Validating Records', () => {


  it(' requires a user name ', () => {
const user = new User({name: undefined});
const validationResult = user.validateSync();
const { message } = validationResult.errors.name;
assert(message === 'Name is required.')
});

it(' requires a user name longer than 2 chracters.  ', () => {
const user = new User({name: 'Al'});
const validationResult = user.validateSync();
const { message } = validationResult.errors .name;
assert(message === 'Name must be longer than 2 characters.')
  });

  it(' disallow invalid users to save ', (done) => {
  const user = new User({name: 'Al'});
  user.save()
    .catch((validationResult) => {
     const { message } = validationResult.errors .name;
      assert(message === 'Name must be longer than 2 characters.')
      done();

    });
  });
});
