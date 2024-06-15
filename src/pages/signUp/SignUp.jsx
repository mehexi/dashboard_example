import axiosInstance from "@/axios/AxiosIntence"; 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@radix-ui/react-dropdown-menu";
import { AuthContext } from "@/auth/AuthProvider";

const SignUp = () => {

  const { handleSetUser, setToken } = useContext(AuthContext)
  const navigate = useNavigate()

  const [step, setStep] = useState(1);
  const [animating, setAnimating] = useState(false);
  const [retypePass, setRetypePass] = useState('');
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    country: '',
    city: '',
    state: '',
    occupation: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === 'retypePassword') {
      setRetypePass(value);
    } else {
      setFormData({ ...formData, [id]: value });
    }
    setError(''); 
  };

  const handleFirstSubmit = (e) => {
    e.preventDefault();
    setAnimating(true);
    setTimeout(() => {
      setStep(2); 
      setAnimating(false);
    }, 300); 
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== retypePass) {
      setError('Passwords do not match!');
      return;
    }

    try {
      const response = await axiosInstance.post('/signUp', formData);
      console.log(response.data);
      setToken(response.data.token);
      handleSetUser(response.data.user);
      navigate('/dashboard')
    } catch (error) {
      console.error(error);
      setError('Failed to sign up. Please try again.');
    }
  };

  const img =
    "https://images.unsplash.com/photo-1717766075042-c969eef03d38?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <section className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-screen">
      <Card className={`mx-auto max-w-sm h-fit border-none my-auto shadow-none ${animating ? 'slide-out' : 'slide-in'}`}>
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="text-red-500 text-center mb-4">{error}</div>
          )}
          {step === 1 ? (
            <form onSubmit={handleFirstSubmit} className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="firstName">First name</Label>
                  <Input
                    id="firstName"
                    placeholder="Max"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lastName">Last name</Label>
                  <Input
                    id="lastName"
                    placeholder="Robinson"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  type="text"
                  placeholder="Country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    type="text"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    type="text"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="occupation">Occupation</Label>
                <Input
                  id="occupation"
                  type="text"
                  placeholder="Occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Continue
              </Button>
            </form>
          ) : (
            <form onSubmit={handleFinalSubmit} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="retypePassword">Re-type Password</Label>
                <Input
                  id="retypePassword"
                  type="password"
                  placeholder="Re-type Password"
                  value={retypePass}
                  onChange={handleChange}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Sign Up
              </Button>
            </form>
          )}
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to={"/login"} className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
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

export default SignUp;
