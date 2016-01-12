// Controls the behavior of the browser action. 
// Probably choose to implement this as an event page


//****Variables****//
var id = "notifId"; //notification ID
var wasCleared = true; //notification clear boolean
var currUrl; //current URL string
var display; //variable for setTimeout 
 
var messages = [
	"I see that you're not on Facebook now. Here, let me open it up for you!",
	"You haven't posted a new selfie in some time. Don't you want a bunch of new likes?",
	"Your prof pic sucks. You should change it.",
	"People are interested in what you ate for lunch! Did you like it? The world needs to know!",
    "Don't you feel lonely? You should cope by obsessively checking on your friends.",
    "We're all alone together in this world. Maybe it'll be less sad if you check your news feed.",
    "Distract yourself from all your anxieties by opening up Facebook. It's okay, we all do it baby.",
    "Checking out your ex's profile one more time won't hurt.",
    "Everyone else Facebook-stalks too, y'know.",
    "Sharing that cat pic might make you more popular.",
    "I don't think you've gotten enough likes today.",
    "I think you have a new message. Or not. You should check anyway.",
    "Your news feed misses you. I miss you."
];

 var titles = [
     "You Need Me.",
     "I Need You.",
     "I Love You.",
     "Don't You Love Me?",
     "Why are you doing this to me?",
     "Stop Ignoring Me.",
     "You Know You Want It.",
     "I Can Give You All That You Want.",
     "I Can Give You All That You Need.",
     "I Will Never Leave You.",
     "Don't leave me.",
     "<3",
     "</3",
     "Why don't you love me anymore?",
	 "Where you been? I can show you incredible things",
	 "It's gonna be forever, or it's gonna go down in flames",
	 "They'll tell you I'm insane. But I've got a blank space baby.",
	 "You belong with me",
	 "They don't get your humor like I do",
	 "Can't you see that I'm the one who understands you?",
	 "I know what you're doing. All the time.",
	 "Let's share secrets baby",
	 "You won't run away from me too, will you?"
     ];

//****//



//****Things to keep running****//

    //open facebook if notification is clicked then clear notification
    chrome.notifications.onClicked.addListener(function(id) { 
	    openFacebook();
	    });

    chrome.notifications.onClicked.addListener(function(id) { 
	    chrome.notifications.clear(id, function(wasCleared) {return id});
	    });
    
    //open facebook if icon is clicked
    chrome.browserAction.onClicked.addListener(function(tab) { openFacebook()});

    //check if on facebook every minute
    setInterval(function() {mainLoopFunction()}, 60000); 

//****//


//****Functions****//

function mainLoopFunction() {
    chrome.notifications.clear(id, function(id) {return id}); //clear the previous notification
    
		// check if current tab is facebook
		chrome.tabs.getSelected(null, function(tab) {
    		    var tabId = tab.id;
    	    	currUrl = tab.url;
    	    	console.log(currUrl);
   			 });
    
    	//create new notification if current tab is not facebook
    //	if (currUrl != "https://www.facebook.com/") {
    	if (currUrl.substring(0,24) != "https://www.facebook.com") {
    		
    		//This executes only once, right? I hope so. yesh.
    		displayMessage();

    	}
    	else {
    		console.log("it thinks we're on facebook");
    	    clearTimeout();
    	};
};
    
    

function openFacebook() {
    chrome.tabs.create({url: "https://www.facebook.com"});
};


 
function displayMessage() {


 	//find a random message to display in the array of messages
 	rand = Math.floor(Math.random() * (messages.length-1));
 	messageToDisplay = messages[rand];
 	
 	//find a random title to display in the array of titles
 	randTitle = Math.floor(Math.random() * (titles.length-1));
 	titleToDisplay = titles[randTitle];
 	
 	// create a new notification with its own random id
 	chrome.notifications.create(id, {type: "basic", 
 			message:messageToDisplay, title:titleToDisplay, iconUrl:"Clingybook-icon.png"}, function(id) {return id});
	
	
	// open facebook in some instances
	if (rand == 0) {
	   openFacebook(); }; //open Facebook if the message is "I've detected..." 
	
};
	

//****//
