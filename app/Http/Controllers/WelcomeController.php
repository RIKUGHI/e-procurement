<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Request;
use Inertia\Inertia;

class WelcomeController extends Controller
{
    public function index()
    {
        $params = Request::only('q');

        return Inertia::render('Welcome', [
            'q' => $params['q'] ?? '',
            'products' => ProductResource::collection(
                Product::with('user')
                    ->orderByDesc('id')
                    ->when($params['q'] ?? false, function (Builder $query, $q) {
                        $query->where('name', 'like', '%'.$q.'%');
                    })
                    ->paginate(8)
                    ->appends(Request::all())
            ),
        ]);
    }
}
