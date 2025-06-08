<?php

namespace App\Http\Controllers;

use App\Models\District;
use App\Models\Person;
use App\Models\User;
use App\Models\Village;
use GuzzleHttp\Psr7\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PersonController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function home(Request $request)
    {
        //
        $authorization = Auth::user()->level;

        if($authorization < 2){
            return Inertia::render('RestrictedScreen');
        }
 
        $districts = District::all()->count();
        $villages = Village::all()->count();
        $codinators = User::where('level','>',0)->count();
        $people = Person::all()->count();

       
        return Inertia::render('DashboardHomeScreen',['districts' => $districts,'villages'=>$villages,'codinators'=>$codinators, 'people'=>$people]);
        
    }
    public function index(Request $request, $slug)
    {
        //
        
        $the_user = User::where('slug',$slug)->first();
        $districts = District::all();

       
        return Inertia::render('CitizensRegistrationScreen',['districts' => $districts, 'the_user'=>$the_user]);
        
    }
    public function mylink()
    {
        //
        $my_data = User::where('id', Auth::user()->id)->first();

        if($my_data->level == 0){
             return Inertia::render('RestrictedScreen',)->withViewData([
            'title' => 'Join Kikumi Kikumi Community',
            'description' => 'Experience a vast array of services and products from our community',
            
        ]);;;
        }

        $my_people = Person::where('registered_by',$my_data->id)->with('village.parish.subcounty.county.district')->paginate(10);

        return Inertia::render('MyLinkScreen', ['my_data' => $my_data, 'my_people' => $my_people])->withViewData([
            'title' => 'Join Kikumi Kikumi Community',
            'description' => 'Experience a vast array of services and products from our community',
            
        ]);;;
    }

    public function getPeople(Request $request){

        $authorization = Auth::user()->level;

        if($authorization < 2){
            return Inertia::render('RestrictedScreen');
        }

        $my_people = Person::with('village.parish.subcounty.county.district')->paginate(10);

        return Inertia::render('DashboardBiodataScreen', ['people'=> $my_people]);

    }
    public function getCodinators(Request $request){

        $authorization = Auth::user()->level;

        if($authorization < 2){
            return Inertia::render('RestrictedScreen');
        }

        $codinators = User::paginate(10);

        return Inertia::render('DashboardCodinatorScreen', ['codinators'=> $codinators]);

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
