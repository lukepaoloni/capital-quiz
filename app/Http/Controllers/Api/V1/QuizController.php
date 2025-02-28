<?php

namespace App\Http\Controllers\Api\V1;

use App\Domain\Country\Exceptions\CountryProviderException;
use App\Domain\Quiz\AnswerChecker;
use App\Domain\Quiz\CountryQuestionGenerator;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class QuizController extends Controller
{
    public function __construct(
        protected CountryQuestionGenerator $questionGenerator,
        protected AnswerChecker $answerChecker
    ) { }

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
            return response()->json([
                'error' => true,
                'data' => ['message' => $ex->getMessage()]
            ], Response::HTTP_BAD_REQUEST);
        } catch (\Exception $ex) {
            Log::critical($ex->getMessage(), ['trace' => $ex->getTraceAsString()]);
            return response()->json([
                'error' => true,
                'data' => ['message' => 'Something fatally went wrong.']
            ],Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function checkAnswer(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'guess' => 'required|string',
            'country' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => true,
                'data' => ['message' => 'Validation failed', 'errors' => $validator->errors()],
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $guess = $request->input('guess');
        $forCountry = $request->input('country');
        try {
            $answerCheck = $this->answerChecker->check($guess, $forCountry);
            $feedback = $answerCheck->isCorrect ? 'Correct!' : 'Incorrect, try again.';

            return response()->json(['error' => false, 'data' => [
                'isCorrect' => $answerCheck->isCorrect,
                'correctAnswer' => $answerCheck->correctAnswer,
                'feedback' => $feedback,
            ]]);
        } catch (CountryProviderException $ex) {
            Log::error($ex->getMessage(), ['trace' => $ex->getTraceAsString()]);
            return response()->json([
                'error' => true,
                'data' => ['message' => $ex->getMessage()]
            ], Response::HTTP_BAD_REQUEST);
        } catch (\Exception $ex) {
            Log::critical($ex->getMessage(), ['trace' => $ex->getTraceAsString()]);
            return response()->json([
                'error' => true,
                'data' => ['message' => 'Something fatally went wrong.']
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
