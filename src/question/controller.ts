import { Router } from 'express-serve-static-core';
import { Question } from './question';
import { MongoRouteBuilder } from '../mongo/controller';

export class QuestionController {
  public createRouter(): Router {
    let builder: MongoRouteBuilder<Question> = new MongoRouteBuilder<Question>('question')
    return builder.all().router();
  }
}
