<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Property extends Model
{
    protected $fillable = ['owner_id', 'name', 'address', 'city', 'description'];

    public function owner()
    {
        return $this->belongsTo(Owner::class);
    }

    public function rooms()
    {
        return $this->hasMany(Room::class);
    }
}
