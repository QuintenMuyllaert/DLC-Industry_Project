import { LooseObject } from "./Interfaces";

export let globalState: any;
export let globalSetState: any;

export const defaultState: LooseObject = {
	color: "dark",
	scoreHome: 0,
	scoreOut: 0,
	nameHome: "THUIS",
	nameOut: "UIT",
	colorsHomeTop: "red",
	colorsHomeBottom: "blue",
	colorsOutTop: "yellow",
	colorsOutBottom: "green",
	clock: 0,
	first: true,
	messagePopup: false,
	teamColorTeam1Popup: false,
	teamColorTeam2Popup: false,
};

export const attachUseState = (state: any, setState: any) => {
	globalState = state;
	globalSetState = setState;
};

export const setGlobalState = (val: any) => {
	globalSetState(val);
};

export const getGlobalState = () => {
	return globalState;
};

export const updateGlobalState = (key: string, value: any) => {
	globalState[key] = value;
	globalSetState({ ...globalState }); // React voodoo magic
	//console.log(key, value);
};

export const mergeGlobalState = (state: any) => {
	globalState = { ...globalState, ...state };
	globalSetState({ ...globalState }); // React voodoo magic
};

export default {
	attachUseState,
	setGlobalState,
	getGlobalState,
	updateGlobalState,
	mergeGlobalState,
	defaultState,
};
