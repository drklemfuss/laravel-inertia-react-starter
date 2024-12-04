<?php

namespace App\Http\Requests\Resources\Tasks;

use Illuminate\Foundation\Http\FormRequest;

class ShowTaskRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // Check if the user is authorized to view the task
        $task = $this->route('task'); // Task is bound by route model binding
        return $task && $this->user()->can('view', $task);
    }

    /**
     * No validation rules required since this request is just for showing the task.
     */
    public function rules(): array
    {
        return [];
    }
}
