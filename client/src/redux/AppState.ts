import { IVacation } from "../interfaces/IVacation";

export class AppState{
  public vacations: IVacation[] = [];
  public firstName: string = "";
  public userType : string = "";
  public isLoggedIn: boolean = false;
  public followedVacations: number[] = [];
  public addModalState: boolean = false;
  public notification = {
    message: '',
    type: 'success'
  }
}
