<?php

namespace App\Http\Controllers\Product;

use Inertia\Inertia;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::latest()->get();
        return Inertia::render('Product/ProductPage', [
            'products' => $products,
        ]);
    }

    public function create()
    {
        return Inertia::render('Product/Partials/AddProduct');

    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => ['required', 'max:255'],
            'stock' => ['required', 'numeric'],
            'description' => ['required'],
            'price' => ['required', 'numeric'],
            'is_active' => ['required', 'boolean']
        ]);

        try {
            if ($request->hasFile('product_image')) {
                // Store new image in public path
                $imageName = time() . '.' . $request->product_image->extension();
                $request->product_image->move(public_path('product_images'), $imageName);
                $validatedData['product_images'] = 'product_images/' . $imageName;
            }

            Product::create($validatedData);
            return redirect()->route('product.index')->with('success', 'Berhasil Menambahkan Produk Baru');
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        }
    }

    public function show(Product $product)
    {
        return Inertia::render('Product/Partials/ShowProduct', [
            'product' => $product,
        ]);
    }

    public function edit(Product $product)
    {
        return Inertia::render('Product/Partials/EditProduct', [
            'product' => $product,
        ]);
    }

    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'stock' => 'required|integer',
            'product_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'price' => 'required|numeric',
            'description' => 'nullable|string',
            'is_active' => 'required|boolean',
        ]);

        try {
            // Update the product attributes
            $product->name = $validated['name'];
            $product->stock = $validated['stock'];
            $product->price = $validated['price'];
            $product->description = $validated['description'];
            $product->is_active = $validated['is_active'];
    
            // Handle product image upload if provided
            if ($request->hasFile('product_image')) {
                // Delete old image if it exists
                if ($product->product_image && file_exists(public_path($product->product_image))) {
                    unlink(public_path($product->product_image));
                }
    
                // Store new image in public path
                $imageName = time() . '.' . $request->product_image->extension();
                $request->product_image->move(public_path('product_images'), $imageName);
                $product->product_image = 'product_images/' . $imageName;
            }
    
            $product->save();
    
            // Redirect with success message on successful update
            return redirect()->route('product.index')->with('success', 'Berhasil Mengubah Produk');
        } catch (\Exception $e) {
            // Handle exceptions and return errors in the correct format
            return back()->withErrors(['error' => $e->getMessage(), 422]);
        }
    }
    

    public function destroy(Product $product)
    {
        try {
            $product->delete();
            
            return response()->json(['message' => 'Berhasil menghapus produk'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }
}
