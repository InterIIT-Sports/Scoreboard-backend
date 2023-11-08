import { Request } from "express";
import { User } from "./User";

export default interface AuthenticatedRequest extends Request {
  user?: User;
}
