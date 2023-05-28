import crypto from 'crypto';
import render from '../lib/render.js';
import userModel from '../models/users.js';

/* Views */
async function startView(req, res) {
    render("index.html", res);
}

async function loginView(req, res) {
    render("login.html", res);
}

async function signupView(req, res) {
    render("signup.html", res);
}

/* API */

async function login(req, res) {
    const accessToken = req.cookies.accessToken;

    const username = req.body.username;
    const password = req.body.password;

    const accessTokenHash = crypto.createHash("sha256").update(accessToken).digest("hex");
    const passwordHash = crypto.createHash("sha256").update(password).digest("hex");
    const { status, data } = await userModel.login({ username, passwordHash });

    if (status === "OK") {
        await userModel.updateToken({ userId: data, token: accessTokenHash })
        res.redirect("/");
    } else {
        res.end("Fel användarnamn eller lösenord!");
    }

}

async function signup(req, res) {
    const accessToken = req.cookies.accessToken;

    const name = req.body.name;
    const username = req.body.username;
    const password = req.body.password;

    const accessTokenHash = crypto.createHash("sha256").update(accessToken).digest("hex");
    const passwordHash = crypto.createHash("sha256").update(password).digest("hex");
    const { status, data } = await userModel.signup({ name, username, passwordHash });
    
    if (status === "OK") {
        await userModel.updateToken({ userId: data.id, token: accessTokenHash })
        res.redirect("/");
    } else {
        res.end("Fel användarnamn eller lösenord!");
    }
}

async function logout(req, res) {
    const accessToken = req.cookies.accessToken;
    const accessTokenHash = crypto.createHash("sha256").update(accessToken).digest("hex");
    const user = await userModel.get({ token: accessTokenHash });

    await userModel.updateToken({ userId: user.data.id, token: "logged out" });

    res.redirect("/login");
}

export default { startView, loginView, signupView, login, signup, logout }