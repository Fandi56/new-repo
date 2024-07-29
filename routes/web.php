<?php

use App\Http\Controllers\Citizen\CitizenController;
use Illuminate\Support\Facades\Route;

Route::get('/', [CitizenController::class, 'index'])->name('citizens.index');