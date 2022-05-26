var letterMap = {
    "A": "1",
    "B": "3",
    "C": "3",
    "D": "2",
    "E": "1",
    "F": "4",
    "G": "2",
    "H": "4",
    "I": "1",
    "J": "8",
    "K": "5",
    "L": "1",
    "M": "3",
    "N": "1",
    "O": "1",
    "P": "3",
    "Q": "10",
    "R": "1",
    "S": "1",
    "T": "1",
    "U": "1",
    "V": "4",
    "W": "4",
    "X": "8",
    "Y": "4",
    "Z": "10"
    
};

function checkword(word){
	var letters = /^[A-Z]+$/;
	if(word.match(letters)){
		return true;
	}
	else{
		return false;
	}
}

function getWordScore(words){
	var c = 0;
	for(var i = 0; i < words.length; i++){
		if((checkword(words)) && (words.length <= 10)){
			c += parseInt(letterMap[words[i]]);
		}
		else{
			c = 0;
			return c;
		}
	}
	return c;
}

function findMaxScore(scoreArray){
    var max = -Infinity;
    var maxIndex = -1;
    
    for(var i = 0; i < scoreArray.length; i++){
        if(scoreArray[i] > max){
            max = scoreArray[i];
            maxIndex = i;
        }
    }
    if(max<=0){
    	max = -Infinity;
    	maxIndex = -1;
        return {max, maxIndex};
    }
    else{
        return {
            max,
            maxIndex
        };
    }
}

function calculate(){
    var input =  document.getElementById("input").value;
    var result = document.getElementById("result");
    var highest = document.getElementById("highest");
    if(input == ""){
    	result.innerHTML = "";
    	highest.innerHTML = "";
    }
    else{
	    var wordsList = input.toUpperCase().split(",");
	    var outputString = "";
	    var scoreArray = [];

	    for(var i = 0; i < wordsList.length; i++){
	        let word = wordsList[i].trim();
	        scoreArray[i] = getWordScore(word);
	        if(scoreArray[i] > 0){
	        	outputString += "<span>" + word + "<sub>" + scoreArray[i] + "</sub></span>";
	        }
	    }
      if(outputString == ""){
          	result.style.width = "0px";
	      	result.style.padding = "0px";
	      	result.innerHTML = "";
	      	highest.innerHTML = "";
      }
      else{
	        result.style.width = "410px";
	        result.style.padding = "20px";
	        result.innerHTML = "<p> Valid words: </p>"
	        result.innerHTML += outputString;

	        var maxScore = findMaxScore(scoreArray);
	        var highword = wordsList[maxScore.maxIndex].trim();

	        highest.style.width = "410px";
	        highest.style.padding = "20px";
	        highest.innerHTML = "<p>Highest Scoring word: </p>";
	        for(var j = 0; j < highword.length; j++){
	          highest.innerHTML += "<span>" + highword[j] + "<sub>" + letterMap[highword[j]] + "</sub></span>";
	        }
	        var spans = highest.getElementsByTagName('span');
	        for(var k = 0; k < spans.length; k++){
	          spans[k].style.animationDelay = 0.2*k + "s";
	        }
     	}
	}
}