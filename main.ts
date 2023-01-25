function plotMessage(column: number, id2: number) {
    led.unplot(column, 0)
    led.unplot(column, 1)
    led.unplot(column, 2)
    led.unplot(column, 3)
    led.unplot(column, 4)
    led.plot(column, id2)
}

function flashColumn(column2: number) {
    led.plot(column2, 0)
    led.plot(column2, 1)
    led.plot(column2, 2)
    led.plot(column2, 3)
    led.plot(column2, 4)
    control.waitMicros(250000)
}

function sel_msg() {
    
    if (msgToSend == 0) {
        msgToSend += 1
    } else if (msgToSend == 1) {
        msgToSend += 1
    } else if (msgToSend == 2) {
        msgToSend += 1
    } else if (msgToSend == 3) {
        msgToSend += 1
    } else if (msgToSend == 4) {
        msgToSend = 0
    } else {
        
    }
    
    plotMessage(0, msgToSend)
}

let msgToSend = 0
radio.setTransmitPower(7)
radio.setFrequencyBand(0)
msgToSend = 0
plotMessage(0, msgToSend)
basic.forever(function on_forever() {
    radio.onReceivedValue(function on_received_value(name: string, value: number) {
        if (name == "Unit1Tr") {
            flashColumn(1)
            plotMessage(1, value)
        }
        
    })
    if (input.buttonIsPressed(Button.A)) {
        sel_msg()
        control.waitMicros(250000)
    }
    
    if (input.buttonIsPressed(Button.B)) {
        radio.sendValue("Unit0Tr", msgToSend)
    }
    
})
