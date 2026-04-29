<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreRoomRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'property_id'    => 'required|integer|exists:properties,id',
            'room_number'    => 'required|string|max:20',
            'type'           => 'required|string|max:50',
            'price_per_month'=> 'required|numeric|min:0',
            'status'         => 'sometimes|in:available,booked',
        ];
    }
}
