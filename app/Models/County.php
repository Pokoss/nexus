<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class County extends Model
{
    use HasFactory;
    protected $table = 'counties';

    protected $fillable = ['county','district_id'];

    // public function sales(){
    //     return $this->hasMany(Sale::class,'sale_id','sale_id');
    // }
    public function district(){
        return $this->belongsTo(District::class,'district_id','id');
    }
}
