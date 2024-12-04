<?php

namespace App\Http\Requests\Resources\Tasks;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\Task;

class EditTaskRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $taskId = $this->route('task');
        $task = Task::find($taskId);

        \Log::info('Route Parameter Debug', [
            'route_task_id' => $taskId,
            'found_task_id' => $task ? $task->id : null,
        ]);
        \Log::info('Permission Check', [
            'user_id' => $this->user()->id,
            'task_owner_id' => $task->user_id,
            'has_edit_permission' => $this->user()->hasPermissionTo('edit-task'),
            'is_admin' => $this->user()->hasRole('admin'),
        ]);

        \Log::info('Policy Check', [
            'can_update' => $this->user()->can('update', $task),
        ]);


        return $task && $this->user()->can('update', $task);

    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return []; // No validation rules are needed for the edit page
    }
}
