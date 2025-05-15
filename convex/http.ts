import { httpRouter } from "convex/server";
import { Webhook } from "svix";
import { api } from "./_generated/api";
import { httpAction } from "./_generated/server";

const http = httpRouter();

http.route({
	path: "/clerk-webhook",
	method: "POST",
	handler: httpAction(async (ctx, req) => {
		const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

		if (!webhookSecret) {
			throw new Error("CLERK_WEBHOOK_SECRET is not set");
		}

		const svix_id = req.headers.get("svix-id");
		const svix_signature = req.headers.get("svix-signature");
		const svix_timestamp = req.headers.get("svix-timestamp");

		if (!svix_id || !svix_signature || !svix_timestamp) {
			return new Response("Missing svix headers", { status: 400 });
		}

		const payload = await req.json();
		const body = JSON.stringify(payload);

		const webhook = new Webhook(webhookSecret);
		let event: any;

		try {
			event = webhook.verify(body, {
				"svix-id": svix_id,
				"svix-signature": svix_signature,
				"svix-timestamp": svix_timestamp,
			}) as any;
		} catch (e) {
			console.error("Error verifying webhook", e);
			return new Response("Error occurred", { status: 400 });
		}

		const eventType = event.type as string;

		if (eventType === "user.created") {
			const { id, email_addresses, first_name, last_name, image_url } = event.data;
			const email = email_addresses[0].email_address;
			const fullname = `${first_name || ""} ${last_name || ""}`.trim();

			try {
				await ctx.runMutation(api.users.createUser, {
					email,
					username: email.split("@")[0],
					fullname,
					image: image_url,
					clerkId: id,
				});
			} catch (error) {
				console.log("Error creating user", error);
				return new Response("Error occurred", { status: 500 });
			}
		}

		return new Response("Success", { status: 200 });
	}),
});

export default http;
