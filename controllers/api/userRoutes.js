const router = require('express').Router();
const { blogUser, userFollows } = require('../../models');
// const bcrypt = require('bcryptjs');

//post request that handles signup button login page and found in public/login.js.  request to /api/users
router.post('/', async (req, res) => {

  try {
    // Check if the username already exists in the database
    const existingUser = await blogUser.findOne({ where: { username: req.body.username } });

    if (existingUser) {
      // If the username already exists, send a response with an error message
      return res.status(400).json({ message: 'Username already exists. Please choose a different one.' });
    }

    const userData = await blogUser.create(req.body)

    req.session.save(() => {
      //the data coming back out of the server will have a user id. set it equal to req.session.user_id)
      req.session.user_id = userData.id;
      req.session.logged_in = true;

    //does the response have the req.session attached? No, appears to be only the 3 data fields
      res.status(200).json(userData)
    })

  } catch (err) {
    res.status(400).json(err)
  }
});


router.post('/login', async (req, res) => {
  try {
    const userData = await blogUser.findOne({ where: { username: req.body.username }})
    
    if(!userData) {
      res.status(600).json({ message: "No user data found" });
      console.log("no user DATA!!!!")
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      console.log("no valid password")
      res
        .status(400)
        .json({ message: 'Incorrect password for Username, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id
      req.session.logged_in = true;

      res.status(200).json(userData.username);
    });
    
  }
  catch (err) {
    res.status(400).json(err)
  } 

});


// YOU HAVE THIS CODE TWICE. THIS ONE GOES TO USERS/LOGOUT. THERE IS ANOTHER ON THE HOMEROUTES

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.post('/follow/:userId', async (req, res) => {

  const followedUserId = req.params.userId
  const userId = req.session.user_id

  try {
    const existingFollow = await userFollows.findOne({
      where: {
        follower_id: userId,
        followed_id: followedUserId
      }
    });

    if (existingFollow) {
      return res.status(400).json({ error: 'You are already following this user.' });
    }


    const response = await userFollows.create({follower_id: userId, followed_id: followedUserId})
    res.status(200).json(response)
  
  } catch (err) {
    console.log(err)
  }
})


module.exports = router;









