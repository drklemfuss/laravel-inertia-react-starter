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
     */
    public function viewAny(User $user)
    {
        // Admins can view all tasks, regular users can only view their own tasks
        return $user->hasRole('admin') || $user->hasPermissionTo('view-any-task');
    }

    /**
     * Determine if the user can view the task.
     */
    public function view(User $user, Task $task)
    {
        // Admins can update any task
        if ($user->hasRole('admin')) {
            return true;
        }

        // Regular users can only view their own tasks
        return $user->hasPermissionTo('view-task') && $user->id === $task->user_id;
    }

    /**
     * Determine if the user can update the task.
     */
    public function update(User $user, Task $task)
    {
        // Admins can update any task
        if ($user->hasRole('admin')) {
            return true;
        }

        // Regular users can only update their own tasks if they have the "edit-task" permission
        return $user->hasPermissionTo('edit-task') && $task->user_id === $user->id;
    }

    /**
     * Determine if the user can delete the task.
     */
    public function delete(User $user, Task $task)
    {
        // Admins can delete any task
        if ($user->hasRole('admin')) {
            return true;
        }

        // Regular users can only delete their own tasks
        return $user->hasPermissionTo('delete-task') &&  $user->id === $task->user_id;
    }
}


