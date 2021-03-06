import Sequelize, { Model } from 'sequelize';

class HelpOrder extends Model {
  static init(sequelize) {
    super.init(
      {
        question: Sequelize.TEXT,
        answer: Sequelize.TEXT,
        answer_at: Sequelize.DATE,
      },
      { sequelize }
    );

    return this;
  }

  // associa a chave estrangeira as tabelas de Student
  static associate(models) {
    this.belongsTo(models.Student, { foreignKey: 'student_id', as: 'student' });
  }
}

export default HelpOrder;
