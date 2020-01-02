// import de bibliotecas
import { Router } from 'express';

// import de controllers
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';
import MatriculationController from './app/controllers/MatriculationController';
import CheckinController from './app/controllers/CheckinController';
import HelpOrderController from './app/controllers/HelpOrderController';
import AnswerController from './app/controllers/AnswerController';
import StudentSessionController from './app/controllers/StudentSessionController';

// import de middleware
import authMiddleware from './app/middlewares/auth';

// criação de rotas
const routes = new Router();

routes.post('/sessions', SessionController.store);

// rotas de alunos
routes.post('/students/:id/checkins', CheckinController.store);
routes.get('/students/:id/checkins', CheckinController.index);

routes.post('/students/:id/help-orders', HelpOrderController.store);
routes.get('/students/:id/help-orders', HelpOrderController.index);

routes.post('/student-session', StudentSessionController.store);

// rotas depois daqui é obragatorio middlewares
routes.use(authMiddleware);

routes.post('/students', StudentController.store);
routes.put('/students/:id', StudentController.update);
routes.get('/students', StudentController.index);
routes.get('/students/:id', StudentController.show);
routes.delete('/students/:id', StudentController.delete);

routes.post('/plans', PlanController.store);
routes.get('/plans', PlanController.index);
routes.get('/plans/:id', PlanController.show);
routes.put('/plans/:id', PlanController.update);
routes.delete('/plans/:id', PlanController.delete);

routes.post('/matriculations', MatriculationController.store);
routes.get('/matriculations', MatriculationController.index);
routes.get('/matriculations/:id', MatriculationController.show);
routes.put('/matriculations/:id', MatriculationController.update);
routes.delete('/matriculations/:id', MatriculationController.delete);

routes.get('/help-orders/answer', AnswerController.index);
routes.post('/help-orders/:id/answer', AnswerController.store);

export default routes;
