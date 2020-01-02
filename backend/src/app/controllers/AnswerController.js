import * as Yup from 'yup';

import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

import AnswerMail from '../jobs/AnswerMail';

import Queue from '../../lib/Queue';

class AnswerController {
  async index(req, res) {
    const { page = 1 } = req.query;

    // lista perguntas não respondidas
    const answers = await HelpOrder.findAll({
      where: { answer: null },
	 include: [
        { model: Student, as: 'student', attributes: ['name'] },
      ],
      limit: 7,
      offset: (page - 1) * 7,
      order: ['created_at'],
    });

    return res.json(answers);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      answer: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;
    const { answer } = req.body;

    // verifica se pergunta existe
    const helpIsExist = await HelpOrder.findByPk(id, {
      include: [
        { model: Student, as: 'student', attributes: ['name', 'email'] },
      ],
    });

    if (!helpIsExist) {
      return res.status(400).json({ error: 'Question does not exist' });
    }

    // atualiza a resposta da pergunta
    await helpIsExist.update({ answer, answer_at: new Date() });

    // envia resposta por email
    await Queue.add(AnswerMail.key, { helpIsExist });

    return res.json(helpIsExist);
  }
}

export default new AnswerController();
