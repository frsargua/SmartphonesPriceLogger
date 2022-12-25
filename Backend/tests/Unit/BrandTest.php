<?php

namespace Tests\Unit;

use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class BrandTest extends TestCase
{

    use WithFaker;

    /**
     * A basic unit test example.
     *
     * @return void
     */
    public function test_it_creates_new_brand()
    {
        $response = $this->postJson('/api/brand',[
        'brand'=>substr($this->faker->company, 0, rand(3, 10))
        ]);

        $response->assertStatus(200);
    }

}
