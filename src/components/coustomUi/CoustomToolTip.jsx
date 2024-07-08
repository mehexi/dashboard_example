import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

const CustomTooltip = ({ active, payload, label }) => {

  console.log(payload)

  if (active && payload && payload.length) {
    return (
      <Card className="">
        <CardHeader>
          <CardDescription className="label">{`${label} : ${payload[0].value}`}</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return null;
};

export default CustomTooltip;
