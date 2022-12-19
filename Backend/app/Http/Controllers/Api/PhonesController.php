<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\phones;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PhonesController extends Controller
{
    public function store(Request $request){
        $phone =  new phones;
        $phone->brand_id = $request->brand_id;
        $phone->model = $request->model;
        $phone->release_date = $request->release_date;
        $phone->release_price = $request->release_price;
        $phone->save();
    }
    
    public function show(){
        $phone = DB::table('phones')->get();
        return $phone;
    }

    public function showId($id){
        $phone = phones::find($id);
        return $phone;

    }

    public function update(Request $request, $id){
        $phone = phones::find($id);
        $phone->brand_id = $request->brand_id;
        $phone->model = $request->model;
        $phone->release_date = $request->release_date;
        $phone->release_price = $request->release_price;
        $phone->save();

    }

    public function destroy($id){
        $phone = phones::find($id);
        $phone->delete();
    }

}
