<?php

use App\Models\Document;
use App\Models\Tag;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('document_tag', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Document::class, 'document_id');
            $table->foreignIdFor(Tag::class, 'tag_id');
            $table->unique(['document_id', 'tag_id']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('document_tag');
    }
};
