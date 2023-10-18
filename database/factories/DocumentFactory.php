<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Document>
 */
class DocumentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => 'Dokument - ' . rand(1, 50),
            'user_id' => 1,
            // Nieje asi v gite treba ho teda manualne vlozit don...
            'image' => 'documents/Zivotopis-Jul2023.pdf',
        ];
    }
}
