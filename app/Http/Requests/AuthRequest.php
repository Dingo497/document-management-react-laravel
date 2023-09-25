<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class AuthRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array|string>
     */
    public function rules(): array
    {
        if ($this->is('api/register')) {
            return [
                'name' => 'required|string',
                'email' => 'required|email|string|unique:users',
                'password' => [
                    'required',
                    'confirmed',
                    // Password::min(8)->mixedCase()->numbers()->symbols() // neskor odkomentovat
                    Password::min(4)
                ]
            ];
        } elseif ($this->is('api/login')) {
            return [
                'email' => 'required|email|string|exists:users,email',
                'password' => 'required',
            ];
        }
    }
}
