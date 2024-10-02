<?php

namespace App\Http\Controllers;

use App\Enums\RoleEnum;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $unapprovedVendors = User::where('role', RoleEnum::VENDOR)
            ->whereNull('approved_at')
            ->get();

        return Inertia::render('Dashboard', [
            'unapprovedVendors' => $unapprovedVendors,
        ]);
    }

    public function approve()
    {
        $validator = Validator::make(Request::all(), [
            'user_id' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return abort(403, 'invalid parameter.');
        }

        $params = Request::only('user_id');

        $flashMessage = [
            'status' => 'success',
            'message' => 'Vendor berhasil disetujui.',
        ];

        $unapprovedVendor = User::where('role', RoleEnum::VENDOR)
            ->whereNull('approved_at')
            ->where('id', $params['user_id'])
            ->first();

        if ($unapprovedVendor) {
            $unapprovedVendor->update([
                'approved_at' => Carbon::now(),
            ]);
        } else {
            $flashMessage = [
                'status' => 'error',
                'message' => 'Vendor tidak ditemukan atau sudah disetujui',
            ];
        }

        return Redirect::route('dashboard')->with(['flash' => $flashMessage]);
    }
}
