<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\County;
use App\Models\District;
use Illuminate\Support\Facades\File;

class CountySeeder extends Seeder
{
    public function run()
    {
        County::unguard();

        $json = File::get(public_path('county.json'));
        $data = json_decode($json);

        foreach ($data as $item) {
            $district = District::where('id', $item->district)->first();

            County::firstOrCreate(
                ['id' => $item->id],
                [
                    'county' => $item->name,
                    'district_id' => $district->id
                ]
            );
        }

        County::reguard();
    }
}