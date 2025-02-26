import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export default function Index() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isCitiesLoading, setIsCitiesLoading] = useState(false);
    const [city, setCity] = useState('');
    const onSubmit = (values) => {
        console.log('values', values);
        setIsSubmitting(true);
    }

    return (
        <div className="flex flex-col justify-between items-center w-screen h-screen p-16">
            <h1 className="text-4xl font-black pb-8">Capital Quiz</h1>
            <div className="flex flex-col items-center justify-center w-full my-auto">
                <Card className="max-w-xl w-full mb-32">
                    <CardHeader>
                        <CardTitle>What is the capital city of United Kingdom?</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="flex flex-col space-y-2">
                            <li>
                                <Button variant="ghost" className={`bg-gray-50/75 w-full justify-start px-4 py-6${city === 'London' ? ' bg-primary/90 hover:bg-primary/90 hover:text-white text-white' : ''}`} onClick={() => setCity('London')}>
                                    <span>London</span>
                                </Button>
                            </li>
                            <li>
                                <Button variant="ghost" className={`bg-gray-50/75 w-full justify-start px-4 py-6${city === 'Sheffield' ? ' bg-primary/90 hover:bg-primary/90 hover:text-white text-white' : ''}`} onClick={() => setCity('Sheffield')}>
                                    <span>Sheffield</span>
                                </Button>
                            </li>
                            <li>
                                <Button variant="ghost" className={`bg-gray-50/75 w-full justify-start px-4 py-6${city === 'York' ? ' bg-primary/90 hover:bg-primary/90 hover:text-white text-white' : ''}`} onClick={() => setCity('York')}>
                                    <span>York</span>
                                </Button>
                            </li>
                            <li>
                                <Button variant="ghost" className={`bg-gray-50/75 w-full justify-start px-4 py-6${city === 'Glasgow' ? ' bg-primary/90 hover:bg-primary/90 hover:text-white text-white' : ''}`} onClick={() => setCity('Glasgow')}>
                                    <span>Glasgow</span>
                                </Button>
                            </li>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" disabled={city === ''} onClick={onSubmit}>
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
            </div>
        </div>
    )
}
