<?php

namespace App\Http\Controllers;

use App\Models\District;
use App\Models\Person;
use App\Models\User;
use GuzzleHttp\Psr7\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PersonController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, $slug)
    {
        //
        $user = User::where('slug',$slug)->first();
        $districts = District::all();
        return Inertia::render('CitizensRegistrationScreen',['districts' => $districts, 'user'=>$user]);
        
    }
    public function mylink()
    {
        //
        $my_data = User::where('id', Auth::user()->id)->first();

        return Inertia::render('MyLinkScreen', ['my_data' => $my_data])->withViewData([
            'title' => 'Join Kikumi Kikumi Community',
            'description' => 'Experience a vast array of services and products from our community',
            
        ]);;;
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

        // return Response($request->user);
        $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:13',
            
        ]);
        

        $person = Person::create([
            'name' => $request->name,
            'nin' => $request->nin,
            'phone' => $request->phone,
            'district_id' => $request->district,
            'county_id' => $request->county,
            'subcounty_id' => $request->subcounty,
            'parish_id' => $request->parish,
            'village_id' => $request->village,
            'registered_by' => $request->user,
        ]);

    }

    /**
     * Display the specified resource.
     */
    public function show(Person $person)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Person $person)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Person $person)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Person $person)
    {
        //
    }
}
