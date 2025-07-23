<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\District;
use Illuminate\Support\Facades\File;

class DistrictSeeder extends Seeder
{
    public function run()
    {
        District::unguard();

        $json = File::get(public_path('district.json'));
        $data = json_decode($json);

        foreach ($data as $item) {
            District::firstOrCreate(['id' => $item->id], ['district' => $item->name]);
        }

        District::reguard();
    }
}