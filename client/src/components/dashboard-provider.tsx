import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"


type DashboardContextType = {
  activeSection: string
  setActiveSection: (section: string) => void
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
  error: string | null
  setError: (error: string | null) => void
  cryptoData: any[]
  stockData: any[]
  newsData: any[]
  currencyRates: Record<string, number>
  refreshData: () => void
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined)

export function DashboardProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [activeSection, setActiveSection] = useState("overview")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [cryptoData, setCryptoData] = useState<any[]>([])
  const [stockData, setStockData] = useState<any[]>([])
  const [newsData, setNewsData] = useState<any[]>([])
  const [currencyRates, setCurrencyRates] = useState<Record<string, number>>({})


  // Fetch initial data
  useEffect(() => {
    // Immediately fetch data on mount
    fetchAllData()

    // Set up interval for real-time updates
    const interval = setInterval(() => {
      fetchAllData()
    }, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  const fetchAllData = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Fetch crypto data
      const cryptoResponse = await fetchCryptoData()
      setCryptoData(cryptoResponse)

      // Fetch stock data
      const stockResponse = await fetchStockData()
      setStockData(stockResponse)

      // Fetch news data
      const newsResponse = await fetchNewsData()
      setNewsData(newsResponse)

      // Fetch currency rates
      const ratesResponse = await fetchCurrencyRates()
      setCurrencyRates(ratesResponse)
    } catch (err) {
      console.error("Error fetching data:", err)
      setError("Failed to fetch data. Please try again later.")
    //   toast({
    //     title: "Error",
    //     description: "Failed to fetch data. Please try again later.",
    //     variant: "destructive",
    //   })
    } finally {
      setIsLoading(false)
    }
  }

  const refreshData = () => {
    fetchAllData()
    // toast({
    //   title: "Refreshing data",
    //   description: "Your dashboard is being updated with the latest data.",
    // })
  }

  // Mock data fetching functions
  const fetchCryptoData = async () => {
    // In a real app, this would be an API call
    return [
      {
        id: "bitcoin",
        name: "Bitcoin",
        symbol: "BTC",
        price: 65432.1,
        change24h: 2.5,
        marketCap: 1234567890,
        volume: 98765432,
        data: generateChartData(30, 60000, 70000),
      },
      {
        id: "ethereum",
        name: "Ethereum",
        symbol: "ETH",
        price: 3521.45,
        change24h: -1.2,
        marketCap: 423456789,
        volume: 34567890,
        data: generateChartData(30, 3000, 4000),
      },
      {
        id: "solana",
        name: "Solana",
        symbol: "SOL",
        price: 142.78,
        change24h: 5.7,
        marketCap: 56789012,
        volume: 12345678,
        data: generateChartData(30, 100, 150),
      },
      {
        id: "cardano",
        name: "Cardano",
        symbol: "ADA",
        price: 0.58,
        change24h: 0.8,
        marketCap: 20345678,
        volume: 5678901,
        data: generateChartData(30, 0.5, 0.7),
      },
    ]
  }

  const fetchStockData = async () => {
    // In a real app, this would be an API call
    return [
      {
        symbol: "AAPL",
        name: "Apple Inc.",
        price: 187.32,
        change: 1.2,
        volume: 23456789,
        data: generateChartData(30, 170, 190),
      },
      {
        symbol: "MSFT",
        name: "Microsoft Corp.",
        price: 415.45,
        change: 0.8,
        volume: 12345678,
        data: generateChartData(30, 400, 420),
      },
      {
        symbol: "GOOGL",
        name: "Alphabet Inc.",
        price: 142.78,
        change: -0.5,
        volume: 8765432,
        data: generateChartData(30, 140, 150),
      },
      {
        symbol: "AMZN",
        name: "Amazon.com Inc.",
        price: 178.35,
        change: 2.1,
        volume: 9876543,
        data: generateChartData(30, 170, 180),
      },
    ]
  }

  const fetchNewsData = async () => {
    // In a real app, this would be an API call
    return [
      {
        id: 1,
        title: "Bitcoin Surges Past $65,000 as Institutional Adoption Grows",
        source: "CryptoNews",
        date: "2023-03-15",
        sentiment: "bullish",
        url: "#",
      },
      {
        id: 2,
        title: "Fed Signals Potential Rate Cut, Markets Respond Positively",
        source: "Financial Times",
        date: "2023-03-14",
        sentiment: "bullish",
        url: "#",
      },
      {
        id: 3,
        title: "Tech Stocks Face Pressure Amid Inflation Concerns",
        source: "Wall Street Journal",
        date: "2023-03-13",
        sentiment: "bearish",
        url: "#",
      },
      {
        id: 4,
        title: "New Regulations for Cryptocurrency Exchanges Announced",
        source: "Bloomberg",
        date: "2023-03-12",
        sentiment: "neutral",
        url: "#",
      },
      {
        id: 5,
        title: "Global Supply Chain Issues Continue to Impact Markets",
        source: "Reuters",
        date: "2023-03-11",
        sentiment: "bearish",
        url: "#",
      },
    ]
  }

  const fetchCurrencyRates = async () => {
    // In a real app, this would be an API call
    return {
      USD: 1,
      EUR: 0.92,
      GBP: 0.78,
      JPY: 149.82,
      CAD: 1.35,
      AUD: 1.52,
      CNY: 7.24,
      INR: 83.12,
    }
  }

  // Helper function to generate random chart data
  const generateChartData = (days: number, min: number, max: number) => {
    const data = []
    const date = new Date()
    date.setDate(date.getDate() - days)

    for (let i = 0; i < days; i++) {
      date.setDate(date.getDate() + 1)
      data.push({
        date: new Date(date).toISOString().split("T")[0],
        value: min + Math.random() * (max - min),
      })
    }

    return data
  }

  return (
    <DashboardContext.Provider
      value={{
        activeSection,
        setActiveSection,
        isLoading,
        setIsLoading,
        error,
        setError,
        cryptoData,
        stockData,
        newsData,
        currencyRates,
        refreshData,
      }}
    >
      {children}
    </DashboardContext.Provider>
  )
}

export function useDashboard() {
  const context = useContext(DashboardContext)
  if (context === undefined) {
    throw new Error("useDashboard must be used within a DashboardProvider")
  }
  return context
}

