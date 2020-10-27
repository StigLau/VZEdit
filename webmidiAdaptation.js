var midi = null;  // global MIDIAccess object
var midiOutPorts = null;
var midiInPorts = null;
var selectedMidiPort = null;
var selectedMidiChannel = null;

var sysexDumpThrottleTimer = null;

var sysexDumpThrottleTimerMs = 300;


function onMIDISuccess(result) {
    console.log("MIDI ready!");
    midi = result;
    storeOutputs(midi);
    if (midiOutPorts.length < 1) {
        onMIDIFailure("No midi ports found")
    }
    console.log(midiOutPorts);
    buildSetupPanel();

    function getMIDIMessage(midiMessage) {
        console.log(midiMessage);
    }

    for (var input of midiInPorts.values()) {
        input.onmidimessage = getMIDIMessage;
    }
}
function onMIDIFailure() {
    console.log("Fardin er ei geit")
}

function storeOutputs(midiAccess) {
    midiOutPorts = new Array(...midiAccess.outputs.values());
    midiInPorts = new Array(...midiAccess.inputs.values());
}

navigator.requestMIDIAccess({ sysex: true }).then(onMIDISuccess, onMIDIFailure);

function sendStuffToSysex(sysexDumpz) {
    console.log(sysexDumpz);

    if (sysexDumpThrottleTimer != null) {
        clearTimeout(sysexDumpThrottleTimer);
    }
    sysexDumpThrottleTimer = setTimeout(function () {
        console.log("Sending some sysex", midiOutPorts);
        selectedMidiPort.send(sysexDumpz);
    }, sysexDumpThrottleTimerMs);
}
