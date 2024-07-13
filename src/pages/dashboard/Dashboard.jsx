import React, { useContext, useEffect, useState } from "react";
import GreetingsCard from "./dashboardUi/GreetingsCard";
import DasProduct from "./dashboardUi/DasProduct";
import ProductSoldData from "./dashboardUi/ProductSoldData";
import axiosInstance from "@/axios/AxiosIntence";
import TotalBalanceData from "./dashboardUi/TotalBlanceData";
import NewUser from "./dashboardUi/NewUser";
import ProductChart from "./dashboardUi/ProductChart";

const Dashboard = () => {
  const userId = localStorage.getItem("uID");

  const [data, setData] = useState({
    user: null,
    product: null,
    overAllStatus: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userResponse, productResponse, productSoldResponse,allUserResponse] = await Promise.all([
          axiosInstance(`/general/users/${userId}`),
          axiosInstance("/client/products"),
          axiosInstance("/management"),
          axiosInstance('/general/users')
        ]);

        setData({
          user: userResponse.data,
          product: productResponse.data,
          overAllStatus: productSoldResponse.data[0],
          allUser: allUserResponse.data,
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>; // Replace with a better loading indicator if needed
  }

    const { user, product, overAllStatus,allUser } = data;
    console.log(allUser)

  return (
    <section className="grid grid-cols-6 gap-4 p-4">
      <GreetingsCard user={user} />
      <DasProduct product={product} />
      <ProductSoldData overAllStatus={overAllStatus} />
      <TotalBalanceData overAllStatus={overAllStatus} />
      <NewUser allUser={allUser} />
      <ProductChart product={product} />
    </section>
  );
};

export default Dashboard;
