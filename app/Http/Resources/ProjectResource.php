<?php

namespace App\Http\Resources;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
{
    public static $wrap = false;

    public function toArray(Request $request): array
    {
        $array = parent::toArray($request);

        return [
            'id' => $array['id'],
            'name' => $array['name'],
            'description' => $array['description'],
            'created_at' => (new Carbon($array['created_at']))->format('Y-m-d'),
            'due_date' => (new Carbon($array['due_date']))->format('Y-m-d'),
            'status' => $array['status'],
            'image_path' => $array['image_path'],
            'createdBy' => new UserResource($this->createdBy),
            'updatedBy' => new UserResource($this->updatedBy),
        ];
    }
}
