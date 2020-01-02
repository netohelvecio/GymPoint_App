import Mail from '../../lib/Mail';

class AnswerMail {
  // chave de identificação do job
  get key() {
    return 'AnswerMail';
  }

  // metodo para envio de email
  async handle({ data }) {
    const { helpIsExist } = data;

    await Mail.sendMail({
      to: `${helpIsExist.student.name} <${helpIsExist.student.email}>`,
      subject: 'Nova resposta para dúvida - GymPoint',
      template: 'answer',
      context: {
        studentName: helpIsExist.student.name,
        question: helpIsExist.question,
        answer: helpIsExist.answer,
      },
    });
  }
}

export default new AnswerMail();
