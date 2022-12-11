import axios from "axios";
import Joi from "joi";
import app from "./axiosConfig";

class Auth {
  constructor() {
    this.authenticated = false;
  }
  async login(data, cb) {
    try {
      await app.post("/api/users/login", data);
      this.authenticated = true;
    } catch (e) {
      this.authenticated = false;
      console.log(e.response);
    }
  }
  async logout(cb) {
    try {
      await app.post("/api/users/logout", null);
      cb();
    } catch (e) {
      console.log(e.reponse);
    }
  }
  async isAuthenticated(cb) {
    try {
      const user = await app.get("/api/users/auth/check", {
        withCredentials: true,
      });
      this.authenticated = true;
      return { isAuthed: this.authenticated, user };
    } catch (e) {
      return (this.authenticated = false);
    }
  }
  verifyLoginData(user) {
    const schema = {
      ident: Joi.string()
        .required()
        .min(3)
        .max(150),
      password: Joi.string()
        .required()
        .min(10),
    };
    return Joi.validate(user, schema);
  }
  verifyRegisterData(user) {
    const schema = {
      username: Joi.string()
        .required()
        .min(3)
        .max(150),
      email: Joi.string()
        .required()
        .email()
        .min(3)
        .max(150),
      password: Joi.string()
        .required()
        .min(10),
    };
    return Joi.validate(user, schema);
  }
  async Register(data, cb) {
    try {
      await app.post("/api/users/register", data, {
        withCredentials: true,
      });
      this.authenticated = true;
      cb(data);
    } catch (e) {
      this.authenticated = false;
      console.log(e.response);
    }
  }
}

export default new Auth();
