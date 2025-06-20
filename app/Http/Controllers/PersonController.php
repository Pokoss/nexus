<?php

namespace App\Http\Controllers;

use App\Models\District;
use App\Models\Person;
use App\Models\User;
use App\Models\Village;
use GuzzleHttp\Psr7\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
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

        if ($authorization < 2) {
            return Inertia::render('RestrictedScreen');
        }

        $districts = District::all()->count();
        $villages = Village::all()->count();
        $codinators = User::where('level', '>', 0)->count();
        $people = Person::all()->count();


        return Inertia::render('DashboardHomeScreen', ['districts' => $districts, 'villages' => $villages, 'codinators' => $codinators, 'people' => $people]);
    }
    public function index(Request $request, $slug)
    {
        //

        $the_user = User::where('slug', $slug)->first();
        $districts = District::all();


        return Inertia::render('CitizensRegistrationScreen', ['districts' => $districts, 'the_user' => $the_user]);
    }
    public function mylink()
    {
        //
        $my_data = User::where('id', Auth::user()->id)->first();

        if ($my_data->level == 0) {
            return Inertia::render('RestrictedScreen',)->withViewData([
                'title' => 'Join Kikumi Kikumi Community',
                'description' => 'Experience a vast array of services and products from our community',

            ]);;;
        }

        $my_people = Person::where('registered_by', $my_data->id)->with('village.parish.subcounty.county.district')->paginate(10);

        return Inertia::render('MyLinkScreen', ['my_data' => $my_data, 'my_people' => $my_people])->withViewData([
            'title' => 'Join Kikumi Kikumi Community',
            'description' => 'Experience a vast array of services and products from our community',

        ]);;;
    }

    public function getPeople(Request $request)
    {
        $authorization = Auth::user()->level;

        if ($authorization < 2) {
            return Inertia::render('RestrictedScreen');
        }

        // Initialize filters with default empty strings
        $filters = [
            'district_id' => $request->input('district_id', ''),
            'county_id' => $request->input('county_id', ''),
            'subcounty_id' => $request->input('subcounty_id', ''),
            'parish_id' => $request->input('parish_id', ''),
            'village_id' => $request->input('village_id', ''),
            'search' => $request->input('search', ''),
        ];

        $query = Person::query()->with('village.parish.subcounty.county.district');

        // Apply filters dynamically
        if ($filters['district_id']) {
            $query->where('district_id', $filters['district_id']);
        }
        if ($filters['county_id']) {
            $query->where('county_id', $filters['county_id']);
        }
        if ($filters['subcounty_id']) {
            $query->where('subcounty_id', $filters['subcounty_id']);
        }
        if ($filters['parish_id']) {
            $query->where('parish_id', $filters['parish_id']);
        }
        if ($filters['village_id']) {
            $query->where('village_id', $filters['village_id']);
        }
        if ($filters['search']) {
            $query->where('name', 'like', "%{$filters['search']}%");
        }

        $my_people = $query->paginate(1);

        $districts = District::all();

        return Inertia::render('DashboardBiodataScreen', [
            'people' => $my_people,
            'filters' => $filters,
            'districts' => $districts
        ]);
    }
    public function getCodinators(Request $request)
    {
        $authorization = Auth::user()->level;

        if ($authorization < 2) {
            return Inertia::render('RestrictedScreen');
        }

        $search = $request->input('search');

        $query = User::query();

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('nin', 'like', "%{$search}%")
                    ->orWhere('phone', 'like', "%{$search}%");
            });
        }

        $codinators = $query->paginate(10)->appends(['search' => $search]);

        return Inertia::render('DashboardCodinatorScreen', [
            'codinators' => $codinators,
            'filters' => $request->only('search')
        ]);
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

        try {

            $request->validate([
                'name' => 'required|string|max:255',
                'phone' => 'required|max:13',
                'nin' => 'required',
                'district' => 'required',
                'county' => 'required',
                'subcounty' => 'required',
                'parish' => 'required',
                'village' => 'required',
                'user' => 'required',

            ]);


            $person = Person::create([
                'name' => strtoupper($request->name),
                'nin' => strtoupper($request->nin),
                'phone' => $request->phone,
                'district_id' => $request->district,
                'county_id' => $request->county,
                'subcounty_id' => $request->subcounty,
                'parish_id' => $request->parish,
                'village_id' => $request->village,
                'registered_by' => $request->user,
            ]);
        } catch (\Exception $e) {
            Log::error('Error creating person: ' . $e->getMessage());
        }
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
