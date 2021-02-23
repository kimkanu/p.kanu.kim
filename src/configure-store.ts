import { createStore } from "redux";

export interface RootState {
  loading: { status: boolean; pathname: string | null };
  homeSection: number;
}

const initialState: RootState = {
  loading: { status: false, pathname: location.pathname },
  homeSection: 0,
};

interface FinishLoadingAction {
  type: "FINISH_LOADING";
}
interface SetHomeSectionAction {
  type: "SET_HOME_SECTION";
  section: number;
}
export type RootActionTypes = FinishLoadingAction | SetHomeSectionAction;

export function rootReducer(
  state = initialState,
  action: RootActionTypes
): RootState {
  switch (action.type) {
    case "FINISH_LOADING":
      return {
        ...state,
        loading: { status: true, pathname: null },
      };
    case "SET_HOME_SECTION":
      return {
        ...state,
        homeSection: action.section,
      };
    default:
      return state;
  }
}

export default function configureStore(preloadedState?: RootState): ReturnType<typeof createStore> {
  const store = createStore(rootReducer, preloadedState);

  return store;
}
