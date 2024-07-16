<?php

namespace App\Http\Resources;

use App\Models\User;
use Carbon\Carbon;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
{
    /**
     * @property int $id
     * @property string $name
     * @property string $description
     * @property DateTime $created_at
     * @property DateTime $due_date
     * @property string $status
     * @property string $image_path
     * @property User $createdBy
     * @property User $updatedBy
     */
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
            'created_by' => new UserResource($array['created_by']),
            'updated_by' => new UserResource($array['updated_by']),
        ];
    }
}
