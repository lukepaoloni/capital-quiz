<?php

namespace App\Domain\Quiz\DataObjects;

final readonly class Question
{
    public function __construct(
        public string $title,
        public array  $answers,
        public string $country
    ) { }
}
