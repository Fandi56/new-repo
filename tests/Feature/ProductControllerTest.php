<?php

namespace Tests\Unit\Controllers\Product;

use Tests\TestCase;
use App\Models\User;
use App\Models\Product;
use Illuminate\Http\UploadedFile;
use Inertia\Testing\AssertableInertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ProductControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_index_method_returns_view_with_products()
    {
        $products = Product::factory()->count(3)->create();
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->get(route('product.index'));

        $response->assertStatus(200);
        $response->assertInertia(function (AssertableInertia $page) use ($products) {
            $page->component('Product/ProductPage') // Ensure the component is correct
                ->has('products', 3); // Ensure the products prop exists and has the correct number of items

            // Optionally, you can also check if specific product attributes are present
            foreach ($products as $index => $product) {
                $page->where("products.$index.id", $product->id)
                    ->where("products.$index.name", $product->name);
            }
        });
    }

    public function test_create_method_returns_view()
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->get(route('product.create'));

        $response->assertStatus(200);
        $response->assertInertia(function (AssertableInertia $page) {
            $page->component('Product/Partials/AddProduct');
        });
    }


    public function test_store_method_creates_new_product()
    {
        Storage::fake('public');
        $user = User::factory()->create();

        $data = [
            'name' => 'Test Product',
            'stock' => 10,
            'description' => 'This is a test product',
            'price' => 9.99,
            'is_active' => true,
        ];

        $response = $this
            ->actingAs($user)
            ->post(route('product.store'), $data);

        $response->assertStatus(302);
        $response->assertRedirect(route('product.index'));
        $this->assertDatabaseHas('products', ['name' => 'Test Product']);
    }

    public function test_show_method_returns_view_with_product()
    {
        $product = Product::factory()->create();
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->get(route('product.show', $product));

        $response->assertStatus(200);
        $response->assertInertia(function (AssertableInertia $page) use ($product) {
            $page->component('Product/Partials/ShowProduct')
                ->has('product', function ($page) use ($product) {
                    $page->where('id', $product->id)
                        ->where('name', $product->name)
                        ->etc();
                });
        });
    }

    public function test_edit_method_returns_view_with_product()
    {
        $product = Product::factory()->create();
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->get(route('product.edit', $product));

        $response->assertStatus(200);
        $response->assertInertia(function (AssertableInertia $page) use ($product) {
            $page->component('Product/Partials/EditProduct')
                ->has('product', function ($page) use ($product) {
                    $page->where('id', $product->id)
                        ->where('name', $product->name)
                        ->etc();
                });
        });
    }

    public function test_update_method_updates_product()
    {
        Storage::fake('public');
        $product = Product::factory()->create();
        $user = User::factory()->create();

        $data = [
            'name' => 'Updated Product',
            'stock' => 20,
            'description' => 'This is an updated product',
            'price' => 19.99,
            'is_active' => false,
        ];

        $response = $this
            ->actingAs($user)
            ->put(route('product.update', $product), $data);

        $response->assertStatus(302);
        $response->assertRedirect(route('product.index'));
        $this->assertDatabaseHas('products', ['name' => 'Updated Product']);
    }

    public function test_destroy_method_deletes_product()
    {
        $product = Product::factory()->create();
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->delete(route('product.destroy', $product));

        $response->assertStatus(200);
    }
}