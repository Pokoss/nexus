<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class District extends Model
{
    use HasFactory;
    protected $table = 'districts';

    protected $fillable = ['district'];

    public function counties(){
        return $this->hasMany(County::class,'district_id','id');
    }


   
  
}
