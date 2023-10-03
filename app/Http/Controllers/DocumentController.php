<?php

namespace App\Http\Controllers;

use App\Models\Document;
use App\Http\Requests\StoreDocumentRequest;
use App\Http\Requests\UpdateDocumentRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class DocumentController extends Controller {

    public function index(): jsonResponse {
        $user = Auth::user();
        return response()->json([
            'status' => 'success',
            'data' => [
                'documents' => $user->documents(),
            ],
        ]);
    }

    public function store(StoreDocumentRequest $request): jsonResponse {
        $document = $request->validated();

       // TODO nahratie obrazka

        Document::create($document);

        return response()->json([
            'status' => 'success',
            'data' => [
                'documents' => $document,
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
}
