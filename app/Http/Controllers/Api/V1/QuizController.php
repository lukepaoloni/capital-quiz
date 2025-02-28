<?php

namespace App\Http\Controllers\Api\V1;

use App\Domain\Country\Exceptions\CountryProviderException;
use App\Domain\Quiz\CountryQuestionGenerator;
use App\Http\Controllers\Controller;
use Illuminate\Http\Client\RequestException;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

class QuizController extends Controller
{
    public function __construct(protected CountryQuestionGenerator $questionGenerator)
    {
    }

    public function showRandomQuestion(): JsonResponse
    {
        try {
            $randomQuestion = $this->questionGenerator->randomQuestion();
            return response()->json([
                'error' => false,
                'data' => ['question' => $randomQuestion]
            ]);
        } catch (CountryProviderException $ex) {
            Log::error($ex->getMessage(), ['trace' => $ex->getTraceAsString()]);
            return response()->json(['error' => true, 'data' => ['message' => $ex->getMessage()]]);
        } catch (\Exception $ex) {
            Log::critical($ex->getMessage(), ['trace' => $ex->getTraceAsString()]);
            return response()->json(['error' => true, 'data' => ['message' => 'Something fatally went wrong.']]);
        }
    }

    public function checkAnswer()
    {
        return response()->json();
    }
}
