import * as Yup from 'yup';

import Plan from '../models/Plan';

class PlanController {
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number().required(),
      price: Yup.number().required(),
    });

    // verifica se o form esta preenchido
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    // cria plano
    const { title, duration, price } = await Plan.create(req.body);

    return res.json({ title, duration, price });
  }

  async index(req, res) {
    const { page = 1 } = req.query;

    // seleciona todos os planos
    const plans = await Plan.findAll({
      order: ['created_at'],
      attributes: ['id', 'title', 'duration', 'price'],
      limit: 7,
      offset: (page - 1) * 7,
    });

    return res.json(plans);
  }
  
  async show(req, res) {
    const { id } = req.params;

    // lista unico plan pelo id
    const plan = await Plan.findByPk(id, {
      attributes: ['id', 'title', 'duration', 'price'],
    });

    return res.json(plan);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      duration: Yup.number(),
      price: Yup.number(),
    });

    // verifica se o form esta preenchido
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const { id } = req.params;

    const plan = await Plan.findByPk(id);

    // verifica se o plano existe
    if (!plan) {
      return res.status(400).json({ error: 'Plan does not exist' });
    }

    // atualiza plano
    const { title, duration, price } = await plan.update(req.body);

    return res.json({ id, title, duration, price });
  }

  async delete(req, res) {
    const { id } = req.params;

    const plan = await Plan.findByPk(id);

    // verifica se o plano existe
    if (!plan) {
      return res.status(400).json({ error: 'Plan does not exist' });
    }

    // deleta plano
    await plan.destroy();

    return res.json({ message: 'Plan deleted' });
  }
}

export default new PlanController();
