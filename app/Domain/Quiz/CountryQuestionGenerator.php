<?php

namespace App\Domain\Quiz;

use App\Domain\Country\Contracts\CountryProviderInterface;
use App\Domain\Country\Exceptions\CountryProviderException;
use App\Domain\Quiz\DataObjects\Question;
use Illuminate\Support\Arr;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Session;
use Random\RandomException;

class CountryQuestionGenerator
{
    public function __construct(protected CountryProviderInterface $countryProvider)
    {
    }

    /**
     * @return Question
     * @throws RandomException
     * @throws CountryProviderException
     */
    public function randomQuestion(): Question
    {
        $shownCapitals = Session::get('capitalsShown', []);
        /** @var Collection $capitals */
        $capitals = Cache::rememberForever('capitals', function () {
            return $this->countryProvider->getAll();
        });

        if (count($shownCapitals) === $capitals->count()) {
            Session::remove('capitalsShown');
            $shownCapitals = [];
        }

        $randomCapital = null;
        do {
            $randomCapital = Arr::random($capitals->toArray());
            if (in_array($randomCapital['capital'], $shownCapitals)) {
                $randomCapital = null;
            }
        } while(!$randomCapital);

        $capitalsWithoutRandomCapital = $capitals->filter(fn ($capital) => $capital['iso2'] !== $randomCapital['iso2']);
        $otherAnswers = collect(Arr::random($capitalsWithoutRandomCapital->toArray(), 2))->pluck('capital');

        $question = __('quiz.question', ['country' => $randomCapital['name']]);
        $allAnswers = [$randomCapital['capital'], ...$otherAnswers];
        $this->_randomiseCorrectAnswerPosition($allAnswers, 0);

        return new Question(
            title: $question,
            answers: $allAnswers,
            country:  $randomCapital['iso2'],
        );
    }
    /**
     * @throws RandomException
     */
    protected function _randomiseCorrectAnswerPosition($answers, $correctAnswerIndex): void
    {
        $toIndex = random_int(0, 2);
        $out = array_splice($answers, $correctAnswerIndex, 1);
        array_splice($answers, $toIndex, 0, $out);
    }
}
