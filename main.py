def plotMessage(column: number, id2: number):
    led.unplot(column, 0)
    led.unplot(column, 1)
    led.unplot(column, 2)
    led.unplot(column, 3)
    led.unplot(column, 4)
    led.plot(column, id2)
def flashColumn(column2: number):
    led.plot(column2, 0)
    led.plot(column2, 1)
    led.plot(column2, 2)
    led.plot(column2, 3)
    led.plot(column2, 4)
    control.wait_micros(250000)
def sel_msg():
    global msgToSend
    if msgToSend == 0:
        msgToSend += 1
    elif msgToSend == 1:
        msgToSend += 1
    elif msgToSend == 2:
        msgToSend += 1
    elif msgToSend == 3:
        msgToSend += 1
    elif msgToSend == 4:
        msgToSend = 0
    else:
        pass
    plotMessage(0, msgToSend)
msgToSend = 0
radio.set_transmit_power(7)
radio.set_frequency_band(0)
msgToSend = 0
plotMessage(0, msgToSend)

def on_forever():
    
    def on_received_value(name, value):
        if name == "Unit1Tr":
            flashColumn(1)
            plotMessage(1, value)
    radio.on_received_value(on_received_value)
    
    if input.button_is_pressed(Button.A):
        sel_msg()
        control.wait_micros(250000)
    if input.button_is_pressed(Button.B):
        radio.send_value("Unit0Tr", msgToSend)
basic.forever(on_forever)
