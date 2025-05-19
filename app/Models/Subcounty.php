<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subcounty extends Model
{
    use HasFactory;

    protected $table = 'subcounties';

    protected $fillable = [
        'subcounty','county_id','district_id'
    ];

    public function county(){
        return $this->belongsTo(County::class,'county_id','id');
    }

}
