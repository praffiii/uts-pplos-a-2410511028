<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Owner extends Model
{
    protected $fillable = ['user_id', 'name', 'phone', 'bank_account'];

    public function properties()
    {
        return $this->hasMany(Property::class);
    }
}
