import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

// middleware de autenticação
export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // verifica se existe o token
  if (!authHeader) {
    return res.status(401).json({ erro: 'Token not provided' });
  }

  // separa em variavel o token
  const [, token] = authHeader.split(' ');

  try {
    // decodifica o token
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    // pega o ID do user logado
    req.userId = decoded.id;

    return next();
  } catch (error) {
    return res.status(401).json({ erro: 'Token invalid' });
  }
};
