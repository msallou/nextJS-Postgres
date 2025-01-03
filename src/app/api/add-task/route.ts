import { NextRequest, NextResponse } from "next/server"; // Correct import for the App Router
import { db } from "../../../lib/schema/db"; // Ensure this path is correct
import { tasks } from "../../../lib/schema/schema"; // Ensure this path is correct

export async function POST(req: NextRequest) {
    try {
        const { title } = await req.json();

        if (typeof title !== "string" || title.trim() === "") {
            return NextResponse.json({ error: "Task title is required" }, { status: 400 });
        }

        const result = await db.insert(tasks).values({ task: title }).returning();
        return NextResponse.json({ id: result[0].id, title: result[0].task });
    } catch (error) {
        console.error("Error adding task:", error);
        return NextResponse.json({ error: "Failed to add task" }, { status: 500 });
    }
}
