<?php

namespace App\Http\Controllers;

use App\Http\Resources\DocumentResource;
use App\Models\Document;
use App\Http\Requests\StoreDocumentRequest;
use App\Http\Requests\UpdateDocumentRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class DocumentController extends Controller {
    private int $perPage = 10;

    /**
     * Ziskanie poctu stranok urcene pre zobrazenie strankovanie
     * @return JsonResponse
     */
    public function getTotalUserDocumentsCount(): jsonResponse {
        $user = Auth::user();
        $totalUserDocumentsCount = $user->documents()->count();
        $paginationCount = ceil($totalUserDocumentsCount / $this->perPage);

        return response()->json([
            'status' => 'success',
            'data' => [
                'documentsPagination' => $paginationCount,
            ],
        ]);
    }

    public function index(Request $request): jsonResponse {
        $page = $request->input('page', 1);
        $skip = ($page - 1) * $this->perPage;
        $user = Auth::user();
        $userDocumentsWithTags = $user->documents()
                                      ->with('tags')
                                      ->skip($skip)
                                      ->take($this->perPage)
                                      ->get();

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

    public function update(UpdateDocumentRequest $request, Document $document): jsonResponse {
        $editedDocument = $request->validated();

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $path = $file->store('documents');
            $editedDocument['image'] = $path;
        }

        $document->update([
            'name' => $editedDocument['name'],
            'image' => $editedDocument['image'] ?? $document->image
        ]);

        if ($editedDocument['tags']) {
            $tagIds = $editedDocument['tags'];
            $document->tags()->sync($tagIds);
        }

        $userDocumentsWithTags = Document::where('id', $document->id)->with('tags')->get();

        return response()->json([
            'status' => 'success',
            'data' => [
                'documents' => DocumentResource::collection($userDocumentsWithTags),
            ],
        ]);
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
