import { LooseObject } from "./Interfaces";

export let globalState: any;
export let globalSetState: any;

export const defaultState: LooseObject = {
	color: "dark",
	nameHome: "THUIS",
	nameOut: "UIT",
	t1: 0,
	t2: 0,
	hb: "black",
	ho: "black",
	ub: "black",
	uo: "black",
	timer: 0,
	message: "",
	screen: "P0",
	serial: "N/A",
	first: true,
	messagePopup: false,
	teamColorTeam1Popup: false,
	teamColorTeam2Popup: false,
	colors: [],
	scorbordSponsorsToggle: "left",
	sponsors: [],
	templates: [],
	users: [],
	selectedTemplate: "",

	isRemove: false,
};

export const attachUseState = (state: any, setState: any) => {
	globalState = state;
	globalSetState = setState;
};

export const setGlobalState = (val: any) => {
	// console.log("setGlobalState", val);
	globalSetState(val);
};

export const getGlobalState = () => {
	// console.log("getGlobalState", globalState);
	return globalState;
};

export const updateGlobalState = (key: string, value: any) => {
	if (globalState[key] === value) {
		//is same
		return;
	}
	globalState[key] = value;
	setGlobalState({ ...globalState }); // React voodoo magic
	//console.log(key, value);
};

export const mergeGlobalState = (state: any) => {
	const newState = { ...globalState, ...state };
	if (JSON.stringify(globalState) === JSON.stringify(newState)) {
		//is same
		return;
	}
	globalState = newState;
	setGlobalState({ ...globalState }); // React voodoo magic
};

export default {
	attachUseState,
	setGlobalState,
	getGlobalState,
	updateGlobalState,
	mergeGlobalState,
	defaultState,
};
