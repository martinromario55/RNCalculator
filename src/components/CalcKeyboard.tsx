import { View, Text } from 'react-native'
import React, { useState } from 'react'
import Button from './Button'
import { Styles } from '../styles/GlobalStyles'
import { myColors } from '../styles/Colors'

const CalcKeyboard = () => {
  const [firstNumber, setFirstNumber] = useState('')
  const [secondNumber, setSecondNumber] = useState('')
  const [operation, setOperation] = useState('')
  const [result, setResult] = useState<number | null>(null)

  // Set the value of each button pressed
  const handleButtonPress = (buttonValue: string) => {
    if (firstNumber.length < 10) {
      setFirstNumber(firstNumber + buttonValue)
    }
  }
  // set the value of the operation when the button is pressed
  const handleOperationPress = (buttonValue: string) => {
    setOperation(buttonValue)
    setSecondNumber(firstNumber)
    setFirstNumber('')
  }
  //  Clear screen
  const clear = () => {
    setFirstNumber('')
    setSecondNumber('')
    setOperation('')
    setResult(null)
  }
  // Handle +/- operation toggling the first number from positive to negative then back each time the button is pressed
  const handlePlusMinus = () => {
    let newVal: number = parseInt(firstNumber) * -1
    setFirstNumber(newVal.toString())
  }

  // Get results switch statement and parseInt
  const getResults = () => {
    switch (operation) {
      case '+':
        clear()
        setResult(parseInt(secondNumber) + parseInt(firstNumber))
        break
      case '-':
        clear()
        setResult(parseInt(secondNumber) - parseInt(firstNumber))
        break
      case 'x':
        clear()
        setResult(parseInt(secondNumber) * parseInt(firstNumber))
        break
      case '/':
        clear()
        setResult(parseInt(secondNumber) / parseInt(firstNumber))
        break
      case '%':
        clear()
        setResult(parseInt(secondNumber) % parseInt(firstNumber))
        break
      case '=':
      default:
        clear()
        setResult(0)
        break
    }
  }

  // Display first number function
  const fistNumberDisplay = () => {
    if (result !== null) {
      return (
        <Text
          style={
            result < 99999
              ? [Styles.screenFirstNumber, { color: myColors.result }]
              : [
                  Styles.screenFirstNumber,
                  { fontSize: 50, color: myColors.result },
                ]
          }
        >
          {result?.toString()}
        </Text>
      )
    }
    if (firstNumber && firstNumber.length < 6) {
      return <Text style={Styles.screenFirstNumber}>{firstNumber}</Text>
    }
    if (firstNumber === '') {
      return <Text style={Styles.screenFirstNumber}>{'0'}</Text>
    }
    if (firstNumber.length > 5 && firstNumber.length < 8) {
      return (
        <Text style={[Styles.screenFirstNumber, { fontSize: 70 }]}>
          {firstNumber}
        </Text>
      )
    }
    if (firstNumber.length > 7) {
      return (
        <Text style={[Styles.screenFirstNumber, { fontSize: 50 }]}>
          {firstNumber}
        </Text>
      )
    }
  }

  return (
    <View style={Styles.viewBottom}>
      <View
        style={{
          height: 120,
          width: '90%',
          justifyContent: 'flex-end',
          alignSelf: 'center',
        }}
      >
        <Text style={Styles.screenSecondNumber}>
          {secondNumber}
          <Text style={{ color: 'purple', fontSize: 50, fontWeight: '500' }}>
            {operation}
          </Text>
        </Text>
        {fistNumberDisplay()}
      </View>
      <View style={Styles.row}>
        <Button title="C" isGray onPress={clear} />
        <Button title="+/-" isGray onPress={() => handlePlusMinus()} />
        <Button title="%" isGray onPress={() => handleOperationPress('%')} />
        <Button title="÷" isBlue onPress={() => handleOperationPress('/')} />
      </View>
      <View style={Styles.row}>
        <Button title="7" onPress={() => handleButtonPress('7')} />
        <Button title="8" onPress={() => handleButtonPress('8')} />
        <Button title="9" onPress={() => handleButtonPress('9')} />
        <Button title="x" isBlue onPress={() => handleOperationPress('x')} />
      </View>
      <View style={Styles.row}>
        <Button title="4" onPress={() => handleButtonPress('4')} />
        <Button title="5" onPress={() => handleButtonPress('5')} />
        <Button title="6" onPress={() => handleButtonPress('6')} />
        <Button title="-" isBlue onPress={() => handleOperationPress('-')} />
      </View>
      <View style={Styles.row}>
        <Button title="1" onPress={() => handleButtonPress('1')} />
        <Button title="2" onPress={() => handleButtonPress('2')} />
        <Button title="3" onPress={() => handleButtonPress('3')} />
        <Button title="+" isBlue onPress={() => handleOperationPress('+')} />
      </View>
      <View style={Styles.row}>
        <Button title="." onPress={() => handleButtonPress('.')} />
        <Button title="0" onPress={() => handleButtonPress('0')} />
        <Button
          title="⌫"
          onPress={() =>
            setFirstNumber(firstNumber.slice(0, firstNumber.length - 1))
          }
        />
        <Button title="=" isBlue onPress={() => getResults()} />
      </View>
    </View>
  )
}

export default CalcKeyboard
