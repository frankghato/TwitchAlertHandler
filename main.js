//this is a simplied version of the main project that only reacts to follow alerts, along with displaying the followers name
//it has no evolution functionality
const socketToken = 'insert api token here'; 
const streamlabs = io(`https://sockets.streamlabs.com?token=${socketToken}`, {transports: ['websocket']});

  var start = new Date().getTime();

  var followGif = "gifs/action.gif";
  var defaultGif = "gifs/idle.gif";
  var textColor = "#444444";
  //seconds * 1000
  var followGifLength = 5000;
  var defaultGifLength = 2000;
  
  async function changeWithFollow() 
  {
    var displayImage = document.getElementById('defaultGif');
    displayImage.src = followGif;
  }  
  async function changeToDefault()
  {
    var displayImage = document.getElementById('defaultGif');
    displayImage.src = defaultGif;
  }

  var flag = true;

  streamlabs.on('event', (eventData) => 
  {
    if (eventData.for === 'twitch_account') 
    {
      switch (eventData.type) 
      {
        case 'follow':
          //code to handle follow events
          console.log(eventData.message);
          var followObj = eventData.message;
          var followName = followObj[0].name;
          var displayText = document.getElementById("nameText");
          setTimeout(function()
          {
            displayText.style.webkitTextStroke = "3px black"
            displayText.innerHTML = followName;
            displayText.style.color="white";
            displayText.style.transition = "top 5s linear 0s";
          }, 1000); 
          if(flag)
          {
            setTimeout(function()
            {
              changeWithFollow();
              setTimeout(function()
              {
              displayText.style.webkitTextStroke = "3px black"
              displayText.innerHTML = followName;
              displayText.style.color="white";
              displayText.style.transition = "top 5s linear 0s";
              }, 1000);
              setTimeout(function () 
              {
                changeToDefault()
                
                setTimeout(function ()
                {
                  displayText.style.color= textColor;  
                  displayText.style.webkitTextStroke = textColor;
                }, 500);
              }, followGifLength);
            }, start % 2500);  
            flag=false;
            setTimeout(function()
            {
              flag=true;
            }, 5000);
          }
          break;
        default:
          //default case
          console.log(eventData.message);
      }
    } 
  });
