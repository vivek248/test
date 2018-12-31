const assert = require('assert');
const User = require ('../src/users');

describe('updating the records',() => {

 let joe;

 beforeEach((done) =>{
  joe = new User( {name:'joe'}, {likes: 0} )
  joe.save()
   .then(()=> done());
});

function assertName(operation, done){
 operation
  .then(() => User.find({}))
  .then((users) => {
    assert(users.length === 1);
    assert(users[0].name === 'Alex')
    done();

  });
}

it('instance type set and save ', (done) => {
  joe.set('name', 'Alex');
  assertName (joe.save(), done);
  });

  it('a model instance can update ', (done) => {
    assertName (joe.update({name: 'Alex'}), done);
    });

it('a model class can update', (done)=>{

  assertName(
   User.update({name: 'joe'}, {name:'Alex'}),
  done)

});


it('a model class can update', (done)=>{

  assertName(
   User.findOneAndUpdate({name: 'joe'}, {name:'Alex'}),
  done)
});

it('a model class can update', (done) => {

  assertName(
   User.findByIdAndUpdate(joe._id, {name:'Alex'}),
  done)
 });

it('a model class can increment a postCount', (done) => {
User.update({name : 'joe'}, {$inc :{likes : 1 } })
.then(() => User.findOne({name : 'joe'}))
.then((user) => {
  assert(user.likes === 1)
  done();
   });
 });
});
