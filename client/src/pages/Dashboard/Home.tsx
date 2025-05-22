import React, { useEffect, useRef } from 'react'
"use client"
import { useDashboard } from "@/components/dashboard-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartArea } from "@/components/ui/chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowDownIcon, ArrowUpIcon, TrendingUp, BarChart3, CreditCard, Newspaper } from "lucide-react"
import BitcoinChart from '@/components/Chart/BitcoinChart'
import StockChart from '@/components/Chart/StockChart'
import StockTicker from '@/components/Ticker/StockTicker'

const Home = () => {

  const { cryptoData, stockData, newsData } = useDashboard();

  const widgetContainerRef = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-tickers.js";
    script.async = true;
    script.innerHTML = `
      {
        "symbols": [
          { "description": "", "proName": "BSE:SENSEX" },
          { "description": "", "proName": "FX_IDC:USDINR" },
          { "description": "", "proName": "BSE:RVNL" },
          { "description": "", "proName": "BITSTAMP:BTCUSD" }
        ],
        "isTransparent": false,
        "showSymbolLogo": true,
        "colorTheme": "light",
        "locale": "en"
      }
    `;

    widgetContainerRef.current.appendChild(script);

    return () => {
      // Clean up the script when the component unmounts
      widgetContainerRef.current.removeChild(script);
    };
  }, []);


  // Get top performing assets with null checks
  const topCrypto =
    cryptoData && cryptoData.length > 0 ? [...cryptoData].sort((a, b) => b.change24h - a.change24h)[0] : null

  const topStock = stockData && stockData.length > 0 ? [...stockData].sort((a, b) => b.change - a.change)[0] : null


  return (
    <div className="space-y-6">
          <div className="tradingview-widget-container" ref={widgetContainerRef}>
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright">
        <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
          <span className="blue-text">Track all markets on TradingView</span>
        </a>
      </div>
    </div>

    {/* <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Top Crypto</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {topCrypto ? (
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">${topCrypto.price.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  {topCrypto.name} ({topCrypto.symbol})
                </p>
              </div>
              <div className={`flex items-center ${topCrypto.change24h >= 0 ? "text-green-500" : "text-red-500"}`}>
                {topCrypto.change24h >= 0 ? (
                  <ArrowUpIcon className="mr-1 h-4 w-4" />
                ) : (
                  <ArrowDownIcon className="mr-1 h-4 w-4" />
                )}
                <span>{Math.abs(topCrypto.change24h).toFixed(2)}%</span>
              </div>
            </div>
          ) : (
            <div className="text-center py-2 text-muted-foreground">No data available</div>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Top Stock</CardTitle>
          <BarChart3 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
        <StockTicker/>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Currency Exchange</CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">EUR/USD</div>
          <p className="text-xs text-muted-foreground">1 EUR = 1.09 USD</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Market Sentiment</CardTitle>
          <Newspaper className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">Neutral</div>
          <p className="text-xs text-muted-foreground">Based on latest news</p>
        </CardContent>
      </Card>
    </div> */}

    <Tabs defaultValue="crypto" className="space-y-4">
      <TabsList>
        <TabsTrigger value="crypto">Crypto</TabsTrigger>
        <TabsTrigger value="stocks">Stocks</TabsTrigger>
      </TabsList>
      <TabsContent value="crypto" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Cryptocurrency Bitcoin Market</CardTitle>
            <CardDescription>Top cryptocurrencies by market cap</CardDescription>
          </CardHeader>
          <CardContent className='h-[80vh]'>
            {cryptoData && cryptoData.length > 0 ? (
              <div className="flex justify-center items-center">
              <BitcoinChart/>
              </div>
            ) : (
              <div className="flex justify-center items-center h-[350px] text-muted-foreground">
                No data available
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="stocks" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>SENSEX Stock Market</CardTitle>
            <CardDescription>Top stocks by market cap</CardDescription>
          </CardHeader>
          <CardContent>
            {stockData && stockData.length > 0 ? (
              <div className="flex justify-center items-center">
             <StockChart/>
             </div>
            ) : (
              <div className="flex justify-center items-center h-[350px] text-muted-foreground">
                No data available
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  </div>
  )
}

export default Home