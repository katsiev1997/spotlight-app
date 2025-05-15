import { v } from "convex/values";
import { mutation } from "./_generated/server";

// Create a new task with the given text
export const createUser = mutation({
	args: {
		username: v.string(),
		fullname: v.string(),
		image: v.string(),
		bio: v.optional(v.string()),
		email: v.string(),
		clerkId: v.string(),
	},
	handler: async (ctx, args) => {
		const { username, fullname, image, bio, email, clerkId } = args;

		const existingUser = await ctx.db
			.query("users")
			.withIndex("by_clerk_id", (q) => q.eq("clerkId", clerkId))
			.first();

		if (existingUser) return;

		await ctx.db.insert("users", {
			username,
			fullname,
			image,
			bio,
			email,
			clerkId,
			posts: 0,
			followers: 0,
			following: 0,
		});
	},
});
