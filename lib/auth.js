import crypto from 'crypto';
import Users from '../models/users.js';
import CreateAccessToken from './createAccessToken.js';

export default async function auth(req, res, next) {
  const accessToken = req.cookies.accessToken;

  if (typeof accessToken === "undefined") {
    const newAccessToken = await CreateAccessToken();

    res.cookie('accessToken', newAccessToken, { maxAge: 1000 * 60 * 60 * 24 })
    res.redirect("/login");
    return;
  }

  try {
    const accessTokenHash = crypto.createHash("sha256").update(accessToken).digest("hex");
    const user = await Users.get(accessTokenHash);

    user ? next() : res.redirect("/login");
  } catch(err) {
    console.error(err);
    res.clearCookie("accessToken");
    res.redirect("/login");
  }
}