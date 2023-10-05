<?php

namespace App\Http\Controllers;

use App\Http\Resources\DocumentResource;
use App\Models\Document;
use App\Http\Requests\StoreDocumentRequest;
use App\Http\Requests\UpdateDocumentRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class DocumentController extends Controller {

    public function index(): jsonResponse {
        $user = Auth::user();
        $userDocumentsWithTags = $user->documents()->with('tags')->get();


        return response()->json([
            'status' => 'success',
            'data' => [
                'documents' => DocumentResource::collection($userDocumentsWithTags),
            ],
        ]);
    }

    public function store(StoreDocumentRequest $request): jsonResponse {
        $document = $request->validated();

        $file = $request->file('image');
        $path = $file->store('documents');

        $newDocument = Document::create([
            'image' => $path,
            'user_id' => $document['user_id'],
            'name' => $document['name']
        ]);

        $tagIds = $document['tags'];
        $newDocument->tags()->sync($tagIds);
        $userDocumentsWithTags = Document::where('id', $newDocument->id)->with('tags')->get();

        return response()->json([
            'status' => 'success',
            'data' => [
                'documents' => DocumentResource::collection($userDocumentsWithTags),
            ],
        ]);
    }

    public function show(Document $document): jsonResponse {
        return response()->json([
            'status' => 'success',
            'data' => [
                'document' => $document,
            ],
        ]);
    }

    public function update(UpdateDocumentRequest $request, Document $document) {
        // TODO dokoncim ked budem mat image update
    }

    public function destroy(Document $document): jsonResponse {
        $document->delete();
        return response()->json([
            'status' => 'success',
        ]);
    }

    public function download($filename) {
        $path = storage_path("app/documents/{$filename}");

        if (!Storage::exists($path)) {
            abort(404);
        }

        return response()->download($path, $filename, [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => 'inline; filename="' . $filename . '"',
        ]);
    }
}
