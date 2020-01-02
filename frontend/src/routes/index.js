import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';

import Students from '~/pages/Students';
import StudentsRegister from '../pages/Students/StudentsRegister';
import StudentsEdit from '../pages/Students/StudentsEdit';

import Plans from '../pages/Plans';
import PlansRegister from '../pages/Plans/PlansRegister';
import PlansEdit from '../pages/Plans/PlansEdit';

import Matriculations from '../pages/Matriculations';
import MatriculationsRegister from '../pages/Matriculations/MatriculationsRegister';
import MatriculationsEdit from '../pages/Matriculations/MatriculationsEdit';

import Answer from '../pages/Answer';

// CRIAÇÃO DAS ROTAS
export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/student" exact component={Students} isPrivate />
      <Route path="/student/register" component={StudentsRegister} isPrivate />
      <Route path="/student/:id" component={StudentsEdit} isPrivate />

      <Route path="/plan" exact component={Plans} isPrivate />
      <Route path="/plan/register" component={PlansRegister} isPrivate />
      <Route path="/plan/:id" component={PlansEdit} isPrivate />

      <Route path="/matriculation" exact component={Matriculations} isPrivate />
      <Route
        path="/matriculation/register"
        component={MatriculationsRegister}
        isPrivate
      />
      <Route
        path="/matriculation/:id"
        component={MatriculationsEdit}
        isPrivate
      />

      <Route path="/answer" component={Answer} isPrivate />

      <Route path="/" component={() => <h1>ERROR 404</h1>} />
    </Switch>
  );
}
