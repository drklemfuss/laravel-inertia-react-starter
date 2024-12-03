<?php

namespace Database\Factories;

use App\Models\Country;
use Illuminate\Database\Eloquent\Factories\Factory;

class CountryFactory extends Factory
{
    protected $model = Country::class;

    public function definition()
    {
        return [
            'id' => $this->faker->unique()->randomNumber(5),
            'capital' => $this->faker->city,
            'citizenship' => $this->faker->word,
            'country_code' => $this->faker->countryCode,
            'currency' => $this->faker->currencyCode,
            'currency_code' => $this->faker->currencyCode,
            'currency_sub_unit' => 'cent',
            'currency_symbol' => $this->faker->randomElement(['$', '€', '£']),
            'currency_decimals' => $this->faker->numberBetween(0, 2),
            'full_name' => $this->faker->country,
            'iso_3166_2' => $this->faker->countryCode,
            'iso_3166_3' => ['USA', 'FRA', 'DEU', 'JPN', 'IND'][array_rand(['USA', 'FRA', 'DEU', 'JPN', 'IND'])],
            'name' => $this->faker->country,
            'region_code' => $this->faker->word,
            'sub_region_code' => $this->faker->word,
            'eea' => $this->faker->boolean,
            'calling_code' => $this->faker->randomNumber(2),
            'flag' => $this->faker->imageUrl(50, 30, 'flags', true),
        ];
    }
}

