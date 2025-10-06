

async function logoutUser (req, res) {
    req.session.destroy(err => {
        res.clearCookie('connect.sid');
        res.redirect("/");
    });
}

module.exports = logoutUser;