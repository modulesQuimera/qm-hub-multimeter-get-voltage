module.exports = function(RED) {

    "use strict";
    var mapeamentoNode;

    function getVoltageNode(config) {
        RED.nodes.createNode(this, config);
        this.mapeamento = config.mapeamento
        this.channel_number = config.channel_number
        this.AC_mode = config.AC_mode === "true" ? true : false,
        this.scale = config.scale;
        this.compare_select = config.compare_select;
        // this.equalTo = config.equalTo;
        this.maxValue = config.maxValue;
        this.minValue = config.minValue;
        mapeamentoNode = RED.nodes.getNode(this.mapeamento);
        var node = this
        
        node.on('input', function(msg, send, done) {

            var _compare = {};
            // if (node.compare_select == "equalTo") {
            //     _compare = {
            //         voltage_value: {"==": (!isNaN(parseFloat(node.equalTo)))? parseFloat(node.equalTo):node.equalTo }
            //     }
            // }
            if (node.compare_select == "interval") {
                _compare = {
                    voltage: {">=": parseFloat(node.minValue), "<=": parseFloat(node.maxValue)}
                }
            }
            if (node.compare_select == "maxValue") {
                _compare = {
                    voltage: {">=": null, "<=": parseFloat(node.maxValue)}
                }
            }
            if (node.compare_select == "minValue") {
                _compare = {
                    voltage: {">=": parseFloat(node.minValue), "<=": null}
                }
            }

            var globalContext = node.context().global;
            var exportMode = globalContext.get("exportMode");
            var currentMode = globalContext.get("currentMode");
            var slot = globalContext.get("slot");
            var command = {
                type: " multimeter_modular_V1.0",
                slot: 1,
                method: "get_voltage",
                channel_number: parseInt(node.channel_number),
                AC_mode: node.AC_mode ,
                scale: parseFloat(node.scale),
                compare: _compare
            }
            var file = globalContext.get("exportFile")
            if(currentMode == "test"){file.slots[slot].jig_test.push(command)}
            else{file.slots[slot].jig_error.push(command)}
            globalContext.set("exportFile", file);
            console.log(command)
            send(msg)
        });
    }
    RED.nodes.registerType("getVoltage", getVoltageNode);

    RED.httpAdmin.get("/getMapeamentoMultimetro",function(req,res) {
        console.log(mapeamentoNode)
        if(mapeamentoNode){
            res.json([
                {value:mapeamentoNode.valuePort1, label:"A1 - " + mapeamentoNode.labelPort1, hasValue:false},
                {value:mapeamentoNode.valuePort2, label: "A2 - " + mapeamentoNode.labelPort2, hasValue:false},
                {value:mapeamentoNode.valuePort3, label: "A3 - " + mapeamentoNode.labelPort3, hasValue:false},
                {value:mapeamentoNode.valuePort4, label: "A4 - " + mapeamentoNode.labelPort4, hasValue:false},
                {value:mapeamentoNode.valuePort5, label: "A5 - " + mapeamentoNode.labelPort5, hasValue:false},
                {value:mapeamentoNode.valuePort6, label: "A6 - " + mapeamentoNode.labelPort6, hasValue:false},
                {value:mapeamentoNode.valuePort7, label: "A7 - " + mapeamentoNode.labelPort7, hasValue:false},
                {value:mapeamentoNode.valuePort8, label: "A8 - " + mapeamentoNode.labelPort8, hasValue:false},
                {value:mapeamentoNode.valuePort9, label: "A9 - " + mapeamentoNode.labelPort9, hasValue:false},
                {value:mapeamentoNode.valuePort10, label: "A10 - " + mapeamentoNode.labelPort10, hasValue:false},
                {value:mapeamentoNode.valuePort11, label: "A11 - " + mapeamentoNode.labelPort11, hasValue:false},
                {value:mapeamentoNode.valuePort12, label: "APW - " + mapeamentoNode.labelPort12, hasValue:false},
                {value:mapeamentoNode.valuePort13, label: "AMX - " + mapeamentoNode.labelPort13, hasValue:false},
                {value:mapeamentoNode.valuePort14, label: "B1 - " + mapeamentoNode.labelPort14, hasValue:false},
                {value:mapeamentoNode.valuePort15, label: "B2 - " + mapeamentoNode.labelPort15, hasValue:false},
                {value:mapeamentoNode.valuePort16, label: "B3 - " + mapeamentoNode.labelPort16, hasValue:false},
                {value:mapeamentoNode.valuePort17, label: "B4 - " + mapeamentoNode.labelPort17, hasValue:false},
                {value:mapeamentoNode.valuePort18, label: "B5 - " + mapeamentoNode.labelPort18, hasValue:false},
                {value:mapeamentoNode.valuePort19, label: "B6 - " + mapeamentoNode.labelPort19, hasValue:false},
                {value:mapeamentoNode.valuePort20, label: "B7 - " + mapeamentoNode.labelPort20, hasValue:false},
                {value:mapeamentoNode.valuePort21, label: "B8 - " + mapeamentoNode.labelPort21, hasValue:false},
                {value:mapeamentoNode.valuePort22, label: "B9 - " + mapeamentoNode.labelPort22, hasValue:false},
                {value:mapeamentoNode.valuePort23, label: "B10 - " + mapeamentoNode.labelPort23, hasValue:false},
                {value:mapeamentoNode.valuePort24, label: "B11 - " + mapeamentoNode.labelPort24, hasValue:false},
                {value:mapeamentoNode.valuePort25, label: "BPW - " + mapeamentoNode.labelPort25, hasValue:false},
                {value:mapeamentoNode.valuePort26, label: "BMX - " + mapeamentoNode.labelPort26, hasValue:false},
            ])
        }
        else{
            res.json([
                {label:"A1 - ", value: "0", hasValue:false},
                {label:"A2 - ", value: "1", hasValue:false},
                {label:"A3 - ", value: "2", hasValue:false},
                {label:"A4 - ", value: "3", hasValue:false},
                {label:"A5 - ", value: "4", hasValue:false},
                {label:"A6 - ", value: "5", hasValue:false},
                {label:"A7 - ", value: "6", hasValue:false},
                {label:"A8 - ", value: "7", hasValue:false},
                {label:"A9 - ", value: "8", hasValue:false},
                {label:"A10 - ", value: "9", hasValue:false},
                {label:"A11 - ", value: "10", hasValue:false},
                {label:"APW - ", value: "11", hasValue:false},
                {label:"AMX - ", value: "12", hasValue:false},
                {label:"B1 - ", value: "13", hasValue:false},
                {label:"B2 - ", value: "14", hasValue:false},
                {label:"B3 - ", value: "15", hasValue:false},
                {label:"B4 - ", value: "16", hasValue:false},
                {label:"B5 - ", value: "17", hasValue:false},
                {label:"B6 - ", value: "18", hasValue:false},
                {label:"B7 - ", value: "19", hasValue:false},
                {label:"B8 - ", value: "20", hasValue:false},
                {label:"B9 - ", value: "21", hasValue:false},
                {label:"B10 - ", value: "22", hasValue:false},
                {label:"B11 - ", value: "23", hasValue:false},
                {label:"BPW - ", value: "24", hasValue:false},
                {label:"BMX - ", value: "25", hasValue:false},
            ])
        }
    });
}