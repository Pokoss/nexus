<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Village;
use App\Models\Parish;
use Illuminate\Support\Facades\File;

class VillageSeeder extends Seeder
{
    public function run()
    {
        Village::unguard();

        $json = File::get(public_path('village.json'));
        $data = json_decode($json);

        foreach ($data as $item) {
            $parish = Parish::where('id', $item->parish)->first();

            Village::firstOrCreate(
                ['id' => $item->id],
                [
                    'village' => $item->name,
                    'parish_id' => $parish->id,
                    'subcounty_id' => $parish->subcounty_id,
                    'county_id' => $parish->county_id,
                    'district_id' => $parish->district_id
                ]
            );
        }

        Village::reguard();
    }
}