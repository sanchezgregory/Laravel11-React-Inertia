<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use App\Models\Project;
use Inertia\Inertia;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Project::query();
        $sortFields = request('sort_field', 'created_at');
        $sortDirection = request('sort_direction', 'desc');

        $projects = $query->orderBy($sortFields, $sortDirection)->paginate(10)->onEachSide(1);

        if(request('name')) {
            $query->where('name', 'like', '%' . request('name') . '%');
            $projects = $query->paginate(10)->onEachSide(1);
        }
        if(request('status')) {
            $query->where('status', request('status'));
            $projects = $query->paginate(10)->onEachSide(1);
        }

        return inertia('Project/Index', [
            'projects' => ProjectResource::collection($projects),
            'queryParams' => request()->query() ?? null,
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Project/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
    {
        $fields = $request->validated();
        $fields['created_by'] = $request->user()->id;
        $fields['updated_by'] = $request->user()->id;

        if ($request->hasFile('image')) {
            $imageName = time() . '-' . $request->user()->id;
            $fields['image_path'] = $request->file('image')->store('images/' . $imageName, 'public');
        }

        Project::create($fields);

        return to_route('project.index')->with('success', 'Project created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        $query = $project->tasks();
        $sortFields = request('sort_field', 'created_at');
        $sortDirection = request('sort_direction', 'desc');

        if (request('status')) {
            $query->where('status', request('status'));
        }
        if (request('name')) {
            $query->where('name', 'like', '%' . request('name') . '%');
        }

        $tasks = $query->orderBy($sortFields, $sortDirection)->paginate(10)->onEachSide(1);

        return inertia('Project/Show', [
            'project' => new ProjectResource($project),
            'tasks' => TaskResource::collection($tasks),
            'queryParams' => request()->query() ?? null,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
    }
}
