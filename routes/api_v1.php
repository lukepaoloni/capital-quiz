<?php

use App\Http\Controllers\Api\V1\QuizController;
use Illuminate\Support\Facades\Route;

Route::controller(QuizController::class)->prefix('/quiz')->group(function () {
    Route::get('/question', 'showRandomQuestion');
    Route::post('/answer', 'checkAnswer');
});
