<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\brands;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BrandControllers extends Controller
{

       public function store(Request $request){
        $brand =  new brands;
        $brand->brand = $request->brand;
        $brand->save();
    }
       public function show(){
        $brand = brands::select('brand')->get();
        return $brand;
    }
}
