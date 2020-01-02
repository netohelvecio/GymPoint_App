import Sequelize from 'sequelize';

// import de models
import User from '../app/models/User';
import Student from '../app/models/Student';
import Plan from '../app/models/Plan';
import Matriculation from '../app/models/Matriculation';
import Checkin from '../app/models/Checkin';
import HelpOrder from '../app/models/HelpOrder';

// import de config do banco de dados
import databaseConfig from '../config/database';

const models = [User, Student, Plan, Matriculation, Checkin, HelpOrder]; // models add no array

class Database {
  constructor() {
    this.init();
  }

  init() {
    // inicia conexao com o banco
    this.connection = new Sequelize(databaseConfig);

    // faz a conexao dos models com o banco e faz a associação das tabelas
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
