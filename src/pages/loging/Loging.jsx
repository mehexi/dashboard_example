import { useState, useContext } from "react";
import { AuthContext } from "@/auth/AuthProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "@/axios/AxiosIntence";

const Login = () => {

  const {handleSetUser,setToken} = useContext(AuthContext)
 
  const img =
    "https://images.unsplash.com/photo-1717766075042-c969eef03d38?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const { signInWithGoogle} = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()
  const location = useLocation()
  console.log(location)

  const handleGoogle = () => {
    signInWithGoogle()
      .then((result) => {
        console.log("User signed in", result.user);
        const { displayName, email, phoneNumber, photoURL } = result.user;
  
        const userData = {
          name: displayName,
          password: 'default', // Assign a default password for Google users
          email,
          city: null,
          state: null,
          country: null,
          occupation: null,
          phoneNumber: phoneNumber || null,
          role: "user",
          photoURL
        };
  
        axiosInstance.post('/signUp/google', userData)
          .then((res) => {
            console.log(res.data);
            handleSetUser(res.data.user);
            setToken(res.data.token);
            navigate(location.state?.form?.pathname || '/');
          })
          .catch((error) => console.error("Error", error));
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    const load = {
      email: email,
      password: password
    }
    const handleSubmit = async () => {
      try {
        const result = await  axiosInstance.post('/login', load)
        console.log(result)
        handleSetUser(result.data.user)
        setToken(result.data.token)
        navigate('/dashboard')
      } catch (error)  {
        console.error(error)
      }
      }
    handleSubmit()
  };

  return (
    <section className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-screen">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <form onSubmit={handleEmailSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <label htmlFor="email">Email</label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <label htmlFor="password">Password</label>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Link
              to="/forgot-password"
              className="ml-auto inline-block text-sm underline"
            >
              Forgot your password?
            </Link>
            <Button type="submit" className="w-full">
              Login
            </Button>
            <Button variant="outline" onClick={handleGoogle} className="w-full">
              Login with Google
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to={"/signUp"} className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <img
          src={img}
          alt=""
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </section>
  );
};

export default Login;
