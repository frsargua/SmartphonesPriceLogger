<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PricesRequestUpdate extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'date_added'=>['required','date'],
            'price'=>['required','integer', 'max:3000', 'min:10']
        ];
    }
}
