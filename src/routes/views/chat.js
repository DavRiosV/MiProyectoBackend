import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
	try {
		return res.render("chat", {
			title: "Chat with us!",
    script: 'chat.js'
		});
	} catch (error) {
		next(error);
	}
});

export default router