import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <img src="/satoriq-brand-logo.png" alt="Satoriq" className="h-8 w-auto" />
            <p className="text-sm text-gray-600 leading-relaxed max-w-sm">
              Satoriq is a talent intelligence platform dedicated to connecting exceptional talent with innovative
              organizations through AI-powered matching, smart evaluation tools, and data-driven insights.
            </p>
          </div>

          {/* Contact Us */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Contact Us</h3>
            <div className="space-y-3">
              <Link href="/demo" className="block text-sm text-gray-600 hover:text-green-600 transition-colors">
                Schedule a demo
              </Link>
              <Link
                href="mailto:hello@satoriq.com"
                className="block text-sm text-gray-600 hover:text-green-600 transition-colors"
              >
                hello@satoriq.com
              </Link>
              <Link
                href="tel:+1-555-123-4567"
                className="block text-sm text-gray-600 hover:text-green-600 transition-colors"
              >
                (555) 123-4567
              </Link>
              <Link href="/faq" className="block text-sm text-gray-600 hover:text-green-600 transition-colors">
                FAQ
              </Link>
              <Link href="/resources" className="block text-sm text-gray-600 hover:text-green-600 transition-colors">
                Resources
              </Link>
              <Link href="/support" className="block text-sm text-gray-600 hover:text-green-600 transition-colors">
                Support Center
              </Link>
            </div>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Legal</h3>
            <div className="space-y-3">
              <Link href="/privacy" className="block text-sm text-gray-600 hover:text-green-600 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="block text-sm text-gray-600 hover:text-green-600 transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="block text-sm text-gray-600 hover:text-green-600 transition-colors">
                Cookie Policy
              </Link>
              <Link href="/security" className="block text-sm text-gray-600 hover:text-green-600 transition-colors">
                Security & Compliance
              </Link>
              <Link
                href="/accessibility"
                className="block text-sm text-gray-600 hover:text-green-600 transition-colors"
              >
                Accessibility
              </Link>
              <Link href="/careers" className="block text-sm text-gray-600 hover:text-green-600 transition-colors">
                Careers
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <p className="text-xs text-gray-500">
              © 2025 Satoriq Corporation. All rights reserved. Satoriq is a registered trademark of Satoriq Corporation.
            </p>
            <div className="flex items-center space-x-4">
              <Link href="/linkedin" className="text-gray-400 hover:text-green-600 transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </Link>
              <Link href="/twitter" className="text-gray-400 hover:text-green-600 transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </Link>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-xs text-gray-400 leading-relaxed">
              SatoriqOne platform services are provided by Satoriq Corporation. Talent matching and evaluation services
              are powered by SatoriqIQ, our proprietary AI technology. Equal opportunity employer committed to diversity
              and inclusion. All candidate and client data is protected under our comprehensive privacy and security
              policies.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
