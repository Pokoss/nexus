<?php

namespace App\Http\Controllers;

use App\Models\County;
use App\Models\District;
use App\Models\Subcounty;
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
        $search = request()->get("search");
        $query = County::with('district');
        if ($search) {
            $query->where('county', 'like', "%{$search}%");
        }
        $counties = $query->latest()->paginate(10);

        // $counties = County::with('district')->latest()->paginate(10);
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
    public function edit(Request $county)
    {
        //
        $county->validate([
            'county' => 'required|string|max:255',
        ]);
        
        $the_county = County::with('district')->find($county->id);
        $the_county->update([
            'county' => strtoupper($county->county),
        ]);
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
    public function destroy(Request $county)
    {
        //
        $the_county = County::where('id',$county->county_id)->first();
        $subcounties = Subcounty::where('county_id', $the_county->id)->count();
        if ($subcounties > 0) {
            return redirect()->back()->with('error', 'County cannot be deleted because it has subcounties.');
        }
        else{
    
            $the_county->delete();
        }
    }
}
