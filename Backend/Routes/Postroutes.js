
const express = require('express');
const postRouter = express.Router();
const PostModel = require('../Models/Post.model');
const authMiddleware = require('../Middleware/Authmiddleware');
const { check, validationResult } = require('express-validator');

// Retrieve all posts
postRouter.get('/', async (req, res) => {
    try {
        const posts = await PostModel.find();
        res.status(200).json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Retrieve posts by pagination
// Retrieve posts by pagination
postRouter.get('/paginate', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    try {
        const posts = await PostModel.find()
            .skip((page - 1) * limit)
            .limit(limit);
        res.status(200).json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Retrieve posts by category
postRouter.get('/category', async (req, res) => {
    const category = req.query.category;

    try {
        const posts = await PostModel.find({ category });
        res.status(200).json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Search for posts by title
postRouter.get('/search', async (req, res) => {
    const title = req.query.title;

    try {
        const posts = await PostModel.find({ title });
        res.status(200).json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Create a new post
postRouter.post('/', authMiddleware, [
    // check('title', 'Title is required').notEmpty(),
    // check('content', 'Content is required').notEmpty(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { title, content, media, category } = req.body;

    try {
       
        const newPost = new PostModel({
            title,
            content,
            media,
            category,
            user_id: req.userId
        });

        const post = await newPost.save();

        res.status(201).json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// Edit a post
postRouter.put('/:post_id', authMiddleware, async (req, res) => {
    const { title, content, media, category } = req.body;

    try {
        let post = await PostModel.findById(req.params.post_id);

        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }

        // Check if the user owns the post
        if (post.user_id.toString() !== req.userId) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        // Update post fields
        post.title = title;
        post.content = content;
        post.media = media;
        post.category = category;

        await post.save();
        res.status(204).send();
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Delete a post
postRouter.delete('/:post_id', authMiddleware, async (req, res) => {
    try {
        let post = await PostModel.findById(req.params.post_id);

        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }

        // Check if the user owns the post
        if (post.user_id.toString() !== req.userId) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        await post.remove();
        res.status(202).send();
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Like a post
postRouter.post('/:post_id/like', authMiddleware, async (req, res) => {
    try {
        let post = await PostModel.findById(req.params.post_id);

        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }

        // Check if the post has already been liked by this user
        if (post.likes.includes(req.userId)) {
            return res.status(400).json({ msg: 'Post already liked' });
        }

        post.likes.push(req.userId);
        await post.save();
        res.status(201).send();
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Comment on a post
postRouter.post('/:post_id/comment', authMiddleware, [
    check('text', 'Text is required').notEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { text } = req.body;

    try {
        let post = await PostModel.findById(req.params.post_id);

        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }

        const newComment = {
            text,
            user_id: req.userId 
        };

        post.comments.unshift(newComment);
        await post.save();
        res.status(201).send();
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});



module.exports = {postRouter};

