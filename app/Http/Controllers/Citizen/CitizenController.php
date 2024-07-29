<?php

namespace App\Http\Controllers\Citizen;

use Inertia\Inertia;
use App\Models\Citizen;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CitizenController extends Controller
{
    public function index(Request $request)
    {
        $query = Citizen::query();

        if ($request->has('start_date') && $request->has('end_date')) {
            $query->whereBetween('waktu_cetak', [$request->start_date, $request->end_date]);
        }

        if ($request->has('search')) {
            $query->where('nama', 'like', '%' . $request->search . '%')->orWhere('nik', 'like', '%' . $request->search . '%');
        }

        $citizens = $query->latest()->get();

        return Inertia::render('Citizen/CitizenPage', [
            'initialCitizens' => $citizens,
        ]);
    }
}
