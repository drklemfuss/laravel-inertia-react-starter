<?php

// Tests the CountryController for CRUD operations, ensuring the correct 
// permissions are enforced for accessing and modifying country data.

namespace Tests\Feature\RBAC;

use App\Models\User;
use App\Models\Country;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

beforeEach(function () {
    // Clear cached roles and permissions
    app()->make(\Spatie\Permission\PermissionRegistrar::class)->forgetCachedPermissions();

    // Create roles and permissions for the `web` guard
    Role::create(['name' => 'admin', 'guard_name' => 'web']);
    Permission::create(['name' => 'view-any-country', 'guard_name' => 'web']);
    Permission::create(['name' => 'view-country', 'guard_name' => 'web']);
});

test('index returns all countries for authorized users', function () {
    $admin = User::factory()->create();
    $admin->assignRole('admin'); // No need to specify the guard here

    Country::factory()->count(3)->create();

    $response = $this->actingAs($admin)->get(route('countries.index'));

    $response->assertOk(); // Authorized user should access index
    $response->assertInertia(fn ($page) =>
        $page
            ->component('Countries/Index')
            ->has('countries', 3)
    );
});

test('show returns a specific country for authorized users', function () {
    $admin = User::factory()->create();
    $admin->assignRole('admin'); // No need to specify the guard here

    $country = Country::factory()->create();

    $response = $this->actingAs($admin)->get(route('countries.show', $country));

    $response->assertOk(); // Authorized user should access show
    $response->assertInertia(fn ($page) =>
        $page
            ->component('Countries/Show')
            ->where('country.id', $country->id)
    );
});

test('unauthorized users cannot access index', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->get(route('countries.index'));

    $response->assertForbidden(); // Unauthorized user should not access index
});

test('unauthorized users cannot access show', function () {
    $user = User::factory()->create();
    $country = Country::factory()->create();

    $response = $this->actingAs($user)->get(route('countries.show', $country));

    $response->assertForbidden(); // Unauthorized user should not access show
});


