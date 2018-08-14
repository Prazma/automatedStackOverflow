var issuePort = document.getElementById("issueContainer");
var codePort = document.getElementById("codeContainer");

var languagePort = document.getElementById("languageInfo");

var qPort = document.getElementById("questionerPort");
var loadPort = document.getElementById("loaderPort");

var io = {
    fixCode : function () {
        var issueA = issuePort.value.split(" ");
        var iCode = codePort.value;

        qPort.style.display = "none";
        loadPort.style.display = "block";

        //start interpret and debugging
        document.getElementById("defLoader").style.display = "block";

        //create grammer pattern to get intention of issue
        var gPattern = [];
        for(i=0;i<issueA.length;i++) {
            if(langKeys.verb.indexOf(issueA[i]) != -1 ) {
                gPattern.push("1");
            } else if (langKeys.connectives.indexOf(issueA[i]) != -1 ) {
                gPattern.push("2");
            } else if (langKeys.pointers.indexOf(issueA[i]) != -1 ) {
                gPattern.push("3");
            } else if (langKeys.number.indexOf(issueA[i]) != -1 ) {
                gPattern.push("4");
            } else if (langKeys.features.indexOf(issueA[i]) != -1 ) {
                gPattern.push("5");
            } else if (langKeys.replacement.indexOf(issueA[i]) != -1 ) {
                gPattern.push("6");
            } else if ( langKeys.verb.indexOf(issueA[i]) == -1 && langKeys.connectives.indexOf(issueA[i]) == -1 && langKeys.pointers.indexOf(issueA[i]) == -1 && langKeys.number.indexOf(issueA[i]) == -1 && langKeys.replacement.indexOf(issueA[i]) == -1 && langKeys.features.indexOf(issueA[i]) == -1 ) {
                gPattern.push("7");
            }
        }
        var gPatternS = gPattern.join("");
        console.log("grammer pattern(string) is => " + gPatternS);
        var info = this.encodeLangIntention(gPatternS);
        console.log(info);
    },
    encodeLangIntention : function (patternString) {
        var nounQue = [];
        var patternStringA = patternString.split("");
        console.log(patternStringA);
        //work from here
        for(i=0;i<patternStringA.length;i++){
            if(patternStringA[i] == "7") {
                //this is just the simple version
                nounQue.push(i);
                console.log(patternStringA[i+1]);
                if(patternStringA[i+1] == "3") {
                    if(patternStringA[i+2] == "7") {
                        nounQue[nounQue.length-1] = i + "pnts" + i+2;
                    }
                } else {
                    nounQue[nounQue.length-1] = "invalid";
                }
            }
        }
        //done with noun que
        return nounQue;
    }
}
