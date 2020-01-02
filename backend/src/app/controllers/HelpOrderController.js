import * as Yup from 'yup';
import { isBefore } from 'date-fns';

import HelpOrder from '../models/HelpOrder';
import Matriculation from '../models/Matriculation';

class HelpOrderController {
  async store(req, res) {
    const schema = Yup.object().shape({
      question: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;
    const { question } = req.body;

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

    // cria pergunta
    const helpOrder = await HelpOrder.create({ student_id: id, question });

    return res.json(helpOrder);
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

    // lista as perguntas feitas pelo estudante
    const helpers = await HelpOrder.findAll({
      where: { student_id: id },
      attributes: ['id', 'question', 'answer', 'answer_at', 'updated_at'],
      order: [['updated_at', 'DESC']],
      limit: 10,
      offset: (page - 1) * 10,
    });

    return res.json(helpers);
  }
}

export default new HelpOrderController();
