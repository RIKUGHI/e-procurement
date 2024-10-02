<?php

namespace App\Enums;

enum RoleEnum: string
{
    case ADMIN = 'ADMIN';
    case VENDOR = 'VENDOR';

    public function isAdmin(): bool
    {
        return $this === self::ADMIN;
    }

    public function isVendor(): bool
    {
        return $this === self::VENDOR;
    }
}
