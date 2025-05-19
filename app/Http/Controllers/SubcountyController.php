<?php

namespace App\Http\Controllers;

use App\Models\District;
use App\Models\Subcounty;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SubcountyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $districts = District::all();
        $subcounties = Subcounty::with('county.district')->paginate(10);
        return Inertia::render('DashboardSubcountyScreen', ['districts' => $districts, 'subcounties'=>$subcounties]);
    }

    public function subcounties(Request $request)
    {
        //

        $subcounties = Subcounty::where('county_id', $request->subcounty)->latest()->get();
        
        return Response( $subcounties );

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

        //
        $subcounty = Subcounty::create([
            'district_id' => $request->district,
            'county_id' => $request->county,
            'subcounty' => $request->subcounty,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Subcounty $subcounty)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Subcounty $subcounty)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Subcounty $subcounty)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Subcounty $subcounty)
    {
        //
    }
}
