//modal scripts
var overlay = document.getElementById('overlay');

function openModal() {
  overlay.classList.remove("is-hidden");
}

function closeModal() {
  overlay.classList.add("is-hidden");
}

document.getElementById('sendMsg').addEventListener('click', function(){
  //check email
  if (validateEmail() == false) {
    return false;
  };
  //check for msg OR subscribe 
  if (validateSubscribeChecked() || validateMsg()) {
    if (validateSubscribeChecked()) {
      subscribeMe();
    };
    if (validateMsg()) {
      sendValues(getFormValues(),validateEmail(),validateMsg());
    };   
  }
  else {
    document.getElementById("sendStatus").innerHTML = "Please add a message or subscribe to the mail list";
    openModal();
  };
});

//SEND FORM VALUES VIA AJAX
function sendValues(str, emailValidation, msgValidation) {
  if (msgValidation && emailValidation) {
    document.getElementById("sendStatus").innerHTML = "Sending...Please wait for confirmation";
    openModal();
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        document.getElementById("sendStatus").innerHTML = xmlhttp.responseText;
        document.getElementById("overlay").style.backgroundColor = "green";
        document.getElementById("overlay").style.borderColor = "green";
      }
    };
    console.log(str);
    //xmlhttp.open("POST", "../control-shift-network-server/sendMail.php", true);
    xmlhttp.open("POST", "https://www.irational.org/rodd/control-shift/sendMail.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("inputFromForm=" + str);
  } else { //not validated
    document.getElementById("sendStatus").innerHTML = "Sorry your mail could not be sent"; //err msg
    return;
  }
}

//GET THE VALUE OF EACH FORM
function getFormValues() {
  var name = document.getElementById("mce-FNAME").value + " " + document.getElementById("mce-LNAME").value;
  var email = document.getElementById("mce-EMAIL").value;
  var msg = document.getElementById("inputMsg").value;
  var values = name + "\n\n" + email + "\n\n" + msg;
  return values;
}

//MSG CHANGED
var textInput = document.getElementById('inputMsg');

textInput.addEventListener('keydown', function(){
  if (document.getElementById('SubscribeCheckBox').checked && textInput.value == "") {
    document.getElementById('sendMsg').innerHTML = "Subscribe";
  } else if(document.getElementById('SubscribeCheckBox').checked == false && textInput.value == ""){
    document.getElementById('sendMsg').innerHTML = "Send";
  } else if(document.getElementById('SubscribeCheckBox').checked){
    document.getElementById('sendMsg').innerHTML = "Send message and Subscribe";
  } else {
    document.getElementById('sendMsg').innerHTML = "Send message";
  };
});


//CHECKBOX TICKED
var checkbox = document.getElementById('SubscribeCheckBox');

checkbox.addEventListener('change', (event) => {
  if (event.target.checked && textInput.value != "") {
    document.getElementById('sendMsg').innerHTML = "Send message and Subscribe";
  }
  else if (event.target.checked) {
    document.getElementById('sendMsg').innerHTML = "Subscribe"
  }
  else if (textInput.value != "") {
    document.getElementById('sendMsg').innerHTML = "Send message";
  }
  else {
    document.getElementById('sendMsg').innerHTML = "Send";
  };
})

//SUBSCRIBE TO MAILCHIMP
function subscribeMe(){
  var options = $('form[name=contactForm]').find('input, email, textarea, select').filter('.mc').serialize();
  console.log(options);

  $.ajax({
    type: "GET", 
    url: "https://irational.org/rodd/control-shift/sendSub.php", 
    //url: "../control-shift-network-server/sendSub.php", 
    data: options,
    cache: false,
    dataType: 'json',
    //contentType: "application/json; charset=utf-8",
    success: function(data){
      console.log(data);
      var data = JSON.parse(data);
      if (data.title == 'Member Exists') {
        document.getElementById("sendStatus").innerHTML = "You are already subscribed to the mail list";
        openModal();
      }
      else {
        document.getElementById("sendStatus").innerHTML = "Thank you, You are now subscribed to our mail list";
        document.getElementById("overlay").style.backgroundColor = "green";
        document.getElementById("overlay").style.borderColor = "green";
        openModal();
      };
    },
    error: function(data){
      document.getElementById("sendStatus").innerHTML = "Sorry something went wrong and we can't subscribe you to the mail list";
      openModal();
      console.log("error: " + JSON.stringify(data) );
    }
  });
}


//CHECK FOR VALID EMAIL
function validateEmail() {
  var x = document.forms["contactForm"]["EMAIL"].value;
  var atpos = x.indexOf("@");
  var dotpos = x.lastIndexOf(".");
  if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= x.length) {
    document.getElementById("sendStatus").innerHTML = "Sorry, please add a valid e-mail address";
    openModal();
    return false;
  } else {
    return true;
  }
}

//CHECK FOR MSG CONTENT
function validateMsg() {
  if (document.forms["contactForm"]["inputMsg"].value != "") {
    return true;
  } else {
    return false;
  }
}

//CHECK FOR SUBSCRIBE CHECKED 
function validateSubscribeChecked() {
  if (document.getElementById('SubscribeCheckBox').checked) {
    return true;
  } else {
    return false;
  }
}
