<?php

namespace App\Http\Controllers;

use App\Models\Room;
use App\Http\Requests\StoreRoomRequest;
use App\Http\Requests\UpdateRoomRequest;

class RoomController extends Controller
{
    public function index()
    {
        $perPage = request()->integer('per_page', 10);
        $query = Room::with(['property', 'facilities']);

        if (request()->filled('status')) {
            $query->where('status', request('status'));
        }

        if (request()->filled('max_price')) {
            $query->where('price_per_month', '<=', request('max_price'));
        }

        if (request()->filled('min_price')) {
            $query->where('price_per_month', '>=', request('min_price'));
        }

        return response()->json($query->paginate($perPage));
    }

    public function store(StoreRoomRequest $request)
    {
        $room = Room::create($request->validated());
        return response()->json(['message' => 'Room created', 'data' => $room], 201);
    }

    public function show(string $id)
    {
        $room = Room::with(['property', 'facilities'])->findOrFail($id);
        return response()->json(['data' => $room]);
    }

    public function update(UpdateRoomRequest $request, string $id)
    {
        $room = Room::findOrFail($id);
        $room->update($request->validated());
        return response()->json(['message' => 'Room updated', 'data' => $room]);
    }

    public function destroy(string $id)
    {
        $room = Room::findOrFail($id);
        $room->delete();
        return response()->json(['message' => 'Room deleted']);
    }
}
