<?php

namespace App\Filament\Resources\CountryResource\Widgets;

use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use Filament\Widgets\Concerns\InteractsWithPageTable;
use App\Filament\Resources\CountryResource\Pages\ListCountries;
use App\Models\Country;

class CountryOverview extends BaseWidget
{

    use InteractsWithPageTable;
    protected static ?string $pollingInterval = null;
    protected function getStats(): array
    {
        return [
            Stat::make('Total Countries', Country::count()),
            Stat::make('Unique Regions', Country::distinct('region_code')->count('region_code')),
            Stat::make('Unique Sub-Regions', Country::distinct('sub_region_code')->count('sub_region_code')),
        ];
    }

    protected function getTablePage(): string {
        return ListCountries::class;
    }
}