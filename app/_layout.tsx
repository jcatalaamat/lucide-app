import React, { useEffect } from 'react'
import { Slot } from 'one'
import { StyleSheet } from 'react-native'
import './base.css'

// This ensures NativeWind styles are properly applied
if (StyleSheet.create !== undefined) {
  const originalCreate = StyleSheet.create
  StyleSheet.create = function(styles) {
    return originalCreate(styles)
  }
}

/**
 * The root _layout.tsx filters <html /> and <body /> out on native
 */

export default function Layout() {
  // Force style recomputation on component mount
  useEffect(() => {
    // This is a workaround to ensure styles are applied
    StyleSheet.flatten && StyleSheet.flatten({})
  }, [])

  return (
    <>
      {typeof document !== 'undefined' && (
        <>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
          <link rel="icon" href="/favicon.svg" />
        </>
      )}
      <Slot />
    </>
  )
}
