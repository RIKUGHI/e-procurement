<?php

namespace App\Services;

use App\Dto\ProductStoreDTO;
use App\Dto\ProductUpdateDTO;
use App\Models\Product;
use Error;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class ProductService
{
    public function store(ProductStoreDTO $dto)
    {
        $user = Auth::user();

        if (! $user->role->isVendor()) {
            throw new Error('Pengguna bukan vendor');
        }

        Product::create([
            'name' => Str::trim($dto->name),
            'price' => $dto->price,
            'user_id' => $user->id,
        ]);
    }

    public function update(Product $workUnit, ProductUpdateDTO $dto)
    {
        $workUnit->update([
            'name' => Str::trim($dto->name),
            'price' => $dto->price,
            'user_id' => Auth::user()->id,
        ]);
    }

    public function destroy(Product $product)
    {
        $product->delete();
    }
}
