import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import config from "@/config";
import RatingStars from "@/utility/RatingStars";

const TransactionsCard = ({ data }) => {
  return (
    <Card className="flex flex-col h-full">
      <CardContent className="flex flex-col gap-2 p-3">
        <img className="aspect-video object-cover" src={`${data.images[0]}`} alt="" />
        <CardTitle>{data.name}</CardTitle>
        <CardDescription>{data.description}</CardDescription>
        <RatingStars rating={data.rating} />
      </CardContent>
      <CardFooter className="p-3 mt-auto">
        <Button className="text-xl">${data.price}</Button>
      </CardFooter>
    </Card>
  );
};

export default TransactionsCard;
