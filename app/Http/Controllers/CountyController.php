<?php

namespace App\Http\Controllers;

use App\Models\County;
use App\Models\District;
use GuzzleHttp\Psr7\Response;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CountyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //

        $counties = County::with('district')->latest()->paginate(10);
        $districts = District::orderBy('district', 'asc')->get();
        return Inertia::render('DashboardCountyScreen', ['counties'=> $counties,'districts'=>$districts ]);

    }
    public function counties(Request $request)
    {
        //

        $counties = County::where('district_id', $request->district)->orderBy('county', 'asc')->get();
        
        return Response( $counties );

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
        $county = County::create([
            'county' => strtoupper($request->county),
            'district_id' => $request->district,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(County $county)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(County $county)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, County $county)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(County $county)
    {
        //
    }
}
