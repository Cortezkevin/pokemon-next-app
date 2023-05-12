import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { NextUIProvider } from '@nextui-org/react';
import { darkTheme } from '@/theme/darkthemedemo';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider theme={ darkTheme } >
      <Component {...pageProps} />
    </NextUIProvider>
  )
}
