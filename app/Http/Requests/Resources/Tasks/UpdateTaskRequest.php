<?php

namespace App\Http\Requests\Resources\Tasks;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\Task;
use App\Enums\TaskPriority;
use App\Enums\TaskTag;
use App\Enums\TaskStatus;

class UpdateTaskRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $task = Task::find($this->route('task'));
        return $task && auth()->user()->can('update', $task);
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
            'status' => [
                'required',
                'string',
                \Illuminate\Validation\Rule::enum(TaskStatus::class),
            ],
            'priority' => [
                'nullable',
                'string',
                \Illuminate\Validation\Rule::enum(TaskPriority::class),
            ],
            'tags' => [
                'nullable',
                'array',
            ],
            'tags.*' => [
                \Illuminate\Validation\Rule::enum(TaskTag::class),
            ],
            'due_date' => 'nullable|date',
            'estimated_hours' => 'nullable|numeric|min:0',
            'actual_hours' => 'nullable|numeric|min:0',
            'progress' => 'nullable|integer|between:0,100',
            'effort_score' => 'nullable|integer|min:0',
            'urgency_score' => 'nullable|integer|min:0',
        ];
    }
}


