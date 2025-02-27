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
                <CardTitle>What is the capital city of United Kingdom?</CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="flex flex-col space-y-2">
                    <li>
                        <Button variant="ghost" className={`bg-gray-50/75 w-full justify-start px-4 py-6${guess === 'London' ? ' bg-primary/90 hover:bg-primary/90 hover:text-white text-white' : ''}`} onClick={() => setGuess('London')}>
                            <span>London</span>
                        </Button>
                    </li>
                    <li>
                        <Button variant="ghost" className={`bg-gray-50/75 w-full justify-start px-4 py-6${guess === 'Sheffield' ? ' bg-primary/90 hover:bg-primary/90 hover:text-white text-white' : ''}`} onClick={() => setGuess('Sheffield')}>
                            <span>Sheffield</span>
                        </Button>
                    </li>
                    <li>
                        <Button variant="ghost" className={`bg-gray-50/75 w-full justify-start px-4 py-6${guess === 'York' ? ' bg-primary/90 hover:bg-primary/90 hover:text-white text-white' : ''}`} onClick={() => setGuess('York')}>
                            <span>York</span>
                        </Button>
                    </li>
                    <li>
                        <Button variant="ghost" className={`bg-gray-50/75 w-full justify-start px-4 py-6${guess === 'Glasgow' ? ' bg-primary/90 hover:bg-primary/90 hover:text-white text-white' : ''}`} onClick={() => setGuess('Glasgow')}>
                            <span>Glasgow</span>
                        </Button>
                    </li>
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
