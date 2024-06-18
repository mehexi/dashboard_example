import { AuthContext } from "@/auth/AuthProvider";
import { useContext } from "react";
import CurrentUser from "./userUi/CurrentUser";
import { Outlet } from "react-router-dom";

const User = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <h1>loading</h1>
  }
  console.log(user)

  return (
    <section className="mt-5 flex flex-col gap-4">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <CurrentUser user={user} />
        <CurrentUser user={user} />
        <CurrentUser user={user} />
        <CurrentUser user={user} />
      </div>
     <Outlet/>
    </section>
  );
};

export default User;
