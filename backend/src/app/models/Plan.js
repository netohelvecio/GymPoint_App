import Sequelize, { Model } from 'sequelize';

// cria modelo de plano
class Plan extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        duration: Sequelize.INTEGER,
        price: Sequelize.FLOAT,
      },
      { sequelize }
    );

    return this;
  }
}

export default Plan;
