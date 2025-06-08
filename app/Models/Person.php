<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Person extends Model
{
    use HasFactory;

    protected $table = 'persons';
    protected $fillable = ['name','phone','nin','district_id','county_id','subcounty_id', 'parish_id','village_id', 'registered_by'];

    public function village(){
        return $this->belongsTo(Village::class,'village_id','id');
    }public function parish(){
        return $this->belongsTo(Parish::class,'parish_id','id');
    }public function subcounty(){
        return $this->belongsTo(Subcounty::class,'subcounty_id','id');
    }public function county(){
        return $this->belongsTo(County::class,'county_id','id');
    }
    public function district(){
        return $this->belongsTo(District::class,'county_id','id');
    }
}
