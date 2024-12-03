<?php

// Tests the TaskPolicy to verify that only authorized users can perform specific 
// actions (view, edit, delete) on task resources based on roles and permissions.

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

test('admins can view any task', function () {
    $admin = User::factory()->create();
    $admin->assignRole('admin'); // Assign the admin role

    $task = Task::factory()->create();

    // Admin can view any task
    $this->assertTrue((new \App\Policies\TaskPolicy)->view($admin, $task));
});

test('regular users can view only their tasks', function () {
    $user = User::factory()->create();
    $user->assignRole('user'); // Assign the user role
    $task = Task::factory()->create(['user_id' => $user->id]);

    // User can view their own task
    $this->assertTrue((new \App\Policies\TaskPolicy)->view($user, $task));
});

test('users without permissions cannot update tasks', function () {
    $user = User::factory()->create();
    $task = Task::factory()->create(['user_id' => $user->id]);

    // Remove any roles or permissions that might grant the user the `edit-task` permission
    $user->syncRoles([]); // Remove all roles
    $user->syncPermissions([]); // Remove all permissions

    // User cannot update task without permission
    $this->assertFalse((new \App\Policies\TaskPolicy)->update($user, $task));
});


test('admins can delete any task', function () {
    $admin = User::factory()->create();
    $admin->assignRole('admin'); // Assign the admin role

    $task = Task::factory()->create();

    // Admin can delete any task
    $this->assertTrue((new \App\Policies\TaskPolicy)->delete($admin, $task));
});

test('regular users cannot delete others\' tasks', function () {
    $user = User::factory()->create();
    $user->assignRole('user'); // Assign the user role
    $otherUser = User::factory()->create();
    $task = Task::factory()->create(['user_id' => $otherUser->id]);

    // User cannot delete tasks they do not own
    $this->assertFalse((new \App\Policies\TaskPolicy)->delete($user, $task));
});

test('users can delete their own tasks if they have delete-task permission', function () {
    $user = User::factory()->create();
    $user->assignRole('user'); // Assign the user role
    $task = Task::factory()->create(['user_id' => $user->id]);

    // Ensure the user has delete-task permission
    $this->assertTrue((new \App\Policies\TaskPolicy)->delete($user, $task));
});

