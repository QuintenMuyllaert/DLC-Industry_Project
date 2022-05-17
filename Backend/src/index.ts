import express, { Express, Request, Response } from "express";
const app = express();
const port = 80; // default port to listen

// define a route handler for the default home page
app.get("/", (req: Request, res: Response) => {
	res.send("Express + TypeScript Server");
});

// start the Express server
app.listen(port, () => {
	console.log(`server started at http://localhost:${port}`);
});
