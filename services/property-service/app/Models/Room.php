<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    protected $fillable = ['property_id', 'room_number', 'type', 'price_per_month', 'status'];

    public function property()
    {
        return $this->belongsTo(Property::class);
    }

    public function facilities()
    {
        return $this->hasMany(Facility::class);
    }
}
