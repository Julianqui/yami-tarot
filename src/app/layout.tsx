import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import StyledComponentsRegistry from '@/components/StyledComponentsRegistry'
import { GlobalStyle } from '@/styles/GlobalStyle'
import { ScrollToTop } from '@/components/ScrollToTop'
import { ScrollToTopButtonComponent } from '@/components/ScrollToTopButton'
import { FloatingContactButtonComponent } from '@/components/FloatingContactButton'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Yami Tarot',
  description: 'Mystical tarot reading application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <GlobalStyle />
          <ScrollToTop>
            {children}
          </ScrollToTop>
          <ScrollToTopButtonComponent />
          <FloatingContactButtonComponent />
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
