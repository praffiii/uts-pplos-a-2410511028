<?php

namespace App\Http\Controllers;

use App\Models\Property;
use App\Http\Requests\StorePropertyRequest;
use App\Http\Requests\UpdatePropertyRequest;

class PropertyController extends Controller
{
    public function index()
    {
        $perPage = request()->integer('per_page', 10);
        $query = Property::with('owner');

        if (request()->filled('city')) {
            $query->where('city', 'like', '%' . request('city') . '%');
        }

        return response()->json($query->paginate($perPage));
    }

    public function store(StorePropertyRequest $request)
    {
        $property = Property::create($request->validated());
        return response()->json(['message' => 'Property created', 'data' => $property], 201);
    }

    public function show(string $id)
    {
        $property = Property::with(['owner', 'rooms'])->findOrFail($id);
        return response()->json(['data' => $property]);
    }

    public function update(UpdatePropertyRequest $request, string $id)
    {
        $property = Property::findOrFail($id);
        $property->update($request->validated());
        return response()->json(['message' => 'Property updated', 'data' => $property]);
    }

    public function destroy(string $id)
    {
        $property = Property::findOrFail($id);
        $property->delete();
        return response()->json(['message' => 'Property deleted']);
    }
}
