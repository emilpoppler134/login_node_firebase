import crypto from 'crypto';
import Users from '../models/users.js';
import createId from './createId.js';

export default async function auth(req, res, next) {
  const accessToken = req.cookies.accessToken;

  if (typeof accessToken === "undefined") {
    const newAccessToken = createId("token");

    res.cookie('accessToken', newAccessToken, { maxAge: 1000 * 60 * 60 * 24 })
    res.redirect("/login");
    return;
  }

  try {
    const accessTokenHash = crypto.createHash("sha256").update(accessToken).digest("hex");
    const user = await Users.get({ token: accessTokenHash });

    user.status === "OK" ? next() : res.redirect("/login");
  } catch(err) {
    console.error(err);
    res.redirect("/login");
  }
}