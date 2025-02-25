const connection = require("../data/db");

const postsData = require('../data/postsData')

//index
const index = (req, res) => {
    let postsFiltered = postsData;
    const { ingredienti } = req.query;
    if (ingredienti) {
        postsFiltered = postsFiltered.filter((post) =>
            post.ingredienti.includes(ingredienti)
    );
    }
    res.json(postsFiltered);
};

//show
const show = (req, res)  => {
    const post = postsData.find((elm) => elm.id == req.params.id);
    if (!post) {
        return res.status(404).json({
            error: "Post not found",
        });
    }
    res.json(post);
}

//create
const store = (req, res) => {
    console.log(req.body);
    const newPost = {
        id: postsData.length + 1, 
        name: req.body.name,
        image: req.body.image,
        ingredienti: req.body.ingredienti
    };

    postsData.push(newPost);
    
    res.status(201).json(newPost);
};

//update
const update = (req, res) => {
    const post = postsData.find((elm) => elm.id == req.params.id)
    if (!post) {
        return res.status(404).json({
            error: "Post not found",
        });
    }
    post.name = req.body.name;
    post.image = req.body.image;
    post.ingredienti = req.body.ingredienti;

    res.json(post);
}

//delete
const destroy = (req, res) => {
    const post = postsData.find((elm) => elm.id == req.params.id)
    if (!post) {
        return res.status(404).json({
            error: "Post not found",
        });
    }
    postsData.splice(postsData.indexOf(post), 1);
    res.sendStatus(204);
};

module.exports = { index, show, store, update, destroy }