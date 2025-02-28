<?php

namespace App\Domain\Country\Providers;

use App\Domain\Country\Contracts\CountryProviderInterface;
use App\Domain\Country\Exceptions\CountryProviderException;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\Client\RequestException;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Http;

class CountriesNowApiProvider implements CountryProviderInterface
{
    /**
     * @inheritDoc
     */
    public function getAll(): Collection
    {
        try {
            return Http::retry(3, 300)
                ->get('https://countriesnow.space/api/v0.1/countries/capital')
                ->throwUnlessStatus(200)
                ->collect('data');
        } catch (RequestException|ConnectionException $ex) {
            throw new CountryProviderException('API request failed: ' . $ex->getMessage());
        }
    }

    public function getByIsoCode(string $isoCode): array
    {
        return $this->getAll()->where('iso2', $isoCode)->first();
    }
}
