import { GetUserQuery } from "../../graphql/API";

export class User {
  id: string;
  hubToken: string;
  username: string;
  constructor(user: GetUserQuery["getUser"]) {
    this.id = user!.id;
    this.hubToken = user!.hubToken || "";
    this.username = user!.username;
  }
  // logout = async () => {
  //   // use auth
  // };
}
