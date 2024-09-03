const router = require('express').Router();
const { blogUser, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');


// get request to homepage
router.get('/', async (req, res) => {
 

    try {
      // Get all projects and JOIN with user data
      const postData = await Post.findAll({
        include: [
          {
            model: blogUser,
            attributes: ['username'],
          },
          {
            model: Comment,
            include: [
              {model: blogUser,
                attributes: ['username']
              }
            ],
            attributes: ['content', 'user_id', 'date_created']
          }
        ],        
      });    

      const posts = postData.map((post) => post.get({ plain: true }));

      res.render('homepage', { posts, logged_in: req.session.logged_in })     
     
    } catch (err) {
      res.status(500).json(err);
    }
  });


router.get('/signup', (req, res) => {
  res.render('signup')
})

//get requst to login page

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.get('/dashboard', withAuth, async (req, res) => {
  
  try {
    const userData = await blogUser.findByPk(req.session.user_id, {
      include: [{ model: Post }],
      attributes: { exclude: ['password'] },
    }); 

    const user = userData.dataValues

    const userPosts = user.posts.map((post) => post.get({ plain: true }));
    console.log(userPosts)
  
    res.render('dashboard', {user, userPosts, logged_in: req.session.logged_in})
    
  } catch (err) {
  res.status(500).json(err);
  }
})


module.exports = router;

