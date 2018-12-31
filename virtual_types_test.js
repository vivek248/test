const assert = require('assert');
const User = require('../src/users');

describe('Virtual Types', () => {
it('post count returns number of posts ', (done) =>{
 const joe = new User({
   name: 'Joe',
   posts: [{title: 'Happy posting'}]
 });
joe.save()
 .then( () => User.findOne ({name:'Joe'}))
 .then ((user) => {
  assert (joe.postCount === 1);
   done();
   });
});
});
