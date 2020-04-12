const express = require('express')
const router = express.Router()
const Post = require('../models/post')


// Gettings all songs 
router.get('/', async (req, res) => {
   try {
       const posts = await Post.find()
       res.json(posts)
   } catch (err)  {
       res.status(500).json({message: err.message})
   }
})


// Get One Song
router.get('/:id', getPost, (req, res) => {
    res.json(res.post)
})


// Create One 
router.post('/', async (req, res) => {
    const post = new Post({
        name : req.body.name,
        songUrl : req.body.songUrl,
    })

    try {
        const newPost = await post.save()
        res.status(201).json(newPost)
    } catch (error) {
        res.status(400).json({message : error.message})        
    }
})

// Update One 
router.patch('/:id', getPost, async (req, res) => {
    if (req.body.name != null) {
        res.post.name = req.body.name
    }

    if (req.body.songUrl != null) {
        res.post.songUrl = req.post.songUrl
    }

    try {
        const updatePost = await res.post.save()
        res.json(updatePost)
    } catch (error) {
        res.status(400).json({message : error.message})
    }
})

// Delete One
router.delete('/:id', getPost, async (req, res) => {
    try {
        await res.post.remove()
        res.json({message: 'Deleted Post'})
    } catch (error) {
        res.status(500).json({message : error.message})
    }
})

async function getPost(req,res,next) {
    let post

    try {
        post = await Post.findById(req.params.id)

        if (post == null) {
            return res.status(404).json({message: 'Cannot find post'})
        }

    } catch (error) {
        return res.status(500).json({message: error.message})
    }

    res.post = post
    next()
}



module.exports = router
