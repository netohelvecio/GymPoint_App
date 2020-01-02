import Sequelize, { Model } from 'sequelize';
import bcryptjs from 'bcryptjs';

// criação de model de User
class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password_hash: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  // criptografa senha com bcryptjs
  checkPassword(password) {
    return bcryptjs.compare(password, this.password_hash);
  }
}

export default User;
