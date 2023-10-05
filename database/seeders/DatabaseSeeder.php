<?php

namespace Database\Seeders;

use App\Models\Document;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void {
        User::factory()->count(1)->create();

        for ($i = 0; $i < 3; $i++) {
            $document = Document::factory()->create();
            for ($j = 0; $j < 2; $j++) {
                $tag = Tag::factory()->create();
                $document->tags()->attach($tag);
            }
        }
    }
}
