<?php

namespace App\Http\Controllers;

use App\Models\Owner;
use App\Http\Requests\StoreOwnerRequest;

class OwnerController extends Controller
{
    public function store(StoreOwnerRequest $request)
    {
        $data = $request->validated();
        $data['user_id'] = $request->auth_user['id'];
        $owner = Owner::create($data);
        return response()->json(['message' => 'Owner created', 'data' => $owner], 201);
    }

    public function show(string $id)
    {
        $owner = Owner::with('properties')->findOrFail($id);
        return response()->json(['data' => $owner]);
    }

    public function update(StoreOwnerRequest $request, string $id)
    {
        $owner = Owner::findOrFail($id);
        $owner->update($request->validated());
        return response()->json(['message' => 'Owner updated', 'data' => $owner]);
    }
}
