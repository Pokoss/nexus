<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Parish;
use App\Models\Subcounty;
use Illuminate\Support\Facades\File;

class ParishSeeder extends Seeder
{
    public function run()
    {
        Parish::unguard();

        $json = File::get(public_path('parish.json'));
        $data = json_decode($json);

        foreach ($data as $item) {
            $subcounty = Subcounty::where('id', $item->subcounty)->first();

            Parish::firstOrCreate(
                ['id' => $item->id],
                [
                    'parish' => $item->name,
                    'subcounty_id' => $subcounty->id,
                    'county_id' => $subcounty->county_id,
                    'district_id' => $subcounty->district_id
                ]
            );
        }

        Parish::reguard();
    }
}