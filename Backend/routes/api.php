<?php

use App\Http\Controllers\Api\BrandControllers;
use App\Http\Controllers\Api\PhonesController;
use App\Http\Controllers\Api\PricesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::controller(PhonesController::class)->group(function () {
    Route::get('/phones', 'show');
    Route::get('/phone/{id}', 'showId');
    Route::put('/phones/{id}', 'update');
    Route::post('/phones', 'store');
    Route::delete('/phones/{id}', 'destroy');
});

Route::controller(PricesController::class)->group(function () {
    Route::get('/prices', 'show');
    Route::get('/prices/{id}', 'showId');
    Route::get('/price/{id}', 'showSinglePrice');
    Route::put('/price/{phoneId}/{id}', 'update');
    Route::post('/price', 'store');
    Route::delete('/price/{id}', 'destroy');
});

Route::controller(BrandControllers::class)->group(function () {
    Route::get('/brand', 'show');
    Route::post('/brand', 'store');
});