<?php

namespace App\Filament\Resources;

use App\Filament\Resources\CountryResource\Pages;
use App\Filament\Resources\CountryResource\RelationManagers;
use App\Models\Country;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class CountryResource extends Resource
{
    protected static ?string $model = Country::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('capital')
                    ->maxLength(255),
                Forms\Components\TextInput::make('citizenship')
                    ->maxLength(255),
                Forms\Components\TextInput::make('country_code')
                    ->maxLength(3),
                Forms\Components\TextInput::make('currency')
                    ->maxLength(255),
                Forms\Components\TextInput::make('currency_code')
                    ->maxLength(255),
                Forms\Components\TextInput::make('currency_sub_unit')
                    ->maxLength(255),
                Forms\Components\TextInput::make('currency_decimals')
                    ->numeric(),
                Forms\Components\TextInput::make('full_name')
                    ->maxLength(255),
                Forms\Components\TextInput::make('iso_3166_2')
                    ->maxLength(2),
                Forms\Components\TextInput::make('iso_3166_3')
                    ->maxLength(3),
                Forms\Components\TextInput::make('name')
                    ->required()
                    ->maxLength(255),
                Forms\Components\TextInput::make('region_code')
                    ->maxLength(3),
                Forms\Components\TextInput::make('sub_region_code')
                    ->maxLength(3),
                Forms\Components\Toggle::make('eea')
                    ->required(),
                Forms\Components\TextInput::make('calling_code')
                    ->maxLength(255),
                Forms\Components\TextInput::make('currency_symbol')
                    ->maxLength(3),
                Forms\Components\TextInput::make('flag')
                    ->maxLength(255),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('capital')
                    ->searchable(),
                Tables\Columns\TextColumn::make('citizenship')
                    ->searchable(),
                Tables\Columns\TextColumn::make('country_code')
                    ->searchable(),
                Tables\Columns\TextColumn::make('currency')
                    ->searchable(),
                Tables\Columns\TextColumn::make('currency_code')
                    ->searchable(),
                Tables\Columns\TextColumn::make('currency_sub_unit')
                    ->searchable(),
                Tables\Columns\TextColumn::make('currency_decimals')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('full_name')
                    ->searchable(),
                Tables\Columns\TextColumn::make('iso_3166_2')
                    ->searchable(),
                Tables\Columns\TextColumn::make('iso_3166_3')
                    ->searchable(),
                Tables\Columns\TextColumn::make('name')
                    ->searchable(),
                Tables\Columns\TextColumn::make('region_code')
                    ->searchable(),
                Tables\Columns\TextColumn::make('sub_region_code')
                    ->searchable(),
                Tables\Columns\IconColumn::make('eea')
                    ->boolean(),
                Tables\Columns\TextColumn::make('calling_code')
                    ->searchable(),
                Tables\Columns\TextColumn::make('currency_symbol')
                    ->searchable(),
                Tables\Columns\TextColumn::make('flag')
                    ->searchable(),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListCountries::route('/'),
            'create' => Pages\CreateCountry::route('/create'),
            'edit' => Pages\EditCountry::route('/{record}/edit'),
        ];
    }

    public static function getWidgets(): array {
    return [
        CountryResource\Widgets\CountryOverview::class,
    ];
}
}

