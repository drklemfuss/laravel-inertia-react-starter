<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CountrySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Path to the JSON file
        $filePath = database_path('data/countries.json');

        // Read and decode the JSON file
        $countries = json_decode(file_get_contents($filePath), true);

        if (!$countries) {
            $this->command->error('Failed to decode countries.json');
            return;
        }

        // Clear the existing records
        DB::table('countries')->truncate();

        // Insert each country into the database
        foreach ($countries as $countryId => $country) {
            DB::table('countries')->insert([
                'id' => $countryId,
                'capital' => $country['capital'] ?? null,
                'citizenship' => $country['citizenship'] ?? null,
                'country_code' => $country['country_code'] ?? null,
                'currency' => $country['currency'] ?? null,
                'currency_code' => $country['currency_code'] ?? null,
                'currency_sub_unit' => $country['currency_sub_unit'] ?? null,
                'currency_decimals' => $country['currency_decimals'] ?? null,
                'full_name' => $country['full_name'] ?? null,
                'iso_3166_2' => $country['iso_3166_2'] ?? null,
                'iso_3166_3' => $country['iso_3166_3'] ?? null,
                'name' => $country['name'] ?? null,
                'region_code' => $country['region_code'] ?? null,
                'sub_region_code' => $country['sub_region_code'] ?? null,
                'eea' => isset($country['eea']) ? (bool)$country['eea'] : false,
                'calling_code' => $country['calling_code'] ?? null,
                'currency_symbol' => $country['currency_symbol'] ?? null,
                'flag' => $country['flag'] ?? null,
            ]);
        }

        $this->command->info('Countries table seeded successfully!');
    }
}
