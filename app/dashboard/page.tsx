"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/lib/i18n/LanguageContext"
import { LanguageSelector } from "@/components/ui/language-selector"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Menu,
  ArrowRight,
  ArrowLeft,
  Calendar as CalendarIcon,
  BarChart3,
  Home,
  MoreHorizontal,
  Users,
  BedDouble,
  DollarSign,
  Bell,
  Search,
  Settings
} from "lucide-react"
import { format } from "date-fns"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip
} from "recharts"

const revenueData = [
  { name: 'Mon', value: 4000 },
  { name: 'Tue', value: 3000 },
  { name: 'Wed', value: 2000 },
  { name: 'Thu', value: 2780 },
  { name: 'Fri', value: 1890 },
  { name: 'Sat', value: 2390 },
  { name: 'Sun', value: 3490 }
]

const guestsData = [
  { name: 'Mon', value: 400 },
  { name: 'Tue', value: 300 },
  { name: 'Wed', value: 200 },
  { name: 'Thu', value: 278 },
  { name: 'Fri', value: 189 },
  { name: 'Sat', value: 239 },
  { name: 'Sun', value: 349 }
]

const roomsData = [
  { name: 'Mon', Occupied: 20, Booked: 15, Available: 5 },
  { name: 'Tue', Occupied: 18, Booked: 12, Available: 10 },
  { name: 'Wed', Occupied: 22, Booked: 18, Available: 0 },
  { name: 'Thu', Occupied: 25, Booked: 15, Available: 0 },
  { name: 'Fri', Occupied: 30, Booked: 10, Available: 0 },
  { name: 'Sat', Occupied: 35, Booked: 5, Available: 0 },
  { name: 'Sun', Occupied: 40, Booked: 0, Available: 0 }
]

export default function Dashboard() {
  const [isMobile, setIsMobile] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-200 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <h1 className="text-xl font-bold text-gray-800">Hotel Mama</h1>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSidebarOpen(false)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </div>
          <nav className="flex-1 p-4 space-y-2">
            <Button variant="ghost" className="w-full justify-start">
              <Home className="mr-2 h-5 w-5" />
              Dashboard
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Users className="mr-2 h-5 w-5" />
              Guests
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <BedDouble className="mr-2 h-5 w-5" />
              Rooms
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <DollarSign className="mr-2 h-5 w-5" />
              Billing
            </Button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden md:ml-64">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center">
              <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSidebarOpen(true)}>
                <Menu className="h-5 w-5" />
              </Button>
              <div className="relative ml-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
              <LanguageSelector />
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-white p-8 shadow-sm">
                <div className="flex items-center gap-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <ArrowRight className="h-7 w-7 text-blue-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold">73</span>
                      <span className="text-sm text-green-500">+24%</span>
                    </div>
                    <p className="text-sm text-gray-500">Arrival (This week)</p>
                    <p className="text-xs text-gray-400">Previous week: 35</p>
                  </div>
                </div>
              </Card>

              <Card className="bg-white p-8 shadow-sm">
                <div className="flex items-center gap-6">
                  <div className="bg-amber-50 p-4 rounded-lg">
                    <ArrowLeft className="h-7 w-7 text-amber-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold">35</span>
                      <span className="text-sm text-red-500">-12%</span>
                    </div>
                    <p className="text-sm text-gray-500">Departure (This week)</p>
                    <p className="text-xs text-gray-400">Previous week: 97</p>
                  </div>
                </div>
              </Card>

              <Card className="bg-white p-8 shadow-sm">
                <div className="flex items-center gap-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <CalendarIcon className="h-7 w-7 text-blue-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold">237</span>
                      <span className="text-sm text-green-500">+31%</span>
                    </div>
                    <p className="text-sm text-gray-500">Booking (This week)</p>
                    <p className="text-xs text-gray-400">Previous week: 187</p>
                  </div>
                </div>
              </Card>

              <Card className="bg-white p-8 shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Today Activities</h3>
                <div className="flex gap-4 justify-between">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-lg font-semibold mb-1">
                      5
                    </div>
                    <p className="text-xs">Room<br/>Available</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white text-lg font-semibold mb-1">
                      10
                    </div>
                    <p className="text-xs">Room<br/>Blocked</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white text-lg font-semibold mb-1">
                      15
                    </div>
                    <p className="text-xs">Guest</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm text-gray-500">Total Revenue</p>
                  <p className="text-xl font-bold">Rs.35k</p>
                </div>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Revenue Chart */}
              <Card className="bg-white p-6 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold">Revenue</h3>
                  <select className="text-sm border rounded-md px-3 py-1.5 bg-gray-50 text-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500">
                    <option>this week</option>
                  </select>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={revenueData} barSize={30}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} />
                      <YAxis axisLine={false} tickLine={false} />
                      <Tooltip cursor={{fill: 'rgba(245, 158, 11, 0.1)'}} />
                      <Bar dataKey="value" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              {/* Guests Chart */}
              <Card className="bg-white p-6 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold">Guests</h3>
                  <select className="text-sm border rounded-md px-3 py-1.5 bg-gray-50 text-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500">
                    <option>this week</option>
                  </select>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={guestsData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} />
                      <YAxis axisLine={false} tickLine={false} />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#3b82f6" 
                        strokeWidth={3}
                        dot={{ fill: "#fff", stroke: "#3b82f6", strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, fill: "#3b82f6" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              {/* Rooms Chart */}
              <Card className="bg-white p-6 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold">Rooms</h3>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span>Occupied</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span>Booked</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                        <span>Available</span>
                      </div>
                    </div>
                    <select className="text-sm border rounded-md px-3 py-1.5 bg-gray-50 text-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500">
                      <option>this week</option>
                    </select>
                  </div>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={roomsData} barSize={30}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} />
                      <YAxis axisLine={false} tickLine={false} />
                      <Tooltip />
                      <Bar dataKey="Occupied" stackId="a" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="Booked" stackId="a" fill="#22c55e" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="Available" stackId="a" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>

            {/* Today's Booking Section */}
            <Card className="bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-lg font-semibold">Todays Booking</h3>
                <span className="text-sm text-gray-500">(8 Guest today)</span>
              </div>
              <div className="flex gap-4">
                <Button variant="ghost" className="text-gray-600 hover:bg-gray-50 hover:text-gray-900">Status</Button>
                <Button variant="ghost" className="text-gray-600 hover:bg-gray-50 hover:text-gray-900">Packages</Button>
                <Button variant="ghost" className="text-gray-600 hover:bg-gray-50 hover:text-gray-900">Arrivals</Button>
                <Button variant="ghost" className="text-gray-600 hover:bg-gray-50 hover:text-gray-900">Departure</Button>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}

