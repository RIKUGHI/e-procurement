<?php

namespace Database\Seeders;

use App\Enums\RoleEnum;
use App\Models\Product;
use App\Models\User;
use Carbon\Carbon;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
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
            'email' => 'admin@example.com',
            'role' => RoleEnum::ADMIN
        ]);

        User::factory()->create([
            'name' => 'Vendor 1',
            'email' => 'vendor1@example.com',
            'approved_at' => Carbon::now(),
            'role' => RoleEnum::VENDOR
        ]);

        User::factory()->create([
            'name' => 'Vendor 2',
            'email' => 'vendor2@example.com',
            'approved_at' => Carbon::now(),
            'role' => RoleEnum::VENDOR
        ]);

        Product::factory(5)->create();
    }
}
