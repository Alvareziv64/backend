const webController = {
    root: (req, res) => {
        res.redirect('/home');
    },

    home: (req, res) => {
        res.sendFile("home.html", { root: "./views"});
    },

    about: (req, res) => {
        res.sendFile("about.html", { root: "./views"});
    }
}

module.exports = { webController };