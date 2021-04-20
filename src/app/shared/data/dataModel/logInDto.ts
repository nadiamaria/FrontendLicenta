import { Request } from 'express';
import userDtoLogin from './userDtoLogIn';

interface RequestWithUser extends Request {
  user: userDtoLogin;
}

export default RequestWithUser;
