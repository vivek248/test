const mongoose = require( 'mongoose' );
const assert = require('assert')
const User = require( '../src/users' );
const BlogPost = require( '../src/blogPost' );
const Comment = require( '../src/comment' );

describe( 'Assocations' , () => {
let joe, blogPost, comment;

beforeEach((done) =>{

 joe = new User({ name: 'Joe'});
 blogPost = new BlogPost({title: 'Welcome to JS', content: 'Thank You'});
 comment = new Comment({ content: ' Congrats on great post'});

 joe.blogPosts.push(blogPost);
 blogPost.comments.push(comment);
 comment.user = joe;

 Promise.all([joe.save(), blogPost.save(), comment.save() ])
 .then(() => done() );
  });

  it('save a relation between a user and a blogpost', (done ) => {
   User.findOne({ name: 'Joe' })
    .populate('blogPosts')
    .then((user) => {
    assert(user.blogPosts[0].title === 'Welcome to JS');
      done();
    });
  });
 it(' save a full relation graph', (done) => {
   User.findOne({name:'Joe'})
   .populate({
     path: 'blogPosts',
     populate: {
       path: 'comments',
       model: 'comment',
       populate:{
         path: 'user',
         model: 'user'
       }

       }
       })
    .then((user) => {
      assert(user.name === 'Joe');
    assert(user.blogPosts[0].title === 'Welcome to JS');
    //assert(user.blogPosts[0].comments[0].content === ' Congrats on great post ');
    assert(user.blogPosts[0].comments[0].user.name === 'Joe');


     done();
    });

 });
});
