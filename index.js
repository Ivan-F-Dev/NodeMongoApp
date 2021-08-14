//ivan bdfybdfy
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const exphbs = require('express-handlebars')
const todosRoutes = require('./routes/todos')

PORT = process.env.PORT || 3000
const app = express()
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))
app.use(todosRoutes)
app.use((req, res, next) => {
    res.status(404).send('Sorry cant find that!');
})

async function start() {
    try {
        await mongoose.connect('mongodb+srv://ivan:bdfybdfy@cluster0.yujwv.mongodb.net/todos', {
            useNewUrlParser: true,
            useFindAndModify: false
        })
        app.listen (PORT, () => {
            console.log('Server has been started...')
        })
    } catch (e) {
        console.log(e)
    }
}
start()