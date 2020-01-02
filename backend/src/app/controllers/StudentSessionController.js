import * as Yup from 'yup';

import Student from '../models/Student';

class StudentSessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      id: Yup.string().required(),
    });

    // verifica se o form está preenchido de forma correta
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.body;

    // lista unico student pelo id
    const student = await Student.findByPk(id, {
      attributes: ['id', 'name', 'email'],
    });

    // verifica se o student é existente
    if (!student) {
      return res.status(400).json({ error: 'Student does not exist' });
    }

    return res.json(student);
  }
}

export default new StudentSessionController();
