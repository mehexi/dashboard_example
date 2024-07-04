import { useLoaderData } from "react-router-dom";
import TitleCard from "./productsUi/TitleCard";
import ProductName from "./productsUi/ProductName";
import ChartCard from "@/components/coustomUi/ChartCard";
import ProductTable from "./productsUi/ProductTable";

const SelectedProducts = () => {
  const data = useLoaderData();

  const productDetails = data?.data?.data;
  const productStat = data?.data?.stat[0];

  if (!productStat) {
    return <div>
      <h1 className="text-3xl font-bold text-center">No Data Found</h1>
    </div>
  }

  const yearlyRevenue = Math.round(
    productDetails.price * productStat.yearlyTotalSoldUnits
  );

  return (
    <section>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <ProductName
          productTitle={productDetails.name}
          productDetails={productDetails.description}
          price={productDetails.price}
        />
        <TitleCard
          title={"total item sold"}
          data={productStat.yearlySalesTotal}
        />
        <TitleCard
          title={"total Unit sold"}
          data={productStat.yearlyTotalSoldUnits}
        />
        <TitleCard title={"total revenue"} data={yearlyRevenue} />
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <ChartCard data={data} />
        <div className="col-span-2">
          <ProductTable productDetails={productDetails} productStat={productStat} />
        </div>
      </div>
    </section>
  );
};

export default SelectedProducts;
