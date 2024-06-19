import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import TitleCard from "./productsUi/TitleCard";
import ProductName from "./productsUi/ProductName";
import ChartCard from "@/components/coustomUi/ChartCard";
import TransactionsCard from "../user/userUi/TransactionsCard";

const SelectedProducts = () => {
  const data = useLoaderData();

  const productDetails = data.data.data;
  const productStat = data.data.stat[0];

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
        <ChartCard
          data={data}
        />
        <div className="col-span-2 h-full flex">
          <TransactionsCard data={data.data.data} />
          </div>
      </div>
    </section>
  );
};

export default SelectedProducts;
