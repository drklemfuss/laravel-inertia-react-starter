<?php

// Tests access control for the Filament admin panel, ensuring only authorized 
// users, such as admins, can access the panel.

namespace Tests\Feature\RBAC;

use App\Models\User;
use Spatie\Permission\Models\Role;

beforeEach(function () {
    app()->make(\Spatie\Permission\PermissionRegistrar::class)->forgetCachedPermissions();

    // Create roles
    Role::create(['name' => 'admin', 'guard_name' => 'web']);
    Role::create(['name' => 'user', 'guard_name' => 'web']);
});

test('admins can access the filament admin panel', function () {
    $admin = User::factory()->create();
    $admin->assignRole('admin');

    $response = $this->actingAs($admin)->get(route('filament.admin.pages.dashboard'));

    $response->assertOk(); // Admin should access the panel
    $response->assertSee('Dashboard'); // Optionally check for a common UI element
});

test('users without admin role cannot access the filament admin panel', function () {
    $user = User::factory()->create();
    $user->assignRole('user');

    $response = $this->actingAs($user)->get(route('filament.admin.pages.dashboard'));

    $response->assertStatus(403); // Forbidden for non-admin users
});

test('unauthenticated users are redirected to the filament login page', function () {
    $response = $this->get(route('filament.admin.pages.dashboard'));

    $response->assertRedirect('/admin/login'); // Redirect to Filament's login page
});

