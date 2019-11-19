import { ILoadActions, ILoad } from "./Context";
import LOADS_RESPONSE from "./api/shipments.json";

export function useLoadActions(): ILoadActions {
	const fetchLoads = () =>
		new Promise<ILoad[]>((res) => {
			setTimeout(() => res(LOADS_RESPONSE.shipments), 800);
		});

	return { fetchLoads };
}
