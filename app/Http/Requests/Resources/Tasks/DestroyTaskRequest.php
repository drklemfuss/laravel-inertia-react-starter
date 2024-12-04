<?php

namespace App\Http\Requests\Resources\Tasks;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\Task;

class DestroyTaskRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $task = Task::find($this->route('task'));
        return $task && $this->user()->can('delete', $task);
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return []; // No validation rules are needed for deletion
    }
}
