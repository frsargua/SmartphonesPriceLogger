<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\BrandRequest;
use App\Models\brands;
use Dotenv\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Validator as FacadesValidator;

class BrandControllers extends Controller
{

    //    public function store(Request $request){
    //     $brand =  new brands;
    //     $brand->brand = $request->brand;
    //     $brand->save();
    // }
       public function store(Request $request){
        
        $validator = FacadesValidator::make($request->all(), [
            'brand'=>['required','string','unique:brands,brand','min:3','max:10']
        ]);

        if ($validator->fails()) {
            abort(404, $validator->errors());
        }

        $brand =  new brands;
        $brand->brand = $request->brand;
        $brand->save();

        // return $brand->response();

        return $brand;
    }
       public function show(){
        $brand = brands::select('brand')->get();
        return $brand;
    }
}
