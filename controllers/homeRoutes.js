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

    let followerCheckData

    if(req.session.user_id) {
      followerCheckData = await userFollows.findOne({
        where: {
          follower_id: req.session.user_id,
          followed_id: profileUserId
        }
      })   
    } 
    
    // const profileUserFollowerData = await userFollows.findbyPk(profileUserId, {
    //   // where: {
    //   //   followed_id: profileUserId
    //   // },
    //   include: [
    //     // {
    //     //   model: blogUser,  // Include the followers of this user
    //     //   through: userFollows, // Get 'id' and 'username' of followers
    //     //   as: 'followers',  // Alias for followers (defined in your association)          
    //     //   attributes: ['id', 'username'],         
    //     // }
    //     {
    //       model: blogUser,
    //       attributes: ['id', 'username']
    //     }
    //   ],
    // })

    const profileUserFollowerData = await userFollows.findAll({
      where: {
        followed_id: profileUserId
      },
      include: [
        {
          model: blogUser,
          through: userFollows,
          as: 'following',
          // attributes: ['id', 'username']
        }
      ]
    })

    // console.log(profileUserFollowerData)    

    //const profileUserFollowers = profileUserFollowerData.map((follower) => follower.get({ plain: true }));

    const followed = followerCheckData ? followerCheckData.get({plain: true}) : null;  
    
    const profileUser = profileUserData ? profileUserData.get({ plain: true }) : null; 
    
    const profileUserPosts = postData.map((post) => post.get({ plain: true }));
   
    res.render('profile', {profileUser, user: req.session.user_id, followed, profileUserPosts })
  }
  catch (err) {
    res.status(500).json(err);
  }
})


module.exports = router;

