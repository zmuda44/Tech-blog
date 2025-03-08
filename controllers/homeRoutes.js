const router = require('express').Router();
const { blogUser, Post, Comment, userFollows } = require('../models');
const withAuth = require('../utils/auth');


// get request to homepage
router.get('/', async (req, res) => { 

    try {
      // Get all projects and JOIN with user data
      const postData = await Post.findAll({
        include: [
          {
            model: blogUser,
            attributes: ['id', 'username'],
          },
          {
            model: Comment,
            include: [
              {model: blogUser,
                attributes: ['id', 'username']
              }
            ],
            attributes: ['content', 'user_id', 'date_created']
          }
        ],        
      });   
      
      const userData = await blogUser.findByPk(req.session.user_id)

      if(!userData) {
        console.log("no user")
      }
    
      const posts = postData.map((post) => post.get({ plain: true }));
      const user = userData ? userData.get({ plain: true }) : null;

      res.render('homepage', { posts, logged_in: req.session.logged_in, user })     
     
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
  
    res.render('dashboard', {user, userPosts, logged_in: req.session.logged_in})
    
  } catch (err) {
  res.status(500).json(err);
  }
})

router.get('/profile/:userId', async (req, res) => {
  const profileUserId = req.params.userId
  // const userId = req.sessions.user_id

  try {
    const profileUserData = await blogUser.findByPk(profileUserId)

    const postData = await Post.findAll({
      where: {
        user_id: profileUserId 
      },
      include: [
        {
          model: Comment,
          include: [
            {model: blogUser,
              attributes: ['id', 'username']
            }
          ],
          attributes: ['content', 'user_id', 'date_created']
        }
      ],        
    }); 

    let followerData

    if(req.session.user_id) {
      followerData = await userFollows.findOne({
        where: {
          follower_id: req.session.user_id,
          followed_id: profileUserId
        }
      })   
    }   

    console.log(followerData)
    
    const followed = followerData ? followerData.get({plain: true}) : null;
    console.log(followed)
    
    const profileUser = profileUserData ? profileUserData.get({ plain: true }) : null; 
    
    const profileUserPosts = postData.map((post) => post.get({ plain: true }));
   
    res.render('profile', {profileUser, user: req.session.user_id, profileUserPosts})
  }
  catch (err) {
    res.status(500).json(err);
  }
})


module.exports = router;

