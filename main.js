function preload(){
    classifier=ml5.imageClassifier("DoodleNet")
}
function draw(){
    strokeWeight(13);
    stroke(0);
    if(mouseIsPressed){
        line(pmouseX,pmouseY,mouseX,mouseY);
    }
}
function setup(){
    canvas=createCanvas(280,280);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
    synth=window.speechSynthesis;
}
function classifyCanvas(){
    classifier.classify(canvas,gotResult);
}
function gotResult(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        document.getElementById('label').innerHTML='label: '+results[0].label;
        document.getElementById('confidence').innerHTML='confidence: '+Math.round(results[0].confidence * 100)+'%';
        utterthis=new SpeechSynthesisUtterance(results[0].label);
        synth.speak(utterthis);
    }
}

function clearCanvas(){
    background("white");
}