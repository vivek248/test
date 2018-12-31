const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/users');
const BlogPost = require('../src/blogPost');

describe('',()=>{
  let joe, blogPost;

  beforeEach((done) =>{

   joe = new User({ name: 'Joe'});
   blogPost = new BlogPost({title: 'Welcome to JS', content: 'Thank You'});
   //comment = new Comment({ content: ' Congrats on great post'});

   joe.blogPosts.push(blogPost);
   //blogPost.comments.push(comment);
   //comment.user = joe;

   Promise.all([joe.save(), blogPost.save() ])
   .then(() => done() );
    });

    it('Users clean up dangling blogposts on remove', (done) =>{
    joe.remove()
    .then(() => BlogPost.count() )
    .then((count) => {
      assert(count === 0);
      done();
   });
 });
})
