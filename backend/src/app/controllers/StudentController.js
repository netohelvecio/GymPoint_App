import { Op } from 'sequelize';
import * as Yup from 'yup';

import Student from '../models/Student';

class StudentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number().required(),
      weight: Yup.number().required(),
      height: Yup.number().required(),
    });

    // verifica se o form está preenchido de forma correta
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const studentExists = await Student.findOne({
      where: { email: req.body.email },
    });

    // verifica se o email já esta sendo utilizado
    if (studentExists) {
      return res.status(400).json({ error: 'Email already used' });
    }

    // cria usuario no banco
    const student = await Student.create(req.body);

    return res.json(student);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      age: Yup.number(),
      weight: Yup.number(),
      height: Yup.number(),
    });

    // verifica se o form está preenchido de forma correta
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;

    const student = await Student.findByPk(id);

    // verifica se o student é existente
    if (!student) {
      return res.status(400).json({ error: 'Student does not exist' });
    }

    const { email } = req.body;

    // verifica se o email já esta sendo utilizado
    if (email !== student.email) {
      const emailExists = await Student.findOne({ where: { email } });

      if (emailExists) {
        return res.status(400).json({ error: 'Email already used' });
      }
    }

    // atualiza dados
    const studentUp = await student.update(req.body);

    return res.json(studentUp);
  }

  async index(req, res) {
    const { page = 1, name = '' } = req.query;

    // lista students cadastrados
    const students = await Student.findAll({
      attributes: ['id', 'name', 'email', 'age', 'weight', 'height'],
      limit: 7,
      offset: (page - 1) * 7,
      where: {
        name: { [Op.iLike]: `%${name}%` },
      },
    });

    return res.json(students);
  }

  async show(req, res) {
    const { id } = req.params;

    // lista unico student pelo id
    const student = await Student.findByPk(id, {
      attributes: ['id', 'name', 'email', 'age', 'weight', 'height'],
    });

    return res.json(student);
  }

  async delete(req, res) {
    const { id } = req.params;

    const student = await Student.findByPk(id);

    // verifica se o student é existente
    if (!student) {
      return res.status(400).json({ error: 'Student does not exist' });
    }

    // deleta student
    await student.destroy();

    return res.json({ message: 'Student deleted' });
  }
}

export default new StudentController();
