<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\Task;

class UpdateTaskRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // Check if the authenticated user is the owner of the task.
        $task = Task::find($this->route('task')); // Get the task from the route parameter
        return $task && $task->user_id == auth()->id(); // Ensure the task belongs to the authenticated user
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:255', 
            'completed' => 'nullable|boolean', 
        ];
    }
}

