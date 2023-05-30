const themeToggleBtn = document.querySelector('.theme-toggler')
const calculator = document.querySelector('.calculator')
const toggleIcon = document.querySelector('.toggler-icon')
let isDark = true
themeToggleBtn.onclick = () => {
	calculator.classList.toggle('dark')
	themeToggleBtn.classList.toggle('active')
	isDark = !isDark
}

function addToCurrent(source) {
	if (document.getElementById('stackTop').value == '0') {
		document.getElementById('stackTop').value = source.value
	} else {
		document.getElementById('stackTop').value += source.value
	}
}

function addToStack() {
	validateCurrent()
	document.getElementById('stackBot').value = document.getElementById('stackMid').value
	document.getElementById('stackMid').value = document.getElementById('stackTop').value
	document.getElementById('stackTop').value = 0
	document.getElementById('mJStack').innerHTML = ''
}

function moveBotToMid() {
	document.getElementById('stackMid').value = document.getElementById('stackBot').value
	document.getElementById('stackBot').value = 0
	document.getElementById('mJStack').innerHTML = ''
}

function clearStackTop() {
	document.getElementById('stackTop').value = '0'
	document.getElementById('mJStack').innerHTML = ''
}

function clearStack() {
	clearStackTop()
	document.getElementById('stackMid').value = '0'
	document.getElementById('stackBot').value = '0'
	document.getElementById('mJStack').innerHTML = ''
}

function tooBig(value) {
	if (value > 999999999999) {
		return true
	}
	return false
}

function validate(result) {
	if (tooBig(result)) {
		alert('Za duży wynik')
	} else if (result < 0) {
		alert('Liczba ujemna')
	} else {
		document.getElementById('stackTop').value = result
		moveBotToMid()
	}
}

function validateCurrent() {
	t = document.getElementById('stackTop').value
	result = ''
	for (ch in t) {
		if (!isNaN(t[ch]) && t[ch] != ' ') {
			result += t[ch]
		} else {
			break
		}
	}
	document.getElementById('stackTop').value = result
}

//Math operations

function add() {
	validateCurrent()
	var t = parseInt(document.getElementById('stackTop').value)
	var m = parseInt(document.getElementById('stackMid').value)
	var result = m + t
	validate(result)
}
function subtract() {
	validateCurrent()
	var t = parseInt(document.getElementById('stackTop').value)
	var m = parseInt(document.getElementById('stackMid').value)
	var result = m - t
	validate(result)
}
function multiply() {
	validateCurrent()
	var t = parseInt(document.getElementById('stackTop').value)
	var m = parseInt(document.getElementById('stackMid').value)
	var result = m * t
	validate(result)
}
function divide() {
	validateCurrent()
	var t = parseInt(document.getElementById('stackTop').value)
	var m = parseInt(document.getElementById('stackMid').value)
	var result = Math.round(m / t)
	if (m != 0) {
		validate(result)
	} else {
		alert('Dzielenie przez 0')
	}
}

function mod() {
	validateCurrent()
	var t = parseInt(document.getElementById('stackTop').value)
	var m = parseInt(document.getElementById('stackMid').value)
	if (t != 0) {
		var div = t / m
		document.getElementById('stackTop').value = m % t
		moveBotToMid()
	} else {
		alert('Dzielenie przez 0')
	}
}

function pow() {
	validateCurrent()
	var t = parseInt(document.getElementById('stackTop').value)
	var m = parseInt(document.getElementById('stackMid').value)
	var result = Math.pow(m, t)
	validate(result)
}

function nwd(a, b) {
	while (b) {
		var temp = b
		b = a % b
		a = temp
	}
	return a
}

function gcd() {
	validateCurrent()
	var t = parseInt(document.getElementById('stackTop').value)
	var m = parseInt(document.getElementById('stackMid').value)
	document.getElementById('stackTop').value = nwd(m, t)
	moveBotToMid()
}

function swapxy() {
	validateCurrent()
	var temp = document.getElementById('stackTop').value
	document.getElementById('stackTop').value = document.getElementById('stackMid').value
	document.getElementById('stackMid').value = temp
	document.getElementById('mJStack').innerHTML = ''
}

function addToDict(x, d) {
	if (d[x] == undefined) {
		d[x] = 1
	} else {
		d[x]++
	}
}
function rozloz(x) {
	var dict = new Object()
	var result = x + ' = '
	var i = 2
	var e = Math.floor(Math.sqrt(x))
	while (i <= e) {
		while (x % i == 0) {
			addToDict(i, dict)
			x = Math.floor(x / i)
			e = Math.floor(Math.sqrt(x))
		}
		i++
	}

	if (x > 1) addToDict(x, dict)

	let j = 1
	let dictLen = Object.keys(dict).length
	for (let element in dict) {
		result += element
		if (parseInt(dict[element]) > 1) {
			result += '^' + dict[element]
		}

		if (j < dictLen) {
			result += ' * '
		}
		j++
	}
	return result
}

function frac() {
	validateCurrent()
	var t = parseInt(document.getElementById('stackTop').value)
	document.getElementById('stackTop').value = t
	const node = document.getElementById('mJStack')
	MathJax.typesetClear([node])
	node.innerHTML = '$$'
	node.innerHTML += rozloz(t)
	node.innerHTML += '$$'
	MathJax.typeset()
}

function czyPierwsza(a) {
	for (let i = 2; i <= Math.sqrt(a); i++) {
		if (a % i == 0) {
			return false
		}
	}
	return true
}

function sumOfTwoOdds() {
	validateCurrent()
	var t = parseInt(document.getElementById('stackTop').value)
	if (t % 2 != 0) {
		alert('Działa tylko dla liczb parzystych > 4')
	} else {
		for (let j = 2; j < t - j; j++) {
			if (czyPierwsza(j) && czyPierwsza(t - j)) {
				const result = t.toString() + ' = ' + j.toString() + ' + ' + (t - j).toString()
				const node = document.getElementById('mJStack')
				MathJax.typesetClear([node])
				node.innerHTML = '$$'
				node.innerHTML += result
				node.innerHTML += '$$'
				MathJax.typeset()
				break
			}
		}
	}
}
