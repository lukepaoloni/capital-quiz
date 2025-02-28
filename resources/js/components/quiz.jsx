import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Loader2 } from "lucide-react";
import { useState } from "react";


export default function Quiz({ question, onSubmit, isSubmitting, isAnswerCorrect }) {
    const [guess, setGuess] = useState('');

    if (!question) {
        return <p>Please contact support.</p>
    }

    return (
        <Card className="w-full mb-32">
            <CardHeader>
                <CardTitle>{question.title}</CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="flex flex-col space-y-2">
                    {question.answers.map(answer => (
                        <li>
                            <Button variant="ghost"
                                    className={`bg-gray-50/75 w-full justify-start px-4 py-6${guess === answer ? ' bg-primary/90 hover:bg-primary/90 hover:text-white text-white' : ''}`}
                                    onClick={() => setGuess(answer)}
                            >
                                <span>{answer}</span>
                            </Button>
                        </li>
                    ))}
                </ul>
            </CardContent>
            <CardFooter>
                <Button className="w-full" disabled={guess === ''} onClick={() => onSubmit(guess, question.countryIsoCode)}>
                    {isSubmitting ? (
                        <>
                            <span>Checking your answer...</span>
                            <Loader2 className="animate-spin" />
                        </>
                    ) : (
                        <span>Submit</span>
                    )}
                </Button>
            </CardFooter>
        </Card>
    )
}
