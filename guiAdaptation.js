function buildSetupPanel() {
    // Port selection.
    let former = document.createElement("form");
    former.id = "midiSetupForm";

    let portSelectLabel = document.createElement("label");
    portSelectLabel.textContent = "Select MIDI Device";

    let portSelecter = document.createElement("select");
    portSelecter.id = "portSelector";
    portSelecter.onchange = function (event) {
        selectedMidiPort = midiOutPorts[event.target.value];
        console.log(selectedMidiPort);
        //sendSysexDump();
        //testTone();   // this is interacting with the sysex change - need to address this longterm, because I think it's useful, but disabled for now
    };

    portSelectLabel.appendChild(portSelecter);
    former.appendChild(portSelectLabel);
    midiOutPorts.forEach(
        function (port, idx) {
            let optioner = document.createElement("option");
            optioner.setAttribute("label", port.name);
            optioner.setAttribute("value", idx);
            portSelecter.appendChild(optioner);
        }, this);
    selectedMidiPort = midiOutPorts[0]; // TODO: check there's not a more idiomatic way of doing this

    // Channel selection
    let channelSelectLabel = document.createElement("label");
    channelSelectLabel.textContent = "Select MIDI Channel";

    let channelSelector = document.createElement("select");
    channelSelector.id = "channelSelector";
    channelSelector.onchange = function (event) {
        selectedMidiChannel = parseInt(event.target.value);
        console.log(selectedMidiChannel);
        //sendSysexDump();
        //testTone();  // this is interacting with the sysex change - need to address this longterm, because I think it's useful, but disabled for now
    };
    channelSelectLabel.appendChild(channelSelector);
    former.appendChild(channelSelectLabel);
    for (let i = 0; i < 16; i++) {
        let optioner = document.createElement("option");
        optioner.setAttribute("label", i + 1);
        optioner.setAttribute("value", i);
        channelSelector.appendChild(optioner);
    }
    selectedMidiChannel = 0;

    document.getElementById("midiSetup").appendChild(former);
}