<?php

namespace App\Http\Controllers;

use App\Models\District;
use App\Models\Person;
use App\Models\Village;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VillageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
{
    $search = $request->input('search');

    $query = Village::with('parish.subcounty.county.district');

    if ($search) {
        $query->where('village', 'like', "%{$search}%");
    }

    $villages = $query->latest()->paginate(10);

    $districts = District::orderBy('district', 'asc')->get();

    return Inertia::render('DashboardVillageScreen', [
        'districts' => $districts,
        'villages' => $villages,
        'filters' => $request->only(['search'])
    ]);
}
    public function villages(Request $request)
    {
        //

        $parishes = Village::where('parish_id', $request->village)->orderBy('village', 'asc')->get();
        
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
        $village = Village::create([
            'district_id' => $request->district,
            'county_id' => $request->county,
            'subcounty_id' => $request->subcounty,
            'parish_id' => $request->parish,
            'village' => strtoupper($request->village),
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Village $village)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $village)
    {
        //

        $the_village = Village::where('id',$village->id)->first();
        $the_village->update([
            'village' => strtoupper($village->village)
        ]);
        return redirect()->back()->with('success', 'Village updated successfully.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Village $village)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $village)
    {
        //
        $the_village = Village::where('id', $village->village_id)->first();
        $Person = Person::where('village_id', $village->village_id)->count();
        if ($Person > 0) {
            return redirect()->back()->with('error', 'Village cannot be deleted because it has people.');
        } else {
    
            $the_village->delete();
        }


    }
}
