import { NextResponse } from "next/server";
import { db } from "../../../lib/schema/db"; // Ensure correct path to db
import { tasks } from "../../../lib/schema/schema"; // Ensure correct path to schema

export async function GET() {
    try {
        const result = await db.select().from(tasks);
        return NextResponse.json(result);
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 });
    }
}
