<?php

namespace App\Domain\Country\Contracts;

use App\Domain\Country\Exceptions\CountryProviderException;
use Illuminate\Support\Collection;

interface CountryProviderInterface
{
    /**
     * @return Collection
     * @throws CountryProviderException
     */
    public function getAll(): Collection;
}
