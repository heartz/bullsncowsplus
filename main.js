$( document ).ready(function() {
    $("#buttonM").css("display","none");
    $('#tabs a').click(function (e) {
        e.preventDefault();
        $(this).tab('show');
    });
    var triesnum=0;
    var enteredN;
    randomNo = Math.floor(Math.random()*10001);
    tries = [];
    console.log(randomNo)
    function alreadyEntered() {
        enteredN = document.getElementById('enteredNumber').value;
        var numFound = false;
        _.each(tries, function(item) {
            if(item.num === enteredN) {
                numFound = true;
            }
        });
        return numFound;
    };
    function verifyBullsNCows(){
        var bulls = 0, cows = 0;
        var tempRandomNumber = randomNo;
        var tempEnteredNumber = enteredN;

        //Checking for bulls
        for(var i=0;i<4;i++){
            if(tempRandomNumber % 10 == tempEnteredNumber % 10) {
                bulls++;
                if(bulls == 4) {
                    alert("Bingo!");
                    document.location.reload();
                }
            }
            tempRandomNumber = parseInt(tempRandomNumber / 10);
            tempEnteredNumber = parseInt(tempEnteredNumber / 10);
        }
        //Checking for cows
        var tempEnteredNumber = enteredN;
        var tempRandomNumber = randomNo;
        var randDigits = [], enteredDigits = [];
        for(var i = 0; i < 4; i++){
            enteredDigits.push(tempEnteredNumber % 10);
            randDigits.push(tempRandomNumber % 10);
            tempEnteredNumber = parseInt(tempEnteredNumber / 10);
            tempRandomNumber = parseInt(tempRandomNumber / 10);
        }
        for(var i = 0; i < 4; i++) {
            var digit = enteredDigits[i];
            var position = randDigits.indexOf(digit);
            if(position >= 0) {
                randDigits[position] = null;
                cows++;
            }
        }
        cows = cows - bulls;
        sp= $('<span>');
        for (var i = 0; i < bulls; i++) {
            sp.append('<img src=http://sweetclipart.com/multisite/sweetclipart/files/bull.png width=32px height=32px>')
        };
        sp1= $('<span>');
        for (var i = 0; i < cows; i++) {
            sp1.append('<img src="http://images.clipartpanda.com/establishment-clipart-cute-black-and-white-cow-free-clip-art-7510x4240.jpg" width=32px height=32px >');    
        };
        $('<tr>')
            .append($('<td>').text(enteredN))
            .append($('<td>').append(sp))
            .append($('<td>').append(sp1))
            .appendTo($('#tableId'));
        var sumthing= "Total Tries :"+triesnum;
        $('.col-sm-2').text(sumthing)
    };

    function verifyF() {
        triesnum++;
        if(alreadyEntered()) {
            enteredNumber = null;
            return;
        }
        if(enteredN > 0 && enteredN < 10000){
            verifyBullsNCows();
            $('#enteredNumber').val("");
        }
        else{
            $('#enteredNumber').val("");
            $("#buttonM").trigger("click");
            var audioElement = document.createElement('audio');
        	audioElement.setAttribute('src', 'roar.mp3');
        	audioElement.setAttribute('autoplay', 'autoplay');
            audioElement.play();
        }
        enteredN= null;
    };
    $('#checkb').bind('click', verifyF );
    function giveUpF() {
        var msg = "Click OK to give up, Cancel to continue trying.";
        if(confirm(msg)) {
            alert('The number was '+ randomNo);
            document.location.reload();
        }
        else
            return;
    };
    this.testKey = function(evt) {
        if(evt.keyCode === 13) {
            this.verify();
        }
    };
    $('#giveupb').bind('click', giveUpF );
});
