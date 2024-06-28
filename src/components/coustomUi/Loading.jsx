import { LoaderCircle } from "lucide-react";
import { Card } from "../ui/card";

const Loading = () => {
  return (
    <Card className="mx-auto w-full max-w-[80rem] p-4">
    <div className="flex justify-center items-center w-ful h-80">
    <LoaderCircle size={64} className="animate-spin"/>
    </div>
  </Card>
  );
};

export default Loading;
