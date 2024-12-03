<?php

namespace App\Filament\Resources\UserResource\Widgets;

use App\Models\User;
use App\Filament\Resources\UserResource\Pages\ListUsers;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\Concerns\InteractsWithPageTable;
use Filament\Widgets\StatsOverviewWidget\Stat;
use Spatie\Permission\Models\Role;

class UserOverview extends BaseWidget
{
    use InteractsWithPageTable;

    protected function getStats(): array
    {
        // Count the total number of users
        $totalUsers = User::count();

        // Count the number of users with the 'admin' role
        $adminCount = User::role('admin')->count();

        // Count the number of users with the 'user' role
        $userCount = User::role('user')->count();

        return [
            Stat::make('Total Users', $totalUsers),
            Stat::make('Admins', $adminCount),
            Stat::make('Users', $userCount),
        ];
    }

    protected function getTablePage(): string
    {
        return ListUsers::class;
    }
}

