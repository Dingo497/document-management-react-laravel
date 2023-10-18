<?php

namespace App\Http\Controllers;

use App\Http\Requests\AuthRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;

class AuthController extends Controller
{
    /**
     * @param AuthRequest $request
     * @return JsonResponse
     */
    public function register(AuthRequest $request): JsonResponse {
        $data = $request->validated();

        User::create([
            'email' => $data['email'],
            'name' => $data['name'],
            'password' => bcrypt($data['password'])
        ]);

        return $this->login($request);
    }


    /**
     * @param AuthRequest $request
     * @return jsonResponse
     */
    public function login(AuthRequest $request): jsonResponse {
        $data = $request->validated();

        if (!Auth::attempt($data)) {
            return response()->json([
                'status' => 'error',
                'errors' => ['error' => ['The provided credentials are not correct']]
            ], 422);
        }

        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;

        // Cookie s tokenom. Potrebny pre refresh webu react aplikacie
        // Mohol som cely Auth spravit tymto stylom...
        $cookie = cookie(
            'auth_token',
            $token,
            6 * 30,
            null,
            null,
            false,
            true
        );

        return response()->json([
            'status' => 'success',
            'data' => [
                'user' => $user,
            ],
            'token' => $token
        ])->cookie($cookie);
    }


    /**
     * @return JsonResponse
     */
    public function getUser(): JsonResponse {
        $user = Auth::user();
        return response()->json([
            'status' => 'success',
            'data' => [
                'user' => $user,
            ],
        ]);
    }


    /**
     * @return JsonResponse
     */
    public function logout(): JsonResponse {
        $user = Auth::user();
        $user->tokens()->delete();

        $cookie = Cookie::forget('auth_token');

        return response()->json(['status' => 'success'])->withCookie($cookie);
    }
}
