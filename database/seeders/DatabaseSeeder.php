<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\PermissionRegistrar;
use Spatie\Permission\Models\Role;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        /**
         * ***************************************
         * Seed Static Data Tables
         * ***************************************
         */
        $this->call(CountrySeeder::class);


        /**
         * ***************************************
         * Seed Dynamic Data Tables
         * ***************************************
         */
        $this->call(TaskSeeder::class);


        /** 
         * ***************************************
         * Seed Roles, Permissions, and Users
         * ***************************************
         */ 

        //Reset cached roles and permissions
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        // Create Permissions
        // 1. Task Model:
        Permission::create(['name' => 'edit-task']);
        Permission::create(['name' => 'delete-task']);
        Permission::create(['name' => 'view-task']);
        Permission::create(['name' => 'view-any-task']);
        Permission::create(['name' => 'create-task']);
        // 2. Country Model (View-Only):
        Permission::create(['name' => 'view-country']);
        Permission::create(['name' => 'view-any-country']);

        // Create Roles
        $admin = Role::create(['name' => 'admin']);
        $user = Role::create(['name' => 'user']);

        // Assign Permissions to Roles
        $admin->givePermissionTo([
            'edit-task', 'delete-task', 'view-task','view-any-task', 'create-task',
            'view-country', 'view-any-country']);
        $user->givePermissionTo([
            'view-task', 'create-task', 'edit-task','delete-task',
             'view-country', 'view-any-country']);

        // User::factory(10)->create();

        // Create Test User: 
        $testUser = User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => bcrypt('password'),
        ]);
        $testUser->assignRole('user'); 

        // Create Admin User: 
        $adminUser = User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => bcrypt('password'),
        ]);
        $adminUser->assignRole('admin');
    }
}
