// User class

export default class User {
    constructor(id, mail, password, discriminator) {
        this.id = id;
        this.mail = mail;
        this.password = password;
        this.discriminator = discriminator;
    }
}
