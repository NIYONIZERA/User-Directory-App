import { createContext, useContext, useReducer, ReactNode } from "react";
import { User } from "../types/User";

type State = {
  localUsers: User[];
};

type Action =
  | { type: "ADD_USER"; payload: User }
  | { type: "CLEAR_USERS" };

const initialState: State = {
  localUsers: [],
};

const UserContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => null });

const userReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_USER":
      return {
        ...state,
        localUsers: [...state.localUsers, action.payload],
      };
    case "CLEAR_USERS":
      return { ...state, localUsers: [] };
    default:
      return state;
  }
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);