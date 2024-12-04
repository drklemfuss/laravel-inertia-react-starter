<?php

namespace App\Http\Requests\Resources\Tasks;

use Illuminate\Foundation\Http\FormRequest;

class IndexTaskRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check(); // Any authenticated user can access the task index
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return []; // No validation rules are needed for listing tasks
    }
}
