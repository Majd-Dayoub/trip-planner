import { React, useEffect, useState } from "react";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import { Button } from "../ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import axios from "axios";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [openDialog, setOpenDialog] = useState(false);
  useEffect(() => {
    console.log("User:", user);
  }, [user]);

  // Get User Profile
  const GetUserProfile = (tokenInfo) => {
    console.log("GetUserProfile called with token:", tokenInfo);

    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        console.log("User Profile:", response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
        setOpenDialog(false);
        window.location.reload();
      })
      .catch((error) => {
        console.error(
          "Error fetching user profile:",
          error.response || error.message
        );
      });
  };

  // Google Login
  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-5">
      <Link to={"/"}>
        <div className="flex justify-between gap-3">
          <img className="w-16 h-auto" src="/plane-logo.svg" alt="Logo" />
          <h1 className="font-extrabold text-[40px] text-center text-gray-900 mt-1">
            Trip Buddy
          </h1>
        </div>
      </Link>
      <div>
        {user ? (
          //user is logged in
          <div className="flex items-center justify-between gap-4">
            <a href='/my-trips'>
              <Button variant="outline" className="rounded-full text-black">
                My Trips
              </Button>
            </a>

            <Popover>
              <PopoverTrigger>
                <img
                  src={user.picture}
                  className="w-[50px] h-[50px] rounded-full"
                />
              </PopoverTrigger>
              <PopoverContent>
                <h2
                  className="cursor-pointer"
                  onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    window.location.reload();
                  }}
                >
                  Logout
                </h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button onClick={() => setOpenDialog(true)}>Sign In</Button>
        )}
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign in with Google</DialogTitle>
            <DialogDescription>
              <img
                className="w-16 h-auto"
                src="plane-logo.svg"
                alt="TripBuddy Logo"
              />
              <Button
                className="mt-4 flex items-center gap-2 border border-gray-300 rounded-md px-4 py-2 text-white hover:bg-gray-800"
                onClick={login}
              >
                <FontAwesomeIcon
                  icon={faGoogle}
                  className="text-lg text-red-500"
                />
                Sign in with Google
              </Button>
              Sign in to TripBuddy.ai with Google authentication securely.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Navbar;
