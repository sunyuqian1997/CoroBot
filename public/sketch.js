var socket;
let speech;

let model;

function setup() {
  // put setup code here
  noCanvas();
  speech  = new p5.Speech('Google UK English Male');

  //createInput();
  input = createInput('talk to me');
  button = createButton('send');
  button.mousePressed(process);
  input.size(200);

  // socket=io.connect('http://localhost:3000');
  // socket.on('feedback',newMessage);
  model = new rw.HostedModel({
  url: "https://corobot-v2-06ea908d.hosted-models.runwayml.cloud/v1/",
  token: "s86GS0THVd18LTvfHWRnyw==",
});

}

function newMessage(data){

var m=data.toString();

fixFeedback(m);

}

function draw() {

}

function fixFeedback(sth){

 var original=new RiString(input.value().toString());
 var r1=new RiString(sth);
var r2=r1.substr(original.length()+1);

//replacement here
var r3=new RiString(r2);
var word=r3.replaceAll('You', 'I').toString();
  var mm='Coronavirus said:  '+word;
  
  createP( mm);
  talk(word);
  talk('got it');
 

}

function talk(words){

   speech.speak(words);
  
}

function process(){
  var s=input.value();
  createP('Human said: ['+s+' ]');

  console.log(s);

  var data=s+".";

    const inputs = {
    "prompt": data,
    "max_characters": 330,
    "top_p": 0.8,
    "seed": 1200
  };
  model.query(inputs).then(outputs => {
    const { generated_text, encountered_end } = outputs;
    // use the outputs in your project
    // console.log(outputs);
   // createP('Corobot said:  '+generated_text);
    fixFeedback(generated_text);
    console.log(generated_text);

  });


}
