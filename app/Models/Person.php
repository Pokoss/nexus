<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Person extends Model
{
    use HasFactory;

    protected $table = 'persons';
    protected $fillable = ['name','phone','nin','district_id','county_id','subcounty_id', 'parish_id','village_id', 'registered_by'];
}
