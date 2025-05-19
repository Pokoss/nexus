<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Parish extends Model
{
    use HasFactory;

    protected $table = 'parishes';

    protected $fillable =['parish','subcounty_id','county_id','district_id'];

    public function subcounty(){
        return $this->belongsTo(Subcounty::class,'subcounty_id','id');
    }

}
