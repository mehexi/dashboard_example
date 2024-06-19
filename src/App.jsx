import { Outlet } from "react-router-dom";
import SideNav from "./components/coustomUi/SideNav";
import Header from "./components/coustomUi/Header";
import { ThemeProvider } from "./utility/ThemeProvider";


function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <SideNav />
      <Header />
      <main className="pl-4 sm:pl-20 pr-4 pt-4 pb-4 bg-[hsl(var(--background))]">
        <Outlet />
      </main>
    </ThemeProvider>
  );
}

export default App;
