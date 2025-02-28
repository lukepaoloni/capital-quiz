<?php

namespace App\Domain\Quiz\DataObjects;

readonly class AnswerCheck
{
    public function __construct(
        public bool   $isCorrect,
        public string $correctAnswer
    ) { }
}
