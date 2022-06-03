import { LooseObject } from "./Interfaces";

export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const colorLUT: LooseObject = {
	green: "Groen",
	lightblue: "LichtBlauw",
	darkblue: "DonkerBlauw",
	blue: "Blauw",
	white: "Wit",
	black: "Zwart",
	yellow: "Geel",
	red: "Rood",
	orange: "Oranje",
	darkred: "bordeaux",
};

export const getCookies = () => {
	const arrayb = document.cookie.split(";");
	const cookies: LooseObject = {};
	for (const item of arrayb) {
		const key = item.split("=")[0];
		try {
			const value = JSON.parse(item.replace(`${key}=`, ""));
			cookies[key] = value;
		} catch (err) {
			const value = item.replace(`${key}=`, "");
			cookies[key] = value;
		}
	}
	return cookies;
};
