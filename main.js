const socketToken = 'insert api token here'; 
const streamlabs = io(`https://sockets.streamlabs.com?token=${socketToken}`, {transports: ['websocket']});

  var start = new Date().getTime();
  
  //paths to gifs
  var defaultGif = "gifs/idle.gif";
  var actionGif = "gifs/action.gif";
  var halfAlertActionGif = "gifs/half_alert_action.gif";
  var fullAlertActionGif = "gifs/full_alert_action.gif";
  var goalGif = "gifs/goal_idle.gif";
  var firstEvolutionGif = "gifs/first_evolution.gif";
  var halfGoalGif = "gifs/half_goal.gif";
  var secondEvolutionGif = "gifs/second_evolution.gif";
  var fullGoalGif = "gifs/full_goal.gif";
  var subGoalGif = "gifs/sub_goal_idle.gif";
  var firstSubEvolutionGif = "gifs/sub_first_evolution.gif";
  var halfSubGoalGif = "gifs/half_sub_goal.gif";
  var secondSubEvolutionGif = "gifs/sub_second_evolution.gif";
  var fullSubGoalGif = "gifs/full_sub_goal.gif";
  var firstAlertEvolutionGif = "gifs/alert_first_evolution.gif";
  var halfAlertGoalGif = "gifs/half_alert_goal.gif";
  var secondAlertEvolutionGif = "gifs/alert_second_evolution.gif";
  var fullAlertGoalGif = "gifs/full_alert_goal.gif";

  //seconds * 1000
  var defaultGifLength = 2000;
  var actionGifLength = 2000;
  var firstEvolutionGifLength = 6000;
  var secondEvolutionGifLength = 6000;
  var firstSubEvolutionGifLength = 6000;
  var secondSubEvolutionGifLength = 6000;
  var firstAlertEvolutionGifLength = 6000;
  var secondAlertEvolutionGifLength = 6000;

  //counting alerts
  var totalSubs = 0;
  var subGoal = 20;
  var totalAlerts = 0;
  var alertGoal = 40;
  var totalDonations = 0;
  var donationGoal = 100;

  //booleans to see if a gif should be played
  var flag = true;
  var isNotHalf = true;
  var isNotFull = true;
  var subIsNotHalf = true;
  var subIsNotFull = true;
  var alertIsNotHalf = true;
  var alertIsNotFull = true;
  
  //checks for the current evolution stage and sets the proper alert response gif
  function changeWithAlert()
  {
    var displayImage = document.getElementById('defaultGif');
    if(!(alertIsNotHalf))
    {
      if(!(alertIsNotFull))
      {
        displayImage.src = fullAlertActionGif;
      }
      else
      {
        displayImage.src = halfAlertActionGif;
      }
    }
    else
    {
      displayImage.src = actionGif;
    }
  }
  
  //checks for the current evolution stage and sets the proper idle gif
  async function changeToDefault()
  {
    var displayImage = document.getElementById('defaultGif');
    if(!(alertIsNotHalf))
    {
      if(!(alertIsNotFull))
      {
        displayImage.src = fullAlertGoalGif;
      }
      else
      {
        displayImage.src = halfAlertGoalGif;
      }
    }
    else
    {
      displayImage.src = defaultGif;
    }
  }
  
  //this function handles the evolution of the donation goal
  //if the total amout of donations is half or more of the overal donation goal, it evolves to stage 2
  //if the total amount of donations is greater than or equal to the donation goal, it evolves to stage 3
  function donationEvolution()
  {
    var donationGoalImage = document.getElementById('goalGif');
    if(totalDonations >= (donationGoal / 2) && isNotHalf)
    {
      donationGoalImage.src = firstEvolutionGif;
      setTimeout(function()
      {
        donationGoalImage.src = halfGoalGif;
      }, firstEvolutionGifLength);
      isNotHalf = false;
    }
    if(totalDonations >= donationGoal && isNotFull)
    {
      donationGoalImage.src = secondEvolutionGif;
      setTimeout(function()
      {
        donationGoalImage.src = fullGoalGif;
      }, secondEvolutionGifLength);
      isNotFull = false;
    }
  }
  
  //this function handles the evolution of the sub goal
  //if the total amout of subscriptions is half or more of the overal sub goal, it evolves to stage 2
  //if the total amount of subscriptions is greater than or equal to the sub goal, it evolves to stage 3
  function subEvolution()
  {
    var subGoalImage = document.getElementById('subGoalGif');
    if(totalSubs >= (subGoal / 2) && subIsNotHalf)
    {
      subGoalImage.src = firstSubEvolutionGif;
      setTimeout(function()
      {
        subGoalImage.src = halfSubGoalGif;
      }, firstSubEvolutionGifLength);
      subIsNotHalf = false;
    }
    if(totalSubs >= subGoal && subIsNotFull)
    {
      subGoalImage.src = secondSubEvolutionGif;
      setTimeout(function()
      {
        subGoalImage.src = fullSubGoalGif;
      }, secondSubEvolutionGifLength);
      subIsNotFull = false;
    }
  }

  //this function handles the evolution of the alert goal
  //if the total amout of alerts is half or more of the overal alert goal, it evolves to stage 2
  //if the total amount of alerts is greater than or equal to the alert goal, it evolves to stage 3
  function alertEvolution()
  {
    var alertImage = document.getElementById('defaultGif');
    if(totalAlerts >= (alertGoal / 2) && alertIsNotHalf)
    {
      alertImage.src = firstAlertEvolutionGif;
      setTimeout(function()
      {
        alertImage.src = halfAlertGoalGif;
      }, firstAlertEvolutionGifLength);
      alertIsNotHalf = false;
    }
    if(totalAlerts >= alertGoal && alertIsNotFull)
    {
      alertImage.src = secondAlertEvolutionGif;
      setTimeout(function()
      {
        alertImage.src = fullAlertGoalGif;
      }, secondAlertEvolutionGifLength);
      alertIsNotFull = false;
    }
  }
  
  //this function function sets each goal to the proper stage for the current total amounts
  function setEvolutions()
  {
    var donationGoalImage = document.getElementById('goalGif');
    var subGoalImage = document.getElementById('subGoalGif');
    var alertImage = document.getElementById('defaultGif');
    if(totalDonations >= (donationGoal / 2))
    {
      donationGoalImage.src = halfGoalGif;
      isNotHalf = false;
    }
    if(totalDonations >= donationGoal)
    {
      donationGoalImage.src = fullGoalGif;
      isNotFull = false;
    }
    if(totalSubs >= (subGoal / 2))
    {
      subGoalImage.src = halfSubGoalGif;
      subIsNotHalf = false;
    }
    if(totalDonations >= donationGoal)
    {
      subGoalImage.src = fullSubGoalGif;
      subIsNotFull = false;
    }
    if(totalAlerts >= (alertGoal / 2))
    {
      alertImage.src = halfAlertGoalGif;
      alertIsNotHalf = false;        
    }  
    if(totalAlerts >= alertGoal)
    {
      alertImage.src = fullAlertGoalGif;
      alertIsNotFull = false;
    }
  }
  
  //when the file loads, load in stored variables and update each goal
  window.addEventListener("load", function()
  {
    //automatically resets to zero on the first of every month
    var date = new Date().getDate();
    if(date === 1)
    {
      localStorage.setItem("subs", 0);
      localStorage.setItem("donations", 0);
      localStorage.setItem("alerts", 0);
    }
    totalSubs = parseInt(localStorage.getItem("subs"));
    totalDonations = parseFloat(localStorage.getItem("donations"));
    totalAlerts = parseInt(localStorage.getItem("alerts"));
    setEvolutions();
  })
  
  //when the file unloads, store variables
  window.addEventListener("unload", function()
  {
    localStorage.setItem('subs', totalSubs);
    localStorage.setItem('donations', totalDonations);
    localStorage.setItem('alerts', totalAlerts);
  })
  
  //this block of code handles each type of alert
  streamlabs.on('event', (eventData) => 
  {
    var start = new Date();
    if(eventData.for === 'streamlabs' && eventData.type === 'donation')
    {
      //code to handle donation events
      console.log(eventData.message);
      var donationObj = eventData.message;
      var donationAmount = donationObj[0].amount;
      if(!(donationObj[0].isTest))
      {
        totalDonations += donationAmount;
        totalAlerts++;
      }
      donationEvolution();
      //the flag allows an animated to be played uninterrupted
      //without it, if events were triggered rapidly the animtion would restart at the moment each alert was received 
      if(flag)
          {
            setTimeout(function()
            {
              changeWithAlert();
              setTimeout(function () 
              {
                changeToDefault()
                alertEvolution();  
              }, actionGifLength);
            }, 0);  
            flag=false;
            setTimeout(function()
            {
              flag=true;
            }, actionGifLength);
          }
    }

    if (eventData.for === 'twitch_account') 
    {
      switch (eventData.type) 
      {
        case 'follow':
          //code to handle follow events
          console.log(eventData.message);
          var followObj = eventData.message;
          if(!(followObj[0].isTest))
          {
            totalAlerts++;
            
          }
          
          if(flag)
          {
            setTimeout(function()
            {
              changeWithAlert();
              setTimeout(function () 
              {
                changeToDefault()
                alertEvolution();
                  
              }, actionGifLength);
            }, 0);  
            flag=false;
            setTimeout(function()
            {
              flag=true;
            }, actionGifLength);
          }
          break;
          
        case 'subscription':
          //code to handle subscription events
          console.log(eventData.message);
          var subObj = eventData.message;
          if(!(subObj[0].isTest))
          {
            totalSubs++;
            totalAlerts++;
          }
          subEvolution();
          if(flag)
          {
            setTimeout(function()
            {
              changeWithAlert();
              setTimeout(function () 
              {
                changeToDefault();
                alertEvolution();  
              }, actionGifLength);
            }, 0);  
            flag=false;
            setTimeout(function()
            {
              flag=true;
            }, actionGifLength);
          }
          break;

        case 'bits':
          //code to handle bits events
          console.log(eventData.message);
          var bitsObj = eventData.message;
          if(!(bitsObj[0].isTest))
          {
            totalAlerts++;
          }
          if(flag)
          {
            setTimeout(function()
            {
              changeWithAlert();
              setTimeout(function () 
              {
                changeToDefault()
                alertEvolution();  
              }, actionGifLength);
            }, 0);  
            flag=false;
            setTimeout(function()
            {
              flag=true;
            }, actionGifLength);
          }
          break;

        case 'host':
          //code to handle host events
          console.log(eventData.message);
          var hostObj = eventData.message;
          if(!(hostObj[0].isTest))
          {
            totalAlerts++;
          }
          if(flag)
          {
            setTimeout(function()
            {
              changeWithAlert();
              setTimeout(function () 
              {
                changeToDefault()
                alertEvolution();  
              }, actionGifLength);
            }, 0);  
            flag=false;
            setTimeout(function()
            {
              flag=true;
            }, actionGifLength);
          }
          break;

        case 'raid':
          //code to handle raid events
          console.log(eventData.message);
          var raidObj = eventData.message;
          if(!(raidObj[0].isTest))
          {
            totalAlerts++;
          }       
          if(flag)
          {
            setTimeout(function()
            {
              changeWithAlert();
              setTimeout(function () 
              {
                changeToDefault();
                alertEvolution();  
              }, actionGifLength);
            }, 0);  
            flag=false;
            setTimeout(function()
            {
              flag=true;
            }, actionGifLength);
          }
          break;

        default:
          //default case
          console.log(eventData.message);
      }
    } 
  });
