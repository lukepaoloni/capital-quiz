<?php

namespace App\Providers;

use App\Domain\Country\Contracts\CountryProviderInterface;
use App\Domain\Country\Providers\CountriesNowApiProvider;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(CountryProviderInterface::class, CountriesNowApiProvider::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
    }
}
