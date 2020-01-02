import { isBefore, subDays } from 'date-fns';
import { Op } from 'sequelize';

import Checkin from '../models/Checkin';
import Matriculation from '../models/Matriculation';

class ChekinController {
  async store(req, res) {
    const { id } = req.params;

    // student faz checkin somente se estiver matriculado
    const studentExists = await Matriculation.findOne({
      where: { student_id: id },
    });

    // verifica se student existe
    if (!studentExists) {
      return res.status(400).json({ error: 'Student does not exists' });
    }

    // verifica se o plano ainda é valido
    if (isBefore(studentExists.end_date, new Date())) {
      return res.status(400).json({ error: 'Current plan expired' });
    }

    const dayWithSub = subDays(new Date(), 7);

    // verifica se o student já fez checkin mais de 5 vezes nos ultimos 7 dias
    const verifyCheckin = await Checkin.count({
      where: {
        student_id: id,
        created_at: { [Op.between]: [dayWithSub, new Date()] },
      },
    });

    // caso estiver acima de 5 checkins retorna error
    if (verifyCheckin >= 5) {
      return res
        .status(400)
        .json({ error: 'Maximum number of checkins reached' });
    }

    const checkin = await Checkin.create({ student_id: id });

    return res.json(checkin);
  }

  async index(req, res) {
    const { page = 1 } = req.query;
    const { id } = req.params;

    const studentExists = await Matriculation.findOne({
      where: { student_id: id },
    });

    // verifica se student existe
    if (!studentExists) {
      return res.status(400).json({ error: 'Student does not exists' });
    }

    // lista checkin realizados
    const checkins = await Checkin.findAll({
      where: { student_id: id },
      order: [['created_at', 'DESC']],
      limit: 10,
      offset: (page - 1) * 10,
      attributes: ['id', 'created_at'],
    });

    return res.json(checkins);
  }
}

export default new ChekinController();
