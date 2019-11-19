import { createContext, Dispatch } from "react";

export enum LoadActionTypes {
	FETCH_LOADS = "FETCH_LOADS",
	CREATE_LOAD_UPDATE = "CREATE_LOAD_UPDATE",
	UPDATE_LOADING = "UPDATE_LOADING"
}

export type TLoadActions =
	| {
			type: LoadActionTypes.UPDATE_LOADING;
			value: boolean;
	  }
	| {
			type: LoadActionTypes.FETCH_LOADS;
			value: ILoad[];
	  }
	| {
			type: LoadActionTypes.CREATE_LOAD_UPDATE;
			value: ILoad[];
	  };

export type TLoadDispatch = Dispatch<TLoadActions>;

export interface ILoad {
	id: string;
	origin: string;
	destination: string;
	date: string;
	value: number;
	equipment: string;
	locked: boolean;
	status: string;
}

export interface IState {
	loads: ILoad[];
	loading: boolean;
}

export interface ILoadActions {
	fetchLoads: () => Promise<ILoad[]>;
}

export interface ILoadContext {
	state: IState;
	dispatch: TLoadDispatch;
}

export const LoadContext = createContext<ILoadContext>({} as ILoadContext);

export const LoadReducer = (state: IState, action: TLoadActions): IState => {
	switch (action.type) {
		case LoadActionTypes.CREATE_LOAD_UPDATE:
			return { ...state, loads: action.value };
		case LoadActionTypes.FETCH_LOADS:
			return { ...state, loads: action.value };
		case LoadActionTypes.UPDATE_LOADING:
			return { ...state, loading: action.value };
		default:
			return state;
	}
};

export const initialState: IState = {
	loads: [],
	loading: false
};
