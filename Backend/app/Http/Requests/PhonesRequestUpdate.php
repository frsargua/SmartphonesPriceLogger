<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PhonesRequestUpdate extends FormRequest
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
            'brand_name'=>['required','min:3','max:10'],
            'model'=>['required','unique:phones,model','min:1','max:15'],
            'release_price'=>['required','integer', 'max:3000', 'min:10']
        ];
    }
}
