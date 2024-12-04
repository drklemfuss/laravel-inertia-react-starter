<?php

# NOTE: This request isn't 'needed', in that there's no data requested from the user. 
#       It's included for completeness as an example (in case its neeeded for other 'real' resources)

namespace App\Http\Requests\Resources\Tasks;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\Task;

class CreateTaskRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // Allow any user with permission to create a task
        return $this->user()->can('create', Task::class);
    }

    /**
     * No validation rules required since this request is just for showing the form.
     */
    public function rules(): array
    {
        return [];
    }
}
