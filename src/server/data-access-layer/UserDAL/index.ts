import { deleteUserAction } from "./delete-user";
import { getUserDataAction } from "./get-user-data";
import { upsertUserAction } from "./upsert-user";

export const UserDAL = {
  upsertUser: upsertUserAction,
  deleteUser: deleteUserAction,
  getUserData: getUserDataAction
};
