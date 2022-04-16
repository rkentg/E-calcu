
  class Calculator {
    constructor(prevOperandText, currOperandText) {
      this.prevOperandText = prevOperandText
      this.currOperandText = currOperandText
      this.clear()
    }
  
    clear() {
      this.currNumber = ''
      this.prevNumber = ''
      this.operation = undefined
    }
  
    delete() {
      this.currNumber = this.currNumber.toString().slice(0, -1)
    }
  
    appendNumber(number) {
      if (number === '.' && this.currNumber.includes('.')) return
      this.currNumber = this.currNumber.toString() + number.toString()
    }
  
    chooseOperation(operation) {
      if (this.currNumber === '') return
      if (this.prevNumber !== '') {
        this.compute()
      }
      this.operation = operation
      this.prevNumber = this.currNumber
      this.currNumber = ''
    }
  
    compute() {
      let computation
      const prev = parseFloat(this.prevNumber)
      const current = parseFloat(this.currNumber)
      if (isNaN(prev) || isNaN(current)) return
      switch (this.operation) {
        case '+':
          computation = prev + current
          break
        case '-':
          computation = prev - current
          break
        case '*':
          computation = prev * current
          break
        case '÷':
          computation = prev / current
          break
        default:
          return
      }
      this.currNumber = computation
      this.operation = undefined
      this.prevNumber = ''
    }
  
    getDisplayNumber(number) {
      const stringNumber = number.toString()
      const integerDigits = parseFloat(stringNumber.split('.')[0])
      const decimalDigits = stringNumber.split('.')[1]
      let integerDisplay
      if (isNaN(integerDigits)) {
        integerDisplay = ''
      } else {
        integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
      }
      if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`
      } else {
        return integerDisplay
      }
    }
  
    updateDisplay() {
      this.currOperandText.innerText =
        this.getDisplayNumber(this.currNumber)
      if (this.operation != null) {
        this.prevOperandText.innerText =
          `${this.getDisplayNumber(this.prevNumber)} ${this.operation}`
      } else {
        this.prevOperandText.innerText = ''
      }
    }
  }
  
  
  const numButtons = document.querySelectorAll('[data-number]')
  const opButtons = document.querySelectorAll('[data-operation]')
  const equalsButton = document.querySelector('[data-equals]')
  const delButton = document.querySelector('[data-delete]')
  const clearButton = document.querySelector('[data-all-clear]')
  const prevOperandText = document.querySelector('[data-previous-operand]')
  const currOperandText = document.querySelector('[data-current-operand]')
  
  const calculator = new Calculator(prevOperandText, currOperandText)
  
  numButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.appendNumber(button.innerText)
      calculator.updateDisplay()
    })
  })
  
  opButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText)
      calculator.updateDisplay()
    })
  })
  
  equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
  })
  
  clearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
  })
  
  delButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
  })
  
  document.addEventListener('keydown', function (event) {
    let patternForNumbers = /[0-9]/g;
    let patternForOperators = /[+\-*\/]/g
    if (event.key.match(patternForNumbers)) {
      event.preventDefault();
      calculator.appendNumber(event.key)
      calculator.updateDisplay()
    }
    if (event.key === '.') {
      event.preventDefault();
      calculator.appendNumber(event.key)
      calculator.updateDisplay()
    }
    if (event.key.match(patternForOperators)) {
      event.preventDefault();
      calculator.chooseOperation(event.key)
      calculator.updateDisplay()
    }
    if (event.key === 'Enter' || event.key === '=') {
      event.preventDefault();
      calculator.compute()
      calculator.updateDisplay()
    }
    if (event.key === "Backspace") {
      event.preventDefault();
      calculator.delete()
      calculator.updateDisplay()
    }
    if (event.key == 'Delete') {
      event.preventDefault();
      calculator.clear()
      calculator.updateDisplay()
    }
  
  });