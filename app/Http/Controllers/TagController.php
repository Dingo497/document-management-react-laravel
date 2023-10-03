<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use App\Http\Requests\StoreTagRequest;
use Illuminate\Http\JsonResponse;

class TagController extends Controller {
    public function index(): jsonResponse {
        return response()->json([
            'status' => 'success',
            'data' => [
                'tags' => Tag::all(),
            ],
        ]);
    }

    public function store(StoreTagRequest $request) : jsonResponse {
        $tag = $request->validated();
        Tag::create($tag);

        return response()->json([
            'status' => 'success',
            'data' => [
                'tags' => $tag,
            ],
        ]);
    }

    public function show(Tag $tag): JsonResponse {
        return response()->json([
            'status' => 'success',
            'data' => [
                'tag' => $tag,
            ],
        ]);
    }

    public function destroy(Tag $tag): JsonResponse {
        $tag->delete();
        return response()->json([
            'status' => 'success',
        ]);
    }
}
