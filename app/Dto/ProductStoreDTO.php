<?php

namespace App\Dto;

use App\Http\Requests\ProductStoreRequest;

class ProductStoreDTO
{
    public function __construct(
        public readonly string $name,
        public readonly int $price,
    ) {}

    public static function fromAppRequest(ProductStoreRequest $request)
    {
        return new self(
            name: $request->validated('name'),
            price: $request->validated('price'),
        );
    }
}
