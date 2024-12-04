<?php

namespace App\Http\Requests\Resources\Tasks;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use App\Enums\TaskPriority;
use App\Enums\TaskStatus;
use App\Enums\TaskTag;

class StoreTaskRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // Allow any authenticated user to create a task.
        return auth()->check();
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
                'nullable',
                'string',
                Rule::enum(TaskStatus::class),
            ],
            'priority' => [
                'nullable',
                'string',
                Rule::enum(TaskPriority::class),
            ],
            'tags' => [
                'nullable',
                'array',
            ],
            'tags.*' => [
                Rule::enum(TaskTag::class),
            ],
            'due_date' => 'nullable|date',
            'estimated_hours' => 'nullable|numeric|min:0',
            'actual_hours' => 'nullable|numeric|min:0',
            'progress' => 'nullable|integer|between:0,100',
            'effort_score' => 'nullable|integer|min:0',
            'urgency_score' => 'nullable|integer|min:0',
        ];
    }

    /**
     * Transform the validated data to the required format for the controller.
     */
    public function validated($key = null, $default = null): array
    {
        $validated = parent::validated($key, $default);

        // Convert `tags` to JSON if it is set and is an array
        if (isset($validated['tags']) && is_array($validated['tags'])) {
            $validated['tags'] = json_encode($validated['tags']);
        }

        return $validated;
    }

}


