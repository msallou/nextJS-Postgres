"use client";

import { useState, useEffect } from "react";

export default function Home() {
    const [tasks, setTasks] = useState<any[]>([]); // Initialize with an empty array

    // Fetch tasks when the component mounts
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch("/api/get-tasks/");
                const data = await response.json();

                if (response.ok) {
                    setTasks(data);
                } else {
                    console.error("Failed to fetch tasks:", data.error);
                }
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };

        fetchTasks();
    }, []); // Empty dependency array ensures this runs only once when the component mounts

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const taskTitle = formData.get("title");

        if (typeof taskTitle === "string" && taskTitle.trim() !== "") {
            try {
                const response = await fetch("/api/add-task", {
                    method: "POST",
                    body: JSON.stringify({ title: taskTitle }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                const data = await response.json();

                if (response.ok) {
                    // Re-fetch tasks after adding the new one to reflect changes in the UI
                    const fetchTasks = async () => {
                        try {
                            const response = await fetch("/api/get-tasks/");
                            const data = await response.json();
                            if (response.ok) {
                                setTasks(data);
                            } else {
                                console.error("Failed to fetch tasks:", data.error);
                            }
                        } catch (error) {
                            console.error("Error fetching tasks:", error);
                        }
                    };
                    fetchTasks();

                    // Clear the input field after form submission
                    (e.target as HTMLFormElement).reset();
                } else {
                    console.error("Failed to add task:", data.error);
                }
            } catch (error) {
                console.error("Error adding task:", error);
            }
        } else {
            console.error("Task title is required");
        }
    };

    return (
        <main className="bg-zinc-200 flex min-h-screen flex-col items-center pt-10">
            <h1 className="text-3xl font-medium">All Tasks:</h1>

            <ul className="my-10 text-center">
				{tasks.length > 0 ? (
					tasks.map((task, index) => (
						<li key={task.id}>
							{index + 1}. {task.task}  {/* Display index + 1 to number the tasks */}
						</li>
					))
				) : (
					<p>No tasks found.</p>
				)}
			</ul>


            <form onSubmit={handleSubmit} className="space-x-2 h-4">
                <input
                    type="text"
                    name="title"
                    className="px-3 py-1 rounded"
                    placeholder="Enter task title"
                />
                <button type="submit" className="px-3 py-1 bg-blue-500 text-white rounded">
                    Add Task
                </button>
            </form>
        </main>
    );
}
