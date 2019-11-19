import React, { useReducer, useEffect, useCallback } from "react";
import "./App.css";
import {
	LoadContext,
	LoadReducer,
	initialState,
	LoadActionTypes
} from "./Context";
import { useLoadActions } from "./Actions";
import LoadBoard from "./components/LoadBoard";

const App: React.FC = () => {
	const [state, dispatch] = useReducer(LoadReducer, initialState);
	const { fetchLoads } = useLoadActions();

	const fetch = useCallback(async () => {
		dispatch({
			type: LoadActionTypes.UPDATE_LOADING,
			value: true
		});
		const loads = await fetchLoads();
		dispatch({
			type: LoadActionTypes.UPDATE_LOADING,
			value: false
		});
		dispatch({
			type: LoadActionTypes.FETCH_LOADS,
			value: loads
		});
	}, [fetchLoads]);

	useEffect(() => {
		fetch();

		// eslint-disable-next-line
	}, []);

	return (
		<LoadContext.Provider value={{ state, dispatch }}>
			<LoadBoard />
		</LoadContext.Provider>
	);
};

export default App;
