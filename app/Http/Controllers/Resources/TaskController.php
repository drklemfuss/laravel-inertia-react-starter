<?php

namespace App\Http\Controllers\Resources;

use App\Models\Task;
use App\Enums\TaskStatus;
use App\Enums\TaskPriority;
use App\Enums\TaskTag;
use App\Http\Controllers\Controller;
use App\Http\Requests\Resources\Tasks\IndexTaskRequest;
use App\Http\Requests\Resources\Tasks\EditTaskRequest;
use App\Http\Requests\Resources\Tasks\DestroyTaskRequest;
use App\Http\Requests\Resources\Tasks\StoreTaskRequest;
use App\Http\Requests\Resources\Tasks\UpdateTaskRequest;
use App\Http\Requests\Resources\Tasks\CreateTaskRequest;
use App\Http\Requests\Resources\Tasks\ShowTaskRequest;
use Inertia\Inertia;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests; 


class TaskController extends Controller
{
    use AuthorizesRequests; 

    private function getEnums(): array
    {
        return [
            'statuses' => TaskStatus::cases(),
            'priorities' => TaskPriority::cases(),
            'tags' => TaskTag::cases(),
        ];
    }
    /**
     * Display a listing of the tasks for the authenticated user.
     */
    public function index(IndexTaskRequest $request)
    {
        $tasks = Task::where('user_id', auth()->id())->paginate(10);

        return Inertia::render('Tasks/Index', [
            'tasks' => $tasks,
            'enums' => $this->getEnums(),
        ]);
    }

    /**
     * Show the form for creating a new task.
     */
    public function create(CreateTaskRequest $request)
    {
        // Render the create task page
        return Inertia::render('Tasks/Create', [
            'enums' => $this->getEnums(),
        ]);
    }


    /**
     * Store a newly created task in the database.
     */
    public function store(StoreTaskRequest $request)
    {
        Task::create(array_merge($request->validated(), ['user_id' => auth()->id()]));
        return redirect()->route('tasks.index')->with('success', 'Task created successfully!');
    }

    /**
     * Show the form for editing the specified task.
     */
    public function edit( Task $task)
    {
        return Inertia::render('Tasks/Edit', [
            'task' => $task,
            'enums' => $this->getEnums(),
        ]);
    }

    /**
     * Update the specified task in the database.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        $task->update($request->validated());
        return redirect()->route('tasks.index')->with('success', 'Task updated successfully!');
    }

    /**
     * Remove the specified task from the database.
     */
    public function destroy(DestroyTaskRequest $request, Task $task)
    {
        $task->delete();

        return redirect()->route('tasks.index')->with('message', 'Task deleted successfully.');
    }

    /**
     * Show the details of a specific task.
     */
    public function show(ShowTaskRequest $request, Task $task)
    {
        return Inertia::render('Tasks/Show', [
            'task' => $task,
        ]);
    }


}



