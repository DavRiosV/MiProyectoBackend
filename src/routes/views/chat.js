import { Router } from "express";

const router = Router();

router.get("/", async (req, res, next) => {
	try {
		return res.render("chat", {
			title: "Chat with us!",
            script_chat: 'chat.js'
		});
	} catch (error) {
		next(error);
	}
});

export default router