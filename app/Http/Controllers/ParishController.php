<?php

namespace App\Http\Controllers;

use App\Models\District;
use App\Models\Parish;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ParishController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //

        $districts = District::orderBy('district', 'asc')->get();
        $parishes = Parish::with('subcounty.county.district')->paginate(10);
        return Inertia::render('DashboardParishScreen', ['districts' => $districts, 'parishes'=>$parishes]);
    }
    public function parishes(Request $request)
    {
        //

        $parishes = Parish::where('subcounty_id', $request->parish)->orderBy('parish', 'asc')->get();
        
        return Response( $parishes );

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $parish = Parish::create([
            'district_id' => $request->district,
            'county_id' => $request->county,
            'subcounty_id' => $request->subcounty,
            'parish' => strtoupper($request->parish),
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Parish $parish)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Parish $parish)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Parish $parish)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Parish $parish)
    {
        //
    }
}
