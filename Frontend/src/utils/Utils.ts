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

export const getQuery = () => {
	const query = window.location.search.substring(1);
	const arrayb = query.split("&");
	const querryObject: LooseObject = {};
	for (const item of arrayb) {
		const key = item.split("=")[0];
		const value = item.replace(`${key}=`, "");
		querryObject[key] = value;
	}
	return querryObject;
};

export const xml2json = (xml: string) => {
	const json: LooseObject = {};
	for (const res of xml.matchAll(/(?:<(\w*)(?:\s[^>]*)*>)((?:(?!<\1).)*)(?:<\/\1>)|<(\w*)(?:\s*)*\/>/gm)) {
		const key = res[1] || res[3];
		const value = res[2] && xml2json(res[2]);
		json[key] = (value && Object.keys(value).length ? value : res[2]) || null;
	}
	return json;
};
