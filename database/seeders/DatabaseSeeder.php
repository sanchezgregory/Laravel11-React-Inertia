<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Database\Factories\ProjectFactory;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@admin.com',
            'password' => bcrypt('admin'),
            'email_verified_at' => now(),
        ]);
        User::factory()->create([
            'name' => 'Admin2',
            'email' => 'admi2n@admin.com',
            'password' => bcrypt('admin'),
            'email_verified_at' => now(),
        ]);

        Project::factory(30)->hasTasks(10)->create();
    }
}
