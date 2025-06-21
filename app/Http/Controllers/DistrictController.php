<?php

namespace App\Http\Controllers;

use App\Models\District;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DistrictController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        //

        $search = $request->get("search");
         $query = District::query();
        if ($search) {
            $query->where('district', 'like', "%{$search}%");
        }
        $districts = $query->latest()->paginate(10);

        // $districts = District::where("district","LIKE", "%". $search ."%")
        
        // $districts = District::with('counties')->latest()->paginate(10);
        return Inertia::render('DashboardDistrictScreen', ['districts'=> $districts ]);

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

        $district = District::create([
            'district' => strtoupper($request->district)
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(District $district)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(District $district)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, District $district)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(District $district)
    {
        //
    }
}
