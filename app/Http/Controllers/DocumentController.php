<?php

namespace App\Http\Controllers;

use App\Models\Document;
use App\Http\Requests\StoreDocumentRequest;
use App\Http\Requests\UpdateDocumentRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class DocumentController extends Controller {
    /**
     * Display a listing of the resource.
     */
    public function index(): jsonResponse {
        $user = Auth::user();
        return response()->json([
            'status' => 'success',
            'data' => [
                'documents' => $user->documents(),
            ],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
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

    /**
     * Display the specified resource.
     */
    public function show(Document $document): jsonResponse {
        // TODO show len pre prihlaseneho
        return response()->json([
            'status' => 'success',
            'data' => [
                'document' => $document,
            ],
        ]);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDocumentRequest $request, Document $document)
    {
        // TODO dokoncim ked budem mat image upadte
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Document $document): jsonResponse {
        // TODO delete len pre prihlaseneho
        $document->delete();
        return response()->json([
            'status' => 'success',
        ]);
    }
}
