<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\PhonesRequest;
use App\Http\Requests\PhonesRequestUpdate;
use App\Models\phones;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PhonesController extends Controller
{
    public function store(PhonesRequest $request){
        $phone =  new phones;
        $phone->brand_name = $request->brand_name;
        $phone->model = $request->model;
        $phone->release_date = $request->release_date;
        $phone->release_price = $request->release_price;
        $phone->save();
        return $phone;
    }
    // public function store(Request $request){
    //     $phone =  new phones;
    //     $phone->brand_name = $request->brand_name;
    //     $phone->model = $request->model;
    //     $phone->release_date = $request->release_date;
    //     $phone->release_price = $request->release_price;
    //     $phone->save();
    // }
    
    public function show(){
        $phone = DB::table('phones')->get();
        return $phone;
    }

    public function showId($id){
        $phone = phones::find($id);

        if($phone){
            return $phone;
        }

        abort(404, 'this Item does not exists');
    }

    public function update(PhonesRequestUpdate $request, $id){
        $phone = phones::find($id);
        $phone->brand_name = $request->brand_name;
        $phone->model = $request->model;
        $phone->release_price = $request->release_price;
        $phone->save();

    }

    public function destroy($id){
        $phone = phones::find($id);

        if($phone){
            $phone->delete();
            return "success";
        }

        abort(404, 'this Item does not exists');
    }

}
