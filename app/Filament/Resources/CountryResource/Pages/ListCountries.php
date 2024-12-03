<?php

namespace App\Filament\Resources\CountryResource\Pages;

use App\Filament\Resources\CountryResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;
use Filament\Pages\Concerns\ExposesTableToWidgets;

class ListCountries extends ListRecords
{
    protected static string $resource = CountryResource::class;
    use ExposesTableToWidgets; # Not needed just playing around
    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }

    protected function getHeaderWidgets(): array {
        // getHeader displays above table, getBelow displays below
        return [
            CountryResource\Widgets\CountryOverview::class,
        ];
    }
}

