import crypto from "crypto";

export default class Users {
  constructor() {
    this.users = [];
  }

  addUser(session, name) {
    if (this.getUser(name)) {
      //  console.log("User already exists");
      return false;
    }
    const hasId = this.createHash(name);
    const user = { session, hasId, name };
    this.users.push(user);
    return user;
  }

  getUser(id) {
    let Hash = this.createHash(id);
    return this.users.find((user) => user.hasId === Hash);
  }

  removeUserSession(session) {
    let user = this.users.find((user) => user.session === session);
    if (user) {
      this.users = this.users.filter((user) => user.session !== session);
    }
  }

  createHash(name) {
    const secret = "cristianoRonaldoDosSantosAveiro";
    const hash = crypto.createHash("sha256", secret).update(name).digest("hex");
    return hash;
  }

  getUsers() {
    return this.users.map((user) => user.name);
  }

  countUsers() {
    return this.users.length;
  }
}
