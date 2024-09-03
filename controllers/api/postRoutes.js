const router = require('express').Router();
const { Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {

    try {
      const newPost = await Post.create({
        ...req.body,
      user_id: req.session.user_id,
      }); 

      res.status(200).json(newPost);
    } catch (err) {
      // console.log(err)
      res.status(400).json(err);
    }
});

router.post('/comment', async (req, res) => {


  const content = req.body.content
  const post_id = req.body.post_id
  user_id = req.session.user_id

  if(!user_id) {
    console.log("no user id")
  }

  try {
    const newComment = await Comment.create({ content, post_id, user_id });
    res.status(200).json(newComment);

  }

  catch(err) {
    res.status(400).json(err)
  }
}
)

router.put('/:id', withAuth, async (req, res) => {
  console.log(req.params.id) 
  console.log(req.body)
  try {
      const post = await Post.update(
        {
          title: req.body.title,
          content: req.body.content,
          user_id: req.body.user_id
        },
        {
          where: {
            id: req.params.id
          },
        }
      ); 
      
      if (!post) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
      }

      res.status(200).json(post);
  }
  catch(err) {
    res.status(400).json(err)
  }
})

  router.delete('/:id', withAuth, async (req, res) => {
    console.log(req.params.id)
    try {
      const post = await Post.destroy({
        where: {
          id: req.params.id,
        },
      });
  
      if (!post) {
        res.status(404).json({ message: 'No project found with this id!' });
        return;
      }
  
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;

