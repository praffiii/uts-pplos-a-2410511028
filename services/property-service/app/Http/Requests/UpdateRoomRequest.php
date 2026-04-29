<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRoomRequest extends FormRequest
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
            'room_number'    => 'sometimes|string|max:20',
            'type'           => 'sometimes|string|max:50',
            'price_per_month'=> 'sometimes|numeric|min:0',
            'status'         => 'sometimes|in:available,booked',
        ];
    }
}
