prediction = "";

Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot() {
    Webcam.snap(function (data_uri){
        document.getElementById("result").innerHTML = '<img id="image_captured" src="'+data_uri+'"/>';
    });
}

console.log("ml5 version:",ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/Ks4ibiO8l/model.json',modelLoaded);

function modelLoaded() {
    console.log("Model Loaded Successfully!");
}

function speak() {
    var synth = window.speechSynthesis;
    var speak_data = "The Prediction Is "+prediction;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}

function check() {
    img = document.getElementById("image_captured");
    classifier.classify(img, gotResults);
}

function gotResults(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_gesture_name").innerHTML = results[0].label;
        prediction = results[0].label;
        speak();
        if(results[0].label == "COOL"){
            document.getElementById("result_emoji").innerHTML = "&#129304;";
            document.getElementById("quote").innerHTML = "HEY! YOU'RE SO COOL!";
        }
        if(results[0].label == "SUPER"){
            document.getElementById("result_emoji").innerHTML = "&#128076;";
            document.getElementById("quote").innerHTML = "YOU LOOK SUPER HAPPY!";
        }
        if(results[0].label == "VICTORY"){
            document.getElementById("result_emoji").innerHTML = "&#9996;";
            document.getElementById("quote").innerHTML = "CONGRATULATIONS ON YOUR BIG VICTORY";
        }
        if(results[0].label == "FIST BOMB"){
            document.getElementById("result_emoji").innerHTML = "&#9994;";
            document.getElementById("quote").innerHTML = "MAKE A FIST BOMB!";
        }

        if(results[0].label == "GOOD"){
            document.getElementById("result_emoji").innerHTML = "&#128077;";
            document.getElementById("quote").innerHTML = "YOU ARE LOOKING GOOD!";
        }
        if(results[0].label == "HELLO"){
            document.getElementById("result_emoji").innerHTML = "&#128075;";
            document.getElementById("quote").innerHTML = "HELLO! NICE TO MEET YOU..";
        }
    }
}