const assert = require('assert');
const User = require('../src/users');

describe('Subdocuments', () => {
it('can create a subdocuments', (done) => {
 const joe = new User ({
  name: 'Joe' ,
  posts: [{title: 'PostTitle'}]
});

 joe.save()
  .then( () => User.findOne ({name:'Joe'}))
  .then ((user) =>{
   assert (user.posts[0].title === 'PostTitle')
    done();
    });
 });

it('can add a new post', (done) =>{

const joe = new User ({ name: 'Joe',
posts: []
});
 joe.save()
  .then( () => User.findOne( {name: 'Joe'} ) )
  .then((user) => {
 user.posts.push ({title: 'happy posting'});
  return user.save();
})

.then (() => User.findOne({name: 'Joe'}))
.then((user) => {
assert (user.posts[0].title === 'happy posting')
done();
});
 });

it('cann remove ann existing subdocument', (done) => {

  const joe = new User ({name: 'Joe', posts:[{titel: 'Keep posting'}]});
  joe.save()
   .then(() => User.findOne({ name: 'Joe'}))
   .then((user) => {
    const post = user.posts[0];
    post.remove();
    return user.save();
})
 .then (() => User.findOne({name:'Joe'}))
 .then((user) => {

 assert(user.posts.length === 0);
 done();
    })
   })
 });
