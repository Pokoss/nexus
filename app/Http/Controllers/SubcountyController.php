<?php

namespace App\Http\Controllers;

use App\Models\District;
use App\Models\Parish;
use App\Models\Subcounty;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class SubcountyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        //
        $search = $request->input('search');

        $query = Subcounty::with('county.district');
        if ($search) {
            $query->where('subcounty', 'like', "%{$search}%");
        }
        $subcounties = $query->latest()->paginate(10);

        $districts = District::orderBy('district', 'asc')->get();
        // $subcounties = Subcounty::with('county.district')->latest()->paginate(10);
        return Inertia::render('DashboardSubcountyScreen', ['districts' => $districts, 'subcounties'=>$subcounties]);
    }

    public function subcounties(Request $request)
    {
        //

        $subcounties = Subcounty::where('county_id', $request->subcounty)->orderBy('subcounty', 'asc')->get();
        
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
            'subcounty' => strtoupper($request->subcounty),
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
    public function edit(Request $subcounty)
    {
        //

        try {
            $subcounty->validate([
            'subcounty' => 'required',
        ]);
        $the_subcounty = Subcounty::where('id',$subcounty->id)->first();
        $the_subcounty->update([
            'subcounty' => strtoupper($subcounty->subcounty),
        ]);
          
        } catch (\Exception $e) {
           Log::error('Error in SubcountyController@edit: ' . $e->getMessage());
        }

        
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
    public function destroy(Request $subcounty)
    {
        //
         $the_subcounty = Subcounty::where('id',$subcounty->subcounty_id)->first();
        $parish = Parish::where('subcounty_id', $the_subcounty->id)->count();
        if ($parish > 0) {
            return redirect()->back()->with('error', 'County cannot be deleted because it has subcounties.');
        }
        else{
    
            $the_subcounty->delete();
        }
    }
}
