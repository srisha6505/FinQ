import { PieChart } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const Footer: React.FC = () => {
  return (
    <>
      <footer className="border-t bg-background py-12">
        <div className="container">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="flex items-center gap-2 font-bold text-xl">
              <PieChart className="h-6 w-6 text-blue-500" />
              <span>FinanceAI</span>
            </div>
            <nav className="flex flex-wrap items-center justify-center gap-6">
              <Link to="#" className="text-sm text-muted-foreground hover:text-foreground">
                Features
              </Link>
              <Link to="#" className="text-sm text-muted-foreground hover:text-foreground">
                Pricing
              </Link>
              <Link to="#" className="text-sm text-muted-foreground hover:text-foreground">
                Blog
              </Link>
              <Link to="#" className="text-sm text-muted-foreground hover:text-foreground">
                Support
              </Link>
              <Link to="#" className="text-sm text-muted-foreground hover:text-foreground">
                Terms
              </Link>
              <Link to="#" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy
              </Link>
            </nav>
            <div className="text-sm text-muted-foreground">© 2025 FinanceAI. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer