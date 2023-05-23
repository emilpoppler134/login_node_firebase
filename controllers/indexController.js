import render from '../lib/render.js';

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
    
}

async function signup(req, res) {
    
}

async function logout(req, res) {
    
}

export default { startView, loginView, signupView, login, signup, logout }