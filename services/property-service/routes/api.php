<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PropertyController;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\OwnerController;

Route::get('/rooms/{id}', [RoomController::class, 'show']);
Route::get('/rooms', [RoomController::class, 'index']);
Route::get('/properties', [PropertyController::class, 'index']);
Route::get('/properties/{id}', [PropertyController::class, 'show']);

Route::middleware('jwt')->group(function () {
    Route::post('/properties', [PropertyController::class, 'store']);
    Route::put('/properties/{id}', [PropertyController::class, 'update']);
    Route::delete('/properties/{id}', [PropertyController::class, 'destroy']);

    Route::post('/rooms', [RoomController::class, 'store']);
    Route::put('/rooms/{id}', [RoomController::class, 'update']);
    Route::delete('/rooms/{id}', [RoomController::class, 'destroy']);

    Route::post('/owners', [OwnerController::class, 'store']);
    Route::get('/owners/{id}', [OwnerController::class, 'show']);
    Route::put('/owners/{id}', [OwnerController::class, 'update']);
});
