<?php

use App\Domain\Country\Exceptions\CountryProviderException;
use App\Domain\Quiz\CountryQuestionGenerator;

describe('Quiz Question Endpoint', function () {
    it('returns a random country with three capital options', function () {
        $response = $this->get('/api/v1/quiz/question');
        $response->assertSuccessful();

        expect($response->json('data.question.answers'))->toHaveCount(3)
            ->and($response->json('data.question.country'))
            ->not()
            ->toBeEmpty();
    });

    it('returns different countries on subsequent requests', function () {
        $questionOne = $this->get('/api/v1/quiz/question')
            ->json('data.question.country');

        $questionTwo = $this->get('/api/v1/quiz/question')
            ->json('data.question.country');

        expect($questionOne)->not()->toBe($questionTwo);
    });

    it('returns answers that are unique', function () {
        $answers = $this->get('/api/v1/quiz/question')->json('data.question.answers');

        $countOfAnswers = count($answers);
        $uniqueAnswers = collect($answers)->unique()->count();

        expect($uniqueAnswers)->toBe($countOfAnswers);
    });

    it('handles external api errors gracefully', function () {
        $this->mock(CountryQuestionGenerator::class, function ($mock) {
            $mock->shouldReceive('randomQuestion')
                ->andThrow(new CountryProviderException('Service temporarily unavailable.'));
        });

        $response = $this->get('/api/v1/quiz/question');

        $error = $response->json('error');
        $message = $response->json('data.message');

        expect($error)->toBeTrue()->and($message)->toEqual('Service temporarily unavailable.');
    });
});

