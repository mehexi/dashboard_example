import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DollarSign } from "lucide-react";

const CurrentUser = ({ user }) => {
  const { name, email } = user;
  
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Card className='bg-primary-foreground'>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>{name}</CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <CardDescription>{email}</CardDescription>
      </CardContent>
    </Card>
  );
};

export default CurrentUser;
