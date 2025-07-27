import { Navbar } from 'components/ui'
import { Footer } from 'components/ui/Footer'

interface Props {
  children: JSX.Element | JSX.Element[]
}

export function MainLayout({ children }: Readonly<Props>) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}
