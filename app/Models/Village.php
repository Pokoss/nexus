<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Village extends Model
{
    use HasFactory;

    protected $table = 'village';

    protected $fillable = ['district_id','county_id','subcounty_id','parish_id','village'];

    public function parish(){
        return $this->belongsTo(Parish::class,'parish_id','id');
    }

}
