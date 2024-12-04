<?php

namespace App\Policies;

use App\Models\Task;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class TaskPolicy
{
    use HandlesAuthorization;

    /**
     * Determine if the user can view any task.
     * Admins can view all tasks, regular users can only view their own tasks.
     */
    public function viewAny(User $user)
    {
        return $user->hasRole('admin') || $user->hasPermissionTo('view-any-task');
    }

    /**
     * Determine if the user can view the task.
     */
    public function view(User $user, Task $task)
    {
        return $user->hasRole('admin') || ($user->hasPermissionTo('view-task') && $user->id === $task->user_id);
    }

    /**
     * Determine if the user can update the task.
     */
    public function update(User $user, Task $task)
    {
        \Log::info('Policy Update Check', [
            'user_id' => $user->id,
            'task_owner_id' => $task->user_id,
            'has_edit_permission' => $user->hasPermissionTo('edit-task'),
            'is_admin' => $user->hasRole('admin'),
        ]);

        return $user->hasRole('admin') || ($user->hasPermissionTo('edit-task') && $user->id === $task->user_id);
    }

    /**
     * Determine if the user can delete the task.
     */
    public function delete(User $user, Task $task)
    {
        return $user->hasRole('admin') || ($user->hasPermissionTo('delete-task') && $user->id === $task->user_id);
    }

    /**
     * Determine if the user can create a task.
     * Any authenticated user can create a task.
     */
    public function create(User $user)
    {
        return $user->hasRole('admin') || $user->hasPermissionTo('create-task');
    }
}



