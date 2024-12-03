<?php

// Tests the TaskController for CRUD operations, ensuring task data is properly 
// handled and permissions are enforced for each action.

namespace Tests\Feature\RBAC;

use App\Models\Task;
use App\Models\User;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

beforeEach(function () {
    app()->make(\Spatie\Permission\PermissionRegistrar::class)->forgetCachedPermissions();

    // Create roles and permissions for the web guard
    $userRole = Role::create(['name' => 'user', 'guard_name' => 'web']);
    Role::create(['name' => 'admin', 'guard_name' => 'web']);

    Permission::create(['name' => 'view-any-task', 'guard_name' => 'web']);
    Permission::create(['name' => 'view-task', 'guard_name' => 'web']);
    Permission::create(['name' => 'edit-task', 'guard_name' => 'web']);
    Permission::create(['name' => 'delete-task', 'guard_name' => 'web']);

    // Assign permissions to the user role
    $userRole->givePermissionTo('view-task', 'edit-task', 'delete-task');
});


test('store creates a new task', function () {
    $user = User::factory()->create();
    $user->assignRole('user'); // Assign the 'user' role

    $this->actingAs($user)->post(route('tasks.store'), [
        'name' => 'Test Task',
        'description' => 'Task description',
    ]);

    $this->assertDatabaseHas('tasks', [
        'name' => 'Test Task',
        'description' => 'Task description',
        'user_id' => $user->id,
    ]);
});

test('edit returns the task for authorized user', function () {
    $user = User::factory()->create();
    $user->assignRole('user'); // Assign the 'user' role

    $task = Task::factory()->create(['user_id' => $user->id]);

    $response = $this->actingAs($user)->get(route('tasks.edit', $task));

    $response->assertOk()
        ->assertInertia(fn ($page) =>
            $page->component('Tasks/Edit')
                ->where('task.id', $task->id)
        );
});

test('destroy deletes the task for authorized user', function () {
    $user = User::factory()->create();
    $user->assignRole('user'); // Assign the 'user' role

    $task = Task::factory()->create(['user_id' => $user->id]);

    $response = $this->actingAs($user)->delete(route('tasks.destroy', $task));

    $response->assertRedirect(route('tasks.index'));
    $this->assertDatabaseMissing('tasks', [
        'id' => $task->id,
    ]);
});
