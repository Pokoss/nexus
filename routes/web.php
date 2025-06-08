<?php

use App\Http\Controllers\CountyController;
use App\Http\Controllers\DistrictController;
use App\Http\Controllers\ParishController;
use App\Http\Controllers\PersonController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SubcountyController;
use App\Http\Controllers\VillageController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('HomeScreen', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');


    Route::get('/dashboard/home', [PersonController::class, 'home']);
    Route::get('/dashboard/districts', [DistrictController::class, 'index']);
    Route::post('/dashboard/district/post', [DistrictController::class, 'store']);

    Route::get('/dashboard/county', [CountyController::class, 'index']);
    Route::post('/dashboard/county/post', [CountyController::class, 'store']);
    
    Route::get('/dashboard/subcounty', [SubcountyController::class, 'index']);
    Route::post('/dashboard/subcounty/post', [SubcountyController::class, 'store']);
    
    Route::get('/dashboard/parish', [ParishController::class, 'index']);
    Route::post('/dashboard/parish/post', [ParishController::class, 'store']);
    
    
    Route::get('/dashboard/village', [VillageController::class, 'index']);
    Route::post('/dashboard/village/post', [VillageController::class, 'store']);

    Route::get('/dashboard/biodata', [PersonController::class, 'getPeople']);
    Route::get('/dashboard/codinators', [PersonController::class, 'getCodinators']);
 
    
    
    Route::get('/mylink', [PersonController::class, 'mylink']);
});

Route::get('/join/{slug}', [PersonController::class, 'index']);
Route::post('/join/post', [PersonController::class, 'store']);

Route::get('/getcounties', [CountyController::class, 'counties']);
Route::get('/getsubcounties', [SubcountyController::class, 'subcounties']);
Route::get('/getparishes', [ParishController::class, 'parishes']);
Route::get('/getvillages', [VillageController::class, 'villages']);



Route::get('/registration-success', function () {
    return Inertia::render('RegistrationSuccessScreen');
});
Route::get('/dashboard/groups', function () {
    return Inertia::render('DashoboardGroupScreen');
});
Route::get('/dashboard/structure', function () {
    return Inertia::render('DashboardStructureScreen');
});







require __DIR__ . '/auth.php';
