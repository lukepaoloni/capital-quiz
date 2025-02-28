<?php

namespace App\Domain\Quiz;

use App\Domain\Country\Contracts\CountryProviderInterface;
use App\Domain\Country\Exceptions\CountryProviderException;
use App\Domain\Quiz\DataObjects\AnswerCheck;

class AnswerChecker
{
    public function __construct(protected CountryProviderInterface $countryProvider)
    {
    }

    /**
     * Check if the provided answer is correct.
     *
     * @param string $userCapitalAnswer
     * @param string $countryQuestion
     * @return AnswerCheck
     * @throws CountryProviderException
     */
    public function check(string $userCapitalAnswer, string $countryQuestion): AnswerCheck
    {
        $country = $this->countryProvider->getByIsoCode($countryQuestion);
        return new AnswerCheck(
            isCorrect: $userCapitalAnswer === $country['capital'],
            correctAnswer: $country['capital'],
        );
    }
}
