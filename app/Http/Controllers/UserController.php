<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = User::query();
        $sortFields = request('sort_field', 'created_at');
        $sortDirection = request('sort_direction', 'desc');

        $users = $query->orderBy($sortFields, $sortDirection)->paginate(10)->onEachSide(1);

        if(request('name')) {
            $query->where('name', 'like', '%' . request('name') . '%');
            $users = $query->paginate(10)->onEachSide(1);
        }
        if(request('email')) {
            $query->where('email', request('status'));
            $users = $query->paginate(10)->onEachSide(1);
        }

        return inertia('User/Index', [
            'users' => UserResource::collection($users),
            'queryParams' => request()->query() ?? null,
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('User/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $fields = $request->validated();
        $fields['password'] = bcrypt($fields['password']);
        User::create($fields);
        return to_route('user.index')->with('success', 'User created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        return inertia('User/Edit', [
            'user' => new UserResource($user),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $fields = $request->validated();
        $password = $fields['password'] ?? null;
        if ($password) {
            $fields['password'] = bcrypt($password);
        } else {
            unset($fields['password']);
        }
        $user->update($fields);

        return to_route('user.index')->with('success', 'User updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();
        return to_route('user.index')->with('success', 'User deleted successfully');
    }
}
