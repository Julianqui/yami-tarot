import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import StyledComponentsRegistry from '@/components/StyledComponentsRegistry'
import { GlobalStyle } from '@/styles/GlobalStyle'

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
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
