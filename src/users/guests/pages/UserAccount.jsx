import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BadgeInfo } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { Wallet, CreditCard } from "lucide-react"
import { FaPaypal } from "react-icons/fa";
import { Info } from "lucide-react"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("general")
  const [formData, setFormData] = useState({
    username: "lash0000",
    email: "k8030892@gmail.com",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Handle form submission logic here
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4 mt-12">
      <div className="w-full max-w-4xl grid grid-cols-[200px_1fr] gap-6">
        {/* Header with profile info */}
        <div className="col-span-2 flex items-center gap-3 mb-2">
          <Avatar className="h-10 w-10">
            <AvatarImage src="https://github.com/golash0000.png" alt="Profile" />
            <AvatarFallback>KO</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-lg font-medium">Kenneth Obsequio</h1>
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
            <button
              onClick={() => setActiveTab("billing")}
              className={`w-full text-left px-3 py-2 rounded-md ${
                activeTab === "billing" ? "bg-slate-100 font-medium" : "hover:bg-slate-50"
              }`}
            >
              Billing
            </button>
          </div>
          <div className="pt-40">
            <Button variant="ghost" className="text-red-500 hover:text-red-600 hover:bg-red-50 w-full text-sm">
              Deactivate Account
            </Button>
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
                  <Input id="username" name="username" value={formData.username} onChange={handleChange} />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} />
                </div>

                <div className="flex justify-end">
                  <Button type="submit" className="bg-slate-900 text-white hover:bg-slate-800">
                    Save Changes
                  </Button>
                </div>
              </div>
            </form>
          )}

          {/* Edit Profile tab content */}
          {activeTab === "edit-profile" && (
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Profile Picture</label>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src="https://github.com/golash0000.png" alt="Profile" />
                      <AvatarFallback>KO</AvatarFallback>
                    </Avatar>
                    <Button variant="outline" size="sm" disabled>
                      Change Avatar
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="fullName" className="text-sm font-medium">
                    Display Name
                  </label>
                  <Input id="fullName" name="fullName" defaultValue="Kenneth Obsequio" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="bio" className="text-sm font-medium">
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    rows={4}
                    className="w-full min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                    placeholder="Write a short bio about yourself..."
                  />
                </div>

                <div className="flex justify-end">
                  <Button type="button" className="bg-slate-900 text-white hover:bg-slate-800">
                    Update Profile
                  </Button>
                </div>
              </div>
            </div>
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
                  <p className="text-sm">No payment methods added</p>
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
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col items-center justify-center p-6 border rounded-lg hover:bg-slate-100 cursor-pointer space-y-2">
                          <FaPaypal size={32} />
                          <span className="font-medium">Paypal</span>
                        </div>
                        <div className="flex flex-col items-center justify-center p-6 border rounded-lg bg-slate-100 opacity-50 cursor-not-allowed space-y-2">
                            <img src="/paymaya.png" alt="Paymaya" className="w-[5em] filter grayscale brightness-0" />
                            <span className="font-medium">Paymaya</span>
                        </div>
                      </div>
                      <div className="border border-orange-400 bg-orange-200 p-4 rounded-lg flex items-center flex-row">
                        <p className="text-sm text-muted-foreground">
                            This window, will require for you to integrate your existing account in these platforms.
                        </p>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" className="w-full">
                          Continue
                        </Button>
                      </DialogFooter>
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
