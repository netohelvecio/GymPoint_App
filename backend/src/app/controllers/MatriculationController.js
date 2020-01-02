import * as Yup from 'yup';
import {
  endOfDay,
  parseISO,
  isBefore,
  addMonths,
  startOfHour,
  format,
} from 'date-fns';
import pt from 'date-fns/locale/pt';

import Matriculation from '../models/Matriculation';
import Plan from '../models/Plan';
import Student from '../models/Student';

import MatriculationMail from '../jobs/MatriculationMail';

import Queue from '../../lib/Queue';

class MatriculationController {
  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { student_id, plan_id, start_date } = req.body;

    const studentExists = await Student.findByPk(student_id);

    // verifica se student existe
    if (!studentExists) {
      return res.status(400).json({ error: 'Student does not exists' });
    }

    const planExists = await Plan.findByPk(plan_id);

    // verifica se plan existe
    if (!planExists) {
      return res.status(400).json({ error: 'Plan does not exists' });
    }

    const dateEnd = endOfDay(parseISO(start_date));

    // verifica se a data já passou
    if (isBefore(dateEnd, new Date())) {
      return res.status(400).json({ error: 'Date has passed' });
    }

    // fim da matricula data
    const dateEndMatriculation = addMonths(
      parseISO(start_date),
      planExists.duration
    );

    // valor total da matricula
    const priceTotal = planExists.price * planExists.duration;

    // data inicial da matricula
    const starDate = startOfHour(parseISO(start_date));

    const matriculation = await Matriculation.create({
      student_id,
      plan_id,
      start_date: starDate,
      end_date: dateEndMatriculation,
      price: priceTotal,
    });

    // formatação de datas
    const starDateFormatted = format(starDate, 'dd/MM/yyyy', { locale: pt });
    const endDateFormatted = format(dateEndMatriculation, 'dd/MM/yyyy', {
      locale: pt,
    });

    // manda dados para fila de email
    await Queue.add(MatriculationMail.key, {
      studentExists,
      planExists,
      priceTotal,
      starDateFormatted,
      endDateFormatted,
    });

    return res.json(matriculation);
  }

  async index(req, res) {
    //const { page = 1 } = req.query;

    // matriculas existentes
    const matriculation = await Matriculation.findAll({
      order: ['start_date'],
      //limit: 8,
      //offset: (page - 1) * 8,
      attributes: ['id', 'start_date', 'end_date', 'price', 'active'],
      include: [
        { model: Student, as: 'student', attributes: ['name', 'email'] },
        { model: Plan, as: 'plan', attributes: ['title', 'duration'] },
      ],
    });

    return res.json(matriculation);
  }
  
  async show(req, res) {
    const { id } = req.params;

    // lista unico student pelo id
    const matriculation = await Matriculation.findByPk(id, {
      attributes: ['id', 'start_date', 'end_date', 'price', 'active'],
      include: [
        { model: Student, as: 'student', attributes: ['id', 'name', 'email'] },
        { model: Plan, as: 'plan', attributes: ['title', 'duration', 'id', 'price'] },
      ],
    });

    return res.json(matriculation);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      plan_id: Yup.number(),
      start_date: Yup.date().when('plan_id', (plan_id, field) =>
        plan_id ? field.required() : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { start_date, plan_id } = req.body;

    const matriculation = await Matriculation.findByPk(req.params.id);

    // verifica se matricula existe
    if (!matriculation) {
      return res.status(400).json({ error: 'Matriculation does not exists' });
    }

    const planExists = await Plan.findByPk(plan_id);

    // verifica se plan existe
    if (!planExists) {
      return res.status(400).json({ error: 'Plan does not exists' });
    }

    const dateEnd = endOfDay(parseISO(start_date));

    // verifica se a data já passou
    if (isBefore(dateEnd, new Date())) {
      return res.status(400).json({ error: 'Date has passed' });
    }

    // fim da matricula data
    const dateEndMatriculation = addMonths(
      parseISO(start_date),
      planExists.duration
    );

    // valor total da matricula
    const priceTotal = planExists.price * planExists.duration;

    const matriculationUp = await matriculation.update({
      plan_id,
      start_date: startOfHour(parseISO(start_date)),
      end_date: dateEndMatriculation,
      price: priceTotal,
    });

    return res.json(matriculationUp);
  }

  async delete(req, res) {
    const matriculation = await Matriculation.findByPk(req.params.id);

    // verifica se o plano existe
    if (!matriculation) {
      return res.status(400).json({ error: 'Matriculation does not exist' });
    }

    // deleta plano
    await matriculation.destroy();

    return res.json({ message: 'Matriculation deleted' });
  }
}

export default new MatriculationController();
