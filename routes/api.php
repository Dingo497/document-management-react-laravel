<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\TagController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/documents-cookie', [DocumentController::class, 'getDocumentsByCookieAuth']);

Route::middleware('auth:sanctum')->group(function() {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'getUser']);

    Route::get('documents/documents-pagination', [DocumentController::class, 'getTotalUserDocumentsCount']);
    Route::apiResource('documents', DocumentController::class);
    // Stahovanie mi nefunguje neviem z akeho dovodu. Asi kvoli middleware Auth.
    // Ked danu route dam mimo auth a pojdem na danu adresu cez prehliadac tak mi to pekne stiahne
    // Avsak v postmane mi to funguje aj ked je to sem... Mozno aj v reacte to taham zle.
    // Ale v response.data mam text/html a to asi nieje blob data neviem...
    Route::get('documents/download/{filename}', [DocumentController::class, 'download']);

    Route::apiResource('tags', TagController::class);
});
