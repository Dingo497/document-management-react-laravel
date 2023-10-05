<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Tag extends Model {
    use HasFactory;

    protected $fillable = [
        'name',
        'user_id',
    ];

    protected $visible = [
        'id', 'name'
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function documents() {
        return $this->belongsToMany(Document::class);
    }
}
