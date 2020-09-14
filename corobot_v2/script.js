let speech;
let model;

var state;

var botResponse="Hello human. Nice to meet you.";

var $messages = $('.messages-content'),
    d, h, m,
    i = 0;

$(window).load(function() {
  $messages.mCustomScrollbar();
  setTimeout(function() {
    fakeMessage();
  }, 100);
});


//----p5功能

function setup() {
  // put setup code here
  noCanvas();
  speech  = new p5.Speech('Google UK English Male');
  model = new rw.HostedModel({
  url: "https://corobot-v2-1-4e49f7de.hosted-models.runwayml.cloud/v1/",
  token: "Y5OSMhnzd9H5DHHp+d2SGQ==",
});

}

//----p5功能结束

function updateScrollbar() {
  $messages.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
    scrollInertia: 10,
    timeout: 0
  });
}

function setDate(){
  d = new Date()
  if (m != d.getMinutes()) {
    m = d.getMinutes();
    $('<div class="timestamp">' + d.getHours() + ':' + m + '</div>').appendTo($('.message:last'));
  }
}

//点击send后触发
function insertMessage() {
  msg = $('.message-input').val();
  if ($.trim(msg) == '') {
    return false;
  }
  $('<div class="message message-personal">' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
  setDate();
  $('.message-input').val(null);
  updateScrollbar();

//console.log(model.isAwake());
model.isAwake().then(value=>{
  state=value;
  console.log("isAwake state: "+state);

});

//如果还在唤醒 就加一条 这个promise需要处理
  if (state==false){


    var Fake = [
  "Hello human, I'm waking up. It might take a minute, so please be patient.",
  "Hold on, I'm pretty new to cyberspace. I'm waking up...",
  "Oh please give me few seconds, I'm still waking up! Be patient ",
  "Don't rush. Corobot is charging-up..."
];

var index=Math.floor(Math.random()*Fake.length);  


    botResponse=Fake[index];
    setTimeout(function() {
    //机器人回消息
    fakeMessage();
  }, 100 + (Math.random() * 10) * 50);

console.log("model is waking up");

  }else{

  //——————————————发送msg给runway 测试时不用开——————————————————
    const inputs = {
    "prompt": msg+" ",
    "max_characters": 320,
    "top_p": 0.6,
    "seed": Math.round(Math.random()*1200)  
  };

  model.query(inputs).then(outputs => {
    const { generated_text, encountered_end } = outputs;

 var original=new RiString(msg);
 var r1=new RiString(generated_text);
var r2=r1.substr(original.length()+1);
//replacement here
var r3=new RiString(r2);
var word=r3.replaceAll('You', 'I').toString();
 console.log(generated_text);
    botResponse=r2;

    setTimeout(function() {
    //机器人回消息
    fakeMessage();
  }, 500 + (Math.random() * 10) * 100);

  });

}
  //——————————————发送给runway fin——————————————————

      //botResponse='[I got it!]';
  




  }

$('.message-submit').click(function() {
  insertMessage();
});

$(window).on('keydown', function(e) {
  if (e.which == 13) {
    insertMessage();
    return false;
  }
})



function fakeMessage() {
  if ($('.message-input').val() != '') {
    return false;
  }
  $('<div class="message loading new"><figure class="avatar"><img src="./coro.jpg" /></figure><span></span></div>').appendTo($('.mCSB_container'));
  updateScrollbar();
speech.speak(botResponse);
  setTimeout(function() {
    $('.message.loading').remove();
    $('<div class="message new"><figure class="avatar"><img src="./coro.jpg" /></figure>' + botResponse + '</div>').appendTo($('.mCSB_container')).addClass('new');
    setDate();
    updateScrollbar();
    i++;
  }, 500 + (Math.random() * 20) * 100);

}