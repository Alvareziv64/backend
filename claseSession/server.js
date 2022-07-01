import express from 'express'
import session from 'express-session'
import MongoStore from 'connect-mongo'
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }

const app = express()

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
    res.send('Servidor express ok!')
})

let contador = 0
app.get('/sin-session', (req, res) => {
    res.send({ contador: ++contador })
})

app.get('/con-session', (req, res) => {
    if (req.session.contador) {
        req.session.contador++
        res.send(`Ud ha visitado el sitio ${req.session.contador} veces.`)
    } else {
        req.session.contador = 1
        res.send('Bienvenido!')
    }
})

app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (!err) res.send('Logout ok!')
        else res.send({ status: 'Logout ERROR', body: err })
    })
})


const PORT = 8080
app.listen(PORT, () => {
    console.log(`Servidor express escuchando en el puerto ${PORT}`)
})
