<?php

namespace App\Http\Controllers;

use App\Models\District;
use App\Models\Parish;
use App\Models\Village;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ParishController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        //
        $search = $request->input('search');

        $query = Parish::with('subcounty.county.district');
        if ($search) {
            $query->where('parish', 'like', "%{$search}%");
        }

        $parishes = $query->latest()->paginate(10);
        $districts = District::orderBy('district', 'asc')->get();
        // $parishes = Parish::with('subcounty.county.district')->latest()->paginate(10);
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
    public function edit(Request $parish)
    {
        //
         $the_parish = Parish::where('id',$parish->id)->first();
         $the_parish->update([
            'parish' => strtoupper($parish->parish)
         ]);}

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
    public function destroy(Request $parish)
    {
        //
         
        $the_parish = Parish::where('id',$parish->parish_id)->first();
        $village = Village::where('parish_id', $parish->parish_id)->count();
        if ($village > 0) {
            return redirect()->back()->with('error', 'Parish cannot be deleted because it has villages.');
        }
        else{
    
            $the_parish->delete();
        }
    }
}
