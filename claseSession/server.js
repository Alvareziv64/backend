import express from 'express'
import session from 'express-session'
import MongoStore from 'connect-mongo'
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://admin:mongopassword123@cluster0.xooqlno.mongodb.net/?retryWrites=true&w=majority",
        mongoOptions: advancedOptions
    }),
    secret: 'mySecret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 40000
    }
}))

app.get('/', (req, res) => {
    if (req.session.user && req.session.user.name) {
        res.send(`Welcome ${req.session.user.name}`)
    } else {
        res.send('Please login')
    }
})

app.get('/login/:name', (req, res) => {
    req.session.user = { name: req.params.name }
    res.send(`Login successful, welcome ${req.session.user.name}`)
}
)


app.get('/logout', (req, res) => {
    req.session.destroy()
    res.redirect('/')
})


const PORT = 8080
app.listen(PORT, () => {
    console.log(`Servidor express escuchando en el puerto ${PORT}`)
})


/*app.post('/login', (req, res) => {
    req.session.user = req.body 
    res.send(`You are logged in, welcome ${req.body.name}`)
})
*/