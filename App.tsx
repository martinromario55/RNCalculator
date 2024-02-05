import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Switch, SafeAreaView } from 'react-native'
import { ThemeContext } from './src/context/ThemeContext'
import { useState } from 'react'
import { myColors } from './src/styles/Colors'
import Button from './src/components/Button'
import CalcKeyboard from './src/components/CalcKeyboard'

export default function App() {
  const [theme, setTheme] = useState('light')

  const { container } = styles
  return (
    <ThemeContext.Provider value={theme}>
      <SafeAreaView
        style={
          theme === 'light'
            ? container
            : [container, { backgroundColor: '#000' }]
        }
      >
        <StatusBar style="auto" />
        <Switch
          value={theme === 'light'}
          onValueChange={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        />
        <CalcKeyboard />
      </SafeAreaView>
    </ThemeContext.Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: myColors.light,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
})
