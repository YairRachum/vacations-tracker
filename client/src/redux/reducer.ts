import { ActionType } from "./ActionType";
import { Action } from "./Action";
import { AppState } from "./AppState";

// This function is NOT called direcrtly by you
export function Reduce(oldAppState: AppState = new AppState(), action: Action): AppState {
  // Cloning the oldState (creating a copy)
  const newAppState = { ...oldAppState };
  
  switch (action.type) {
    case ActionType.AddAllVacations:
        let vacations = action.payload;
        newAppState.vacations = vacations;
      break;

    case ActionType.SetUserTypeAndName:
        let user = action.payload;
        newAppState.userType = user.userType
        newAppState.firstName = user.firstName;
      break;
      
      case ActionType.UpdateIsLogin:
        let status = action.payload;
        newAppState.isLoggedIn = status
      break;

    case ActionType.DeleteVacation:
        newAppState.vacations = oldAppState.vacations.filter(vacation => vacation.id !== action.payload);
      break;

      case ActionType.AddVacation:
        let vacation = action.payload;
        newAppState.vacations.push(vacation);
      break;

      case ActionType.SetIsAddModalShown:
        let state = action.payload;
        newAppState.addModalState = state;
      break;

      case ActionType.UpdateVacation:
        let vacationObj = action.payload;
        let index = newAppState.vacations.map(function(x) {return x.id; }).indexOf(vacationObj.id);
        newAppState.vacations.splice(index, 1, vacationObj);
        newAppState.vacations = [...newAppState.vacations];
      break;

      case ActionType.FollowVacation:
        let vacationToFollow = action.payload;
        console.log(vacationToFollow)

        let indexToFollow = newAppState.vacations.map(function(x) {return x.id; }).indexOf(vacationToFollow.id);
        newAppState.vacations[indexToFollow].isFollowed = "TRUE";
        let amountOfFollowers = newAppState.vacations[indexToFollow].amountOfFollowers ;
        newAppState.vacations[indexToFollow].amountOfFollowers = amountOfFollowers+1
        newAppState.vacations = oldAppState.vacations.filter(vacation => vacation.id !== vacationToFollow.id);
        newAppState.vacations.unshift(vacationToFollow);
        newAppState.vacations = [...newAppState.vacations];
      break;

      case ActionType.UnFollowVacation:
        let vacationToUnFollow = action.payload;
        console.log(vacationToUnFollow)
        let indexToUnfollow = newAppState.vacations.map(function(x) {return x.id; }).indexOf(vacationToUnFollow.id);
        newAppState.vacations[indexToUnfollow].isFollowed= "FALSE";
        let amountOfFollowersAfterUnfollow = newAppState.vacations[indexToUnfollow].amountOfFollowers ;
        newAppState.vacations[indexToUnfollow].amountOfFollowers = amountOfFollowersAfterUnfollow-1
        newAppState.vacations = oldAppState.vacations.filter(vacation => vacation.id !== vacationToUnFollow.id);
        newAppState.vacations.push(vacationToUnFollow);
        newAppState.vacations = [...newAppState.vacations];
      break;
      case ActionType.SendNotification:
        newAppState.notification = {message:action.payload.message, type:action.payload.type}
        break;
      
  }
  return newAppState;
}
