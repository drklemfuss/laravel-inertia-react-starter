<?php

// Tests the relationship between roles and permissions, ensuring they are 
// correctly assigned and enforced across the application.

namespace Tests\Feature\RBAC;

use App\Models\User;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

beforeEach(function () {
    app()->make(\Spatie\Permission\PermissionRegistrar::class)->forgetCachedPermissions();

    // Create roles and permissions for the web guard
    $adminRole = Role::create(['name' => 'admin', 'guard_name' => 'web']);
    $userRole = Role::create(['name' => 'user', 'guard_name' => 'web']);

    $viewPermission = Permission::create(['name' => 'view-any-task', 'guard_name' => 'web']);
    $editPermission = Permission::create(['name' => 'edit-task', 'guard_name' => 'web']);

    // Assign permissions to roles
    $adminRole->givePermissionTo($viewPermission, $editPermission);
    $userRole->givePermissionTo($viewPermission);
});

test('roles are correctly assigned to users', function () {
    $user = User::factory()->create();

    // Assign role
    $user->assignRole('user');
    $this->assertTrue($user->hasRole('user'));
    $this->assertFalse($user->hasRole('admin'));
});

test('permissions are correctly assigned to roles', function () {
    $role = Role::findByName('admin', 'web');
    $this->assertTrue($role->hasPermissionTo('view-any-task', 'web'));
    $this->assertTrue($role->hasPermissionTo('edit-task', 'web'));
});

test('users inherit permissions from roles', function () {
    $user = User::factory()->create();
    $user->assignRole('admin');

    $this->assertTrue($user->hasPermissionTo('view-any-task'));
    $this->assertTrue($user->hasPermissionTo('edit-task'));
});

test('permissions can be directly assigned to users', function () {
    $user = User::factory()->create();

    // Directly assign permission
    $user->givePermissionTo('edit-task');
    $this->assertTrue($user->hasPermissionTo('edit-task'));
    $this->assertFalse($user->hasPermissionTo('view-any-task'));
});

test('role and permission checks work correctly', function () {
    $user = User::factory()->create();
    $user->assignRole('user');

    $this->assertTrue($user->can('view-any-task')); // Role-based permission
    $this->assertFalse($user->can('edit-task'));    // Not assigned
});
