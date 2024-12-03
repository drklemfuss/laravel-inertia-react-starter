<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use Inertia\Inertia;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests; 


class TaskController extends Controller
{
    use AuthorizesRequests; 
    /**
     * Display a listing of the tasks for the authenticated user.
     */
    public function index()
    {
        // Fetch tasks for the authenticated user
        $tasks = Task::where('user_id', auth()->id())->get();

        // Render the tasks index page using Inertia
        return Inertia::render('Tasks/Index', [
            'tasks' => $tasks,
        ]);
    }

    /**
     * Show the form for creating a new task.
     */
    public function create()
    {
        // Render the create task page
        return Inertia::render('Tasks/Create');
    }

    /**
     * Store a newly created task in the database.
     */
    public function store(StoreTaskRequest $request)
    {
        // Use the validated data from the request, including user_id
        Task::create(array_merge($request->validated(), ['user_id' => auth()->id()]));

        // Redirect back to tasks index
        return redirect()->route('tasks.index');
    }

    /**
     * Show the form for editing the specified task.
     */
    public function edit(Task $task)
    {
        // Authorize the user to ensure they can edit this task
        $this->authorize('update', $task);

        // Render the edit task page with the task data
        return Inertia::render('Tasks/Edit', [
            'task' => $task,
        ]);
    }

    /**
     * Update the specified task in the database.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        // Authorize the user to ensure they can update this task
        $this->authorize('update', $task);

        // Update the task data
        $task->update($request->validated());

        // Redirect to the tasks index after updating
        return redirect()->route('tasks.index');
    }

    /**
     * Remove the specified task from the database.
     */
    public function destroy(Task $task)
    {
        // Authorize the user to ensure they can delete this task
        $this->authorize('delete', $task);

        // Delete the task
        $task->delete();

        // Redirect back to the tasks index after deletion
        return redirect()->route('tasks.index');
    }
}

