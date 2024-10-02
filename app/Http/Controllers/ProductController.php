<?php

namespace App\Http\Controllers;

use App\Dto\ProductStoreDTO;
use App\Dto\ProductUpdateDTO;
use App\Enums\RoleEnum;
use App\Http\Requests\ProductStoreRequest;
use App\Http\Requests\ProductUpdateRequest;
use App\Http\Resources\ProductResource;
use App\Http\Resources\UserResource;
use App\Models\Product;
use App\Models\User;
use App\Services\ProductService;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
  public function __construct(
    protected ProductService $productService
) {
}


    function index()  {
      $params = Request::only('q');

      return Inertia::render('Product/Index', [
          'q' => $params['q'] ?? '',
          'products' => ProductResource::collection(
              Product::when(Auth::user()->role->isVendor(), function(Builder $query){
                $query->where('user_id', Auth::user()->id);
              })
                ->orderByDesc('id')
                  ->when($params['q'] ?? false, function (Builder $query, $q) {
                      $query->where('name', 'like', '%'.$q.'%');
                  })
                  ->paginate(5)
                  ->appends(Request::all())
          ),
      ]);
    }

    public function create(): Response
    {
        if (!Auth::user()->role->isVendor()) {
          return abort(403, 'Forbidden.');
        }

        return Inertia::render('Product/Create', []);
    }

    public function store(ProductStoreRequest $request): RedirectResponse
    {
        if (!Auth::user()->role->isVendor()) {
          return abort(403, 'Forbidden.');
        }

        $flashMessage = [
            'status' => 'success',
            'message' => 'Data baru telah berhasil disimpan.',
        ];

        try {
            $this->productService->store(ProductStoreDTO::fromAppRequest($request));
        } catch (\Throwable $th) {
            $flashMessage = [
                'status' => 'error',
                'message' => 'Terjadi kesalahan saat mencoba menyimpan data || '.$th->getMessage(),
            ];
        }

        return Redirect::route('products.index')->with(['flash' => $flashMessage]);
    }

    public function edit(Product $product)
    {
        if ($product->user_id !== Auth::user()->id) {
          return abort(403, 'Not Found.');
        }

        return Inertia::render('Product/Edit', [
            'product' => new ProductResource($product),
        ]);
    }

    public function update(Product $product, ProductUpdateRequest $request): RedirectResponse
    {
      if ($product->user_id !== Auth::user()->id) {
        return abort(403, 'Not Found.');
      }

        $flashMessage = [
            'status' => 'success',
            'message' => 'Perubahan pada data telah berhasil disimpan.',
        ];

        try {
            $this->productService->update($product, ProductUpdateDTO::fromAppRequest($request));
        } catch (\Throwable $th) {
            $flashMessage = [
                'status' => 'error',
                'message' => 'Terjadi kesalahan saat mencoba memperbarui data || '.$th->getMessage(),
            ];
        }

        return Redirect::route('products.index')->with(['flash' => $flashMessage]);
    }

    public function destroy(Product $product)
    {
        if ($product->user_id !== Auth::user()->id) {
          return abort(403, 'Not Found.');
        }

        $flashMessage = [
            'status' => 'success',
            'message' => 'Data berhasil dihapus.',
        ];

        try {
            DB::transaction(function () use ($product) {
                $this->productService->destroy($product);
            });
        } catch (\Throwable $th) {
            $flashMessage = [
                'status' => 'error',
                'message' => 'Terjadi kesalahan saat menghapus produk || '.$th->getMessage(),
            ];
        }

        return Redirect::route('products.index')->with(['flash' => $flashMessage]);
    }
}
