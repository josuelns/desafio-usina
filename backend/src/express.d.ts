import { IUsers } from '../src/types/user.type';

declare global {
  namespace Express {
    interface Request {
      user?: IUsers; 
    }
  }
}