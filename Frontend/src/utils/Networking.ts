import { delay } from "./Utils";
export const findLocalIp = async (ipv4Only: boolean = true) => {
	let ips: string[] = await new Promise((resolve, reject) => {
		if (typeof window.RTCPeerConnection == "undefined") {
			return resolve([]);
		}

		let pc = new RTCPeerConnection();
		let ips: string[] = [];

		pc.createDataChannel("");
		pc.createOffer()
			.then((offer) => pc.setLocalDescription(offer))
			.catch((err) => resolve([]));
		pc.onicecandidate = (event) => {
			if (!event || !event.candidate) {
				// All ICE candidates have been sent.
				if (ips.length == 0) {
					return resolve([]);
				}

				return resolve(ips);
			}

			let parts = event.candidate.candidate.split(" ");
			let [base, componentId, protocol, priority, ip, port, , type, ...attr] = parts;

			if (!ips.some((e) => e == ip)) {
				if (!ipv4Only || ip.match(/^[0-9]+.[0-9]+.[0-9]+.[0-9]+$/g)) {
					ips.push(ip);
				}
			}
		};
	});

	try {
		return await ips;
	} catch (err) {
		return [];
	}
};

export const ping = async (uri: string) => {
	try {
		await fetch(uri, { mode: "no-cors" });
		return uri;
	} catch (err) {
		await delay(10000);
		return false;
	}
};

export const findApi = async () => {
	const ips = await findLocalIp();
	if (!ips.length) {
		console.error("Couldn't find local IP, API detection not possible.");
		return false;
	}

	let pings = [];
	for (const ip of ips) {
		const subnet = ip.split(".").slice(0, 3).join(".");
		for (let i = 1; i < 255 - 1; i++) {
			pings.push(ping(`http://${subnet}.${i}:1234`));
		}
	}
	return await Promise.race(pings);
};
