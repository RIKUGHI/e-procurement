<?php

namespace App\Dto;

use App\Http\Requests\ProductStoreRequest;
use App\Http\Requests\ProductUpdateRequest;

class ProductUpdateDTO
{
    public function __construct(
        public readonly string $name,
        public readonly int $price,
    ) {

    }

    public static function fromAppRequest(ProductUpdateRequest $request)
    {
        return new self(
            name: $request->validated('name'),
            price: $request->validated('price'),
        );
    }
}
