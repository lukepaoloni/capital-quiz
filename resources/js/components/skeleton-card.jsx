import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card.jsx";
import { Skeleton } from "@/components/ui/skeleton.jsx";
import { Button } from "@/components/ui/button.jsx";


export default function SkeletonCard() {
    return (
        <Card className="w-full mb-32">
            <CardHeader>
                <Skeleton className="h-[16px] w-full rounded" />
            </CardHeader>
            <CardContent>
                <ul className="flex flex-col space-y-2">
                    {Array.from(Array(3).keys()).map(i => (
                        <li key={i}>
                            <Skeleton className="h-[48px] w-full rounded" />
                        </li>
                    ))}
                </ul>
            </CardContent>
            <CardFooter>
                <Button className="w-full" disabled>
                    <span>Submit</span>
                </Button>
            </CardFooter>
        </Card>
    )
}
