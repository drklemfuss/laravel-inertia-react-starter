<?php

// Tests the CountryPolicy to ensure users with appropriate roles and permissions 
// can perform specific actions on country resources.

namespace Tests\Feature\RBAC;

use App\Models\User;
use App\Models\Country;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

beforeEach(function () {
    // Clear cached roles and permissions
    app()->make(\Spatie\Permission\PermissionRegistrar::class)->forgetCachedPermissions();

    // Set up roles and permissions with the 'web' guard
    Role::create(['name' => 'admin', 'guard_name' => 'web']);
    Permission::create(['name' => 'view-any-country', 'guard_name' => 'web']);
    Permission::create(['name' => 'view-country', 'guard_name' => 'web']);
});

test('admins can view any countries', function () {
    $admin = User::factory()->create();
    $admin->assignRole('admin'); // Assign the role to the admin user

    Country::factory()->count(3)->create();

    $response = $this->actingAs($admin)->get(route('countries.index'));

    $response->assertOk();
});

test('users with view-any-country permission can view any countries', function () {
    $user = User::factory()->create();
    $user->givePermissionTo('view-any-country'); // Assign the permission to the user

    Country::factory()->count(3)->create();

    $response = $this->actingAs($user)->get(route('countries.index'));

    $response->assertOk();
});

test('regular users cannot view any countries', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->get(route('countries.index'));

    $response->assertForbidden();
});

test('admins can view a specific country', function () {
    $admin = User::factory()->create();
    $admin->assignRole('admin'); // Assign the role to the admin user

    $country = Country::factory()->create();

    $response = $this->actingAs($admin)->get(route('countries.show', $country));

    $response->assertOk();
});

test('users with view-country permission can view a specific country', function () {
    $user = User::factory()->create();
    $user->givePermissionTo('view-country'); // Assign the permission to the user

    $country = Country::factory()->create();

    $response = $this->actingAs($user)->get(route('countries.show', $country));

    $response->assertOk();
});

test('regular users cannot view a specific country', function () {
    $user = User::factory()->create();
    $country = Country::factory()->create();

    $response = $this->actingAs($user)->get(route('countries.show', $country));

    $response->assertForbidden();
});

