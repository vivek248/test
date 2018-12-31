const assert = require ('assert');
const User = require ('../src/users');

describe ('Reading users out of the datanbase', () => {

  let joe, alex, vivek, rocky;


beforeEach((done) => {
alex = new User({name: 'Alex'});
joe = new User({name: 'joe'});
vivek = new User({name: 'Vivek'});
rocky = new User({name: 'Rocky'});

Promise.all([alex.save(), joe.save(), rocky.save(),  vivek.save() ])
   .then( () => done());
   });

   it(' find all users with a name of joe ', (done) => {

     User.find({ name:'joe' })
      .then((users) => {
        assert(users[0]._id.toString() === joe._id.toString());
        done();
      });
    });

    it(' find a user with a particular id', (done) => {

      User.findOne({ _id: joe._id})
       .then((user) => {
         assert(user.name ==='joe');
         done();
       });
    });

    it('can skip and limit the users ', (done) => {
      User.find({})
      .sort({ name : 1})
      .skip(1)
      .limit(2)
      .then((users) =>{
        assert(users.length === 2);
        assert(users[0].name === 'joe');
        assert(users[1].name === 'Rocky');
        done();
      });
    });
});
