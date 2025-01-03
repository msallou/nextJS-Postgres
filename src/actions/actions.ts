"use server";

import { db } from "../lib/schema/db";
import { tasks } from "../lib/schema/schema";

export async function addTask(formData: FormData) {
    const taskTitle = formData.get("title");
    
    if (typeof taskTitle !== "string" || taskTitle.trim() === "") {
        throw new Error("Task title is required");
    }

    try {
        // Insert the task into the database
        const result = await db.insert(tasks).values({ task: taskTitle }).returning();
        console.log("Task added:", result);
        return result;
    } catch (error) {
        console.error("Error adding task:", error);
        if (error instanceof Error) {
            console.error("Error message:", error.message);
            console.error("Error stack:", error.stack);
        }
        throw new Error("Failed to add task");
    }
}
