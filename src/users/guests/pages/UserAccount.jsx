import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input, InputWithIcon } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { FaPaypal } from "react-icons/fa";
import { Info, LoaderCircle, ShieldCheck, BadgeCheck } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useNavigate } from "react-router-dom"
import usePaypalOAuthStore from "../stores/paypal-oauth.store"
import { PhoneInput } from "@/components/phone-input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import useGuestUpdateStore from "../stores/guest-update.store"
import useLoginAuth from "@/users/credentials/stores/useLoginAuth"

export default function ProfilePage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("general")
  const [formData, setFormData] = useState({
    username: "",
    email: "",
  })
  const [fullName, setFullName] = useState({ firstName: "", lastName: "" });
  const [showSuccessIcon, setShowSuccessIcon] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const {
    updateGuestUser,
    isLoading,
    success,
    error,
    resetStatus,
  } = useGuestUpdateStore()
  const { user, revalidateUser } = useLoginAuth()

  useEffect(() => {
    async function syncUserData() {
      await revalidateUser()
      if (user) {
        setFormData({
          username: user.username || "",
          email_address: user.email_address || "",
        })
        setFullName({
          firstName: user.guest_name?.firstName || "",
          lastName: user.guest_name?.lastName || "",
        })
      }
    }
    syncUserData()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFullNameChange = (e) => {
    const { name, value } = e.target;
    setFullName((prev) => ({ ...prev, [name]: value }));
  };
  
  // this func can access the other tabs...

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Log the data being sent for debugging
    // console.log("Data being sent to the server:", {
    //   ...formData,
    //   firstName: fullName.firstName, // Directly include firstName
    //   lastName: fullName.lastName, // Directly include lastName
    //   username: formData.username, // Log username
    //   email_address: formData.email_address, // Log email_address
    // });
    
    try {
      await updateGuestUser({
        ...formData,
        firstName: fullName.firstName,
        lastName: fullName.lastName,
      });
      
      await revalidateUser();

      if (activeTab === "general") {
        setShowSuccess(true);
      } else if (activeTab === "edit-profile") {
        setShowSuccessIcon(true);
      }
      
      // // Log the response for further debugging (if any)
      // console.log("Profile update response:", success);
      
      toast({
        title: "Updated Successfully!",
        description: "Your profile has been updated.",
      });
    } catch (err) {
      // Log the error in case of failure
      console.error("Error during profile update:", err);
      
      toast({
        title: "Update failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };
    
  

  // For paypal pero wala paaa din

  const { requestPaypalAuth } = usePaypalOAuthStore()
  const navigate = useNavigate() // This have not yet 

  const handlePayPalOAuth = async () => {
    const guestId = JSON.parse(localStorage.getItem("auth-storage"))?._id
    if (!guestId) {
      alert("No user ID found in localStorage.")
      return
    }

    const refreshTokenInput = prompt("Paste your PayPal refresh token here:")
    if (!refreshTokenInput) return

    await requestPaypalAuth({
      guest_id: guestId,
      paypal_refresh_token: refreshTokenInput,
    })

    alert("PayPal authorization submitted. Check your dashboard.")
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <div className="w-full max-w-4xl grid grid-cols-[200px_1fr] gap-6">
        {/* Header with profile info */}
        <div className="col-span-2 flex items-center gap-3 mb-2">
          <Avatar className="h-10 w-10">
            <AvatarImage src="https://github.com/golash0000.png" alt="Profile" />
            <AvatarFallback>KO</AvatarFallback>
          </Avatar>
          {/* I want also to use revalidateUser here but in these case this is just only display
          for guest_name.firstName and guest_name.lastName */}
          <div>
          <h1 className="text-lg font-medium">
            {fullName.firstName} {fullName.lastName}
          </h1>
            <p className="text-sm text-muted-foreground">Update your username and manage your account</p>
          </div>
        </div>

        {/* Left sidebar with navigation */}
        <div className="border-r pr-4">
          <h3 className="font-medium mb-4">Account Settings</h3>
          <div className="space-y-1">
            <button
              onClick={() => setActiveTab("general")}
              className={`w-full text-left px-3 py-2 rounded-md ${
                activeTab === "general" ? "bg-slate-100 font-medium" : "hover:bg-slate-50"
              }`}
            >
              General
            </button>
            <button
              onClick={() => setActiveTab("edit-profile")}
              className={`w-full text-left px-3 py-2 rounded-md ${
                activeTab === "edit-profile" ? "bg-slate-100 font-medium" : "hover:bg-slate-50"
              }`}
            >
              Edit Profile
            </button>
            {/* <button
              onClick={() => setActiveTab("billing")}
              className={`w-full text-left px-3 py-2 rounded-md ${
                activeTab === "billing" ? "bg-slate-100 font-medium" : "hover:bg-slate-50"
              }`}
            >
              Billing
            </button> */}
          </div>
          <div className="pt-40">
            {/* <Button variant="destructive" className="w-full text-sm">
              Deactivate Account
            </Button> */}
          </div>
        </div>

        {/* Content area */}
        <div>
          {/* General tab content */}
          {activeTab === "general" && (
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="username" className="text-sm font-medium">
                    Username
                  </label>
                  <InputWithIcon
                    id="username" 
                    name="username" 
                    value={formData.username} 
                    onChange={handleChange}
                    rightIcon={
                      showSuccess ? (
                        <div className="flex text-green-600">
                          <BadgeCheck size={16} />
                        </div>
                      ) : null
                    }
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <InputWithIcon
                    id="email_address"
                    name="email_address"
                    type="email"
                    value={formData.email_address}
                    onChange={handleChange}
                    rightIcon={
                      showSuccess ? (
                        <div className="flex text-green-600">
                          <BadgeCheck size={16} />
                        </div>
                      ) : null
                    }
                  />
                </div>

                <div className="flex justify-end">
                  <Button 
                    type="submit" 
                    className="bg-slate-900 text-white hover:bg-slate-800 flex items-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <LoaderCircle className="w-4 h-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                </div>
              </div>
            </form>
          )}

          {/* Edit Profile tab content */}
          {activeTab === "edit-profile" && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                {/* Profile Picture Section */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Profile Picture</label>
                  <div className="flex items-center gap-4 cursor-not-allowed">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src="https://github.com/golash0000.png" alt="Profile" />
                      <AvatarFallback>KO</AvatarFallback>
                    </Avatar>
                    <Button variant="outline" size="sm" disabled>
                      Change Avatar
                    </Button>
                  </div>
                </div>

                {/* First and Last Name Inputs */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="text-sm font-medium">
                      First Name
                    </label>
                    <InputWithIcon
                      id="firstName"
                      name="firstName"
                      value={fullName.firstName}
                      onChange={handleFullNameChange}
                      rightIcon={
                        showSuccessIcon ? (
                          <div className="flex text-green-600">
                            <BadgeCheck size={16} />
                          </div>
                        ) : null
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="text-sm font-medium">
                      Last Name
                    </label>
                    <InputWithIcon
                      id="lastName"
                      name="lastName"
                      value={fullName.lastName}
                      onChange={handleFullNameChange}
                      rightIcon={
                        showSuccessIcon ? (
                          <div className="flex text-green-600">
                            <BadgeCheck size={16} />
                          </div>
                        ) : null
                      }
                    />
                  </div>
                </div>

                {/* Contact Number */}
                <div className="space-y-2">
                  <label htmlFor="bio" className="text-sm font-medium">
                    Contact Number
                  </label>
                  <PhoneInput
                    disabled
                    value={phoneNumber}
                    onChange={setPhoneNumber}
                    international
                    defaultCountry="PH"
                    placeholder="Enter a phone number"
                    className="cursor-not-allowed"
                  />
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    className="bg-slate-900 text-white hover:bg-slate-800 flex items-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <LoaderCircle className="w-4 h-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Update Profile"
                    )}
                  </Button>
                </div>
              </div>
            </form>
          )}


          {/* Billing tab content */}
          {activeTab === "billing" && (
            <div className="space-y-6">
              <div className="rounded-lg border border-blue-500 bg-blue-100 p-4 flex flex-row items-center space-x-2">
                <Info size={20} className="text-blue-600" />
                <p className="text-sm text-blue-600">
                    You don't have any active subscription plans.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Payment Methods</h3>
                <div className="rounded-lg border p-4 flex items-center justify-between">
                  {/* If user does not have yet then show this */}
                  <p className="text-sm">No payment methods added</p>
                  {/* If user has it via refreshToken provided with 
                  VITE_APP_PAYPAL_LOGIN env then show this */}
                  {/* <Badge className="p-2 font-medium text-sm gap-2 cursor-pointer">
                    <FaPaypal /> PayPal
                  </Badge> */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        Add Payment Method
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-[480px]">
                      <DialogHeader>
                        <DialogTitle className="text-xl font-bold">Payment Method</DialogTitle>
                      </DialogHeader>
                      <div className="grid grid-cols-1 gap-4">
                        <div
                        // onClick={handlePayPalOAuth}
                        className="flex flex-col items-center justify-center p-6 border rounded-lg hover:bg-slate-100 cursor-pointer space-y-2"
                        >
                          <FaPaypal size={32} />
                          <span className="font-medium">Paypal</span>
                        </div>
                        {/* <div className="flex flex-col items-center justify-center p-6 border rounded-lg bg-slate-100 opacity-50 cursor-not-allowed space-y-2">
                            <img src="/paymaya.png" alt="Paymaya" className="w-[5em] filter grayscale brightness-0" />
                            <span className="font-medium">Paymaya</span>
                        </div> */}
                      </div>
                      <div className="border border-orange-400 bg-orange-200 p-4 rounded-lg flex items-center flex-row">
                        <p className="text-sm text-accent-foreground">
                            This window, will require for you to integrate your PayPal account to enable future payments.
                        </p>
                      </div>
                      {/* <DialogFooter>
                        <Button variant="outline" className="w-full">
                          Continue
                        </Button>
                      </DialogFooter> */}
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Billing History</h3>
                <div className="rounded-lg border p-4">
                  <p className="text-sm text-muted-foreground">No billing history available</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
