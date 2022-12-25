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
       public function store(BrandRequest $request){
        $newBrand =  brands::create($request->validated());
        return response()->json($newBrand);
    }

    
       public function show(){
        $brand = brands::select('brand')->get();
        return $brand;
    }
}
