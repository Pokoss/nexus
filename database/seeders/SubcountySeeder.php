<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Subcounty;
use App\Models\County;
use Illuminate\Support\Facades\File;

class SubcountySeeder extends Seeder
{
    public function run()
    {
        Subcounty::unguard();

        $json = File::get(public_path('subcounty.json'));
        $data = json_decode($json);

        foreach ($data as $item) {
            $county = County::where('id', $item->county)->first();

            Subcounty::firstOrCreate(
                ['id' => $item->id],
                [
                    'subcounty' => $item->name,
                    'county_id' => $county->id,
                    'district_id' => $county->district_id
                ]
            );
        }

        Subcounty::reguard();
    }
}