<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\prices;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PricesController extends Controller
{
        public function store(Request $request){
        $prices =  new prices;
        $prices->model_id = $request->model_id;
        $prices->date_added = $request->date_added;
        $prices->price = $request->price;
        $prices->save();
    }
    
    public function show(){
        $prices = DB::table('prices')->get();
        return $prices;
    }

    public function showId($id){
        $price = prices::where('model_id', $id)->get();
        return $price;

    }
    public function showSinglePrice($id){
        $price = prices::where('id', $id)->get();
        return $price;

    }

    public function update(Request $request, $id){
        $prices = prices::find($id);
        $prices->date_added = $request->date_added;
        $prices->price = $request->price;
        $prices->save();

    }

    public function destroy($id){
        $prices = prices::find($id);
        $prices->delete();
    }

}
