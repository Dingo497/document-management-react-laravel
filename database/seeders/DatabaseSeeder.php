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
        User::factory()->count(2)->create();

        for ($i=0; $i < 2; $i++) {
            DB::table('document_tag')->insert(
                [
                    'document_id' => Document::factory()->create()->id,
                    'tag_id' => Tag::factory()->create()->id,
                ]
            );
        }
    }
}
