import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Loader2 } from "lucide-react";
import { useState } from "react";


export default function Quiz({ question, onSubmit, isSubmitting, isAnswerCorrect, correctAnswer, hasAttempted, feedback, onTryAgain, isQuestionLoading }) {
    const [guess, setGuess] = useState('');

    if (!question) {
        return <p>Please contact support.</p>
    }

    const ContextualSubmitBtn = () => {
        if (hasAttempted) {
            return (
                <Button className="w-full" disabled={guess === ''} onClick={onTryAgain}>
                    {isQuestionLoading ? <Loader2 className="animate-spin" /> : 'Try again...'}
                </Button>
            );
        }

        return (
            <Button className="w-full" disabled={guess === ''} onClick={() => onSubmit(guess, question.country)}>
                {isSubmitting ? (
                    <>
                        <span>Checking your answer...</span>
                        <Loader2 className="animate-spin" />
                    </>
                ) : (
                    <span>Submit</span>
                )}
            </Button>
        )
    }

    return (
        <Card className="w-full mb-32">
            <CardHeader>
                <CardTitle>{question.title}</CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="flex flex-col space-y-2">
                    {question.answers.map(answer => {
                        let classNames = 'bg-gray-50/75 w-full justify-start px-4 py-6';
                        if (hasAttempted && !isAnswerCorrect && guess === answer) {
                            classNames += ' bg-red-600 hover:bg-red-600 hover:text-white text-white' +
                                ' disabled:!opacity-100';
                        } else if (hasAttempted && correctAnswer === answer) {
                            classNames += ' bg-green-600 hover:bg-green-600 hover:text-white text-white' +
                                ' disabled:!opacity-100';
                        } else if (guess === answer) {
                            classNames += ' bg-primary/90 hover:bg-primary/90 hover:text-white text-white';
                        }
                        return (
                            <li>
                                <Button variant="ghost"
                                        className={classNames}
                                        onClick={() => setGuess(answer)}
                                        disabled={hasAttempted}
                                >
                                    <span>{answer}</span>
                                </Button>
                            </li>
                        )
                    })}
                </ul>
            </CardContent>
            <CardFooter>
                <div className="flex flex-col space-y-4 w-full">
                    <ContextualSubmitBtn />
                    {feedback && <p className={`text-sm ${isAnswerCorrect ? 'text-green-600' : 'text-red-600'}`}>{feedback}</p>}
                </div>
            </CardFooter>
        </Card>
    )
}
