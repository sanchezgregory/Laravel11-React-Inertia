<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * @property int $id
     * @property string $name
     * @property string $email
     * @property DateTime $created_at
     */
    public function toArray(Request $request): array
    {
        $array = parent::toArray($request);

        return [
            'id' => $array['id'],
            'name' => $array['name'],
            'email' => $array['email'],
            'created_at' => (new Carbon($array['created_at']))->format('Y-m-d'),
        ];
    }
}
