import Mail from '../../lib/Mail';

class MatriculationMail {
  // chave de identificacao do job
  get key() {
    return 'MatriculationMail';
  }

  // metodo para envio de email
  async handle({ data }) {
    const {
      studentExists,
      planExists,
      priceTotal,
      starDateFormatted,
      endDateFormatted,
    } = data;

    await Mail.sendMail({
      to: `${studentExists.name} <${studentExists.email}>`,
      subject: 'Confirmação de matricula na academia GymPoint',
      template: 'matriculation',
      context: {
        studentName: studentExists.name,
        planName: planExists.title,
        planPrice: planExists.price,
        priceTotal,
        start_date: starDateFormatted,
        end_date: endDateFormatted,
      },
    });
  }
}

export default new MatriculationMail();
