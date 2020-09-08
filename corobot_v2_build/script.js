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

let speech;
let model;

var botResponse;



function setup() {
  // put setup code here
  noCanvas();
  speech  = new p5.Speech('Google UK English Male');
  model = new rw.HostedModel({
  url: "https://corobot-v2-06ea908d.hosted-models.runwayml.cloud/v1/",
  token: "s86GS0THVd18LTvfHWRnyw==",
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

//   //——————————————发送msg给runway 测试时不用开——————————————————
//     const inputs = {
//     "prompt": msg,
//     "max_characters": 320,
//     "top_p": 0.8,
//     "seed": 1200
//   };
//   model.query(inputs).then(outputs => {
//     const { generated_text, encountered_end } = outputs;
//  var original=new RiString(msg);
//  var r1=new RiString(generated_text);
// var r2=r1.substr(original.length()+1);
// //replacement here
// var r3=new RiString(r2);
// var word=r3.replaceAll('You', 'I').toString();
//  console.log(generated_text);
//     botResponse=r3;
//   });
//   //——————————————发送给runway fin——————————————————

      botResponse='[I got it!]';



  setTimeout(function() {
    //机器人回消息
    fakeMessage();
  }, 100 + (Math.random() * 20) * 100);
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

var Fake = [
  'Hi there, I\'m Fabio and you?',
  'Nice to meet you',
  ':)'
]

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
  }, 1000 + (Math.random() * 20) * 100);

}