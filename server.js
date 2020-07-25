const express  = require('express');
const mongoose = require('mongoose');
const Article = require('./model/article_model');
const articleRouter = require('./routes/articles_route');
const methoOverride = require('method-override');
const app = express();

mongoose.connect('mongodb://localhost/markBlog',{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true });

app.set('view engine', 'ejs');


app.use(express.urlencoded({extended: false}));
app.use(methoOverride('_method'));

app.get('/', async (req, res) => {
    const articles = await Article.find().sort({
        createdAt: 'desc'
    });
    res.render('articles/index',{articles:articles});
});

app.use('/articles',articleRouter);

app.listen(5000, () => {
    console.log('App listening on port 5000!');
});