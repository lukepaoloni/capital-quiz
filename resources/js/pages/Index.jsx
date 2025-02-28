import { CircleAlert } from "lucide-react";
import { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert.jsx";
import SkeletonCard from "@/components/skeleton-card.jsx";
import Quiz from "@/components/quiz.jsx";

export default function Index() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isQuestionLoading, setIsQuestionLoading] = useState(false);
    const [error, setError] = useState();
    const [question, setQuestion] = useState();
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);

    useEffect( () => {
        const fetchQuestion = async () => {
            try {
                setIsQuestionLoading(true);
                const response = await fetch('/api/v1/quiz/question');
                if (!response.ok) {
                    const errorText = response.headers.get('content-type')?.includes('application/json')
                        ? (await response.json())?.error
                        : `${response.status}: ${response.statusText}`;

                    throw new Error(errorText || 'Failed to retrieve question.');
                }
                const result = await response.json();
                setQuestion(result.data.question);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsQuestionLoading(false);
            }
        }

        fetchQuestion();
    }, [] );

    const submitAnswer = async (guess, country) => {
        setIsSubmitting(true);
        try {
            const response = await fetch(`/api/v1/quiz/answer`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ guess, country }),
            });

            if (!response.ok) {
                const errorText = response.headers.get('content-type')?.includes('application/json')
                    ? (await response.json())?.error
                    : `${response.status}: ${response.statusText}`;

                throw new Error(errorText || 'Failed to submit answer.');
            }

            return await response.json();
        } finally {
            setIsSubmitting(false);
        }
    };

    const onSubmit = async (guess, country) => {
        try {
            const result = await submitAnswer(guess, country);
            setIsAnswerCorrect(result.data?.answer === 'correct');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="flex flex-col justify-between items-center w-screen h-screen p-16">
            <h1 className="text-4xl font-black pb-8">Capital Quiz</h1>
            <div className="flex flex-col items-center justify-center w-full mb-auto max-w-xl gap-y-4">
                {error && (
                    <Alert variant="destructive">
                        <CircleAlert className="h-4 w-4" />
                        <AlertTitle>Whoops!</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
                {
                    isQuestionLoading ?
                        <SkeletonCard />
                        :
                        <Quiz question={question}
                              onSubmit={onSubmit}
                              isSubmitting={isSubmitting}
                              isAnswerCorrect={isAnswerCorrect}
                        />
                }
            </div>
        </div>
    )
}
