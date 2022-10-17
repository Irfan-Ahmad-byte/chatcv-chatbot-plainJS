// ===============================================================

document.body.style.boxSizing = "border-box";

// =======================================================================================


import { addChatBot, createInput, botButton, addUserChat, Ask, addBotChat, optionsContainer, removeInput, viewTemplates } from './flow/chatcvbot.js';
import { sendEmail, current_url, windowClose, ValidateEmail, ValidatePhone, shuffle, } from './methods/methods.js';
import { Welcome } from './flow/Welcome.js';


// =*=*=*=*=*=*=*=*=*==*=*=*==**==*=*=*=*==*=*=*=*=*=*=*==*=*==*=*=*==*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=


function chatFlow() {
	addChatBot();
	for (let wel of Welcome()){
		addBotChat(wel);
	}
	Ask.asked = "Vamos iniciar informando seu Nome Completo?";
	removeInput()
	createInput('name', 'seu nome completo')
	addBotChat(Ask.asked);
}


// =======================================================================================
// ================   SECTION PAGE HANDLER   ==================
// open the bot when page loads
document.body.onload = () => {
	
	// current url
	URL = current_url();
	if (URL=="https://chatcv.net/profile-aarn_05/") {
		
		import('./profiles/profile5.js').then(module => {
		 	Ask.section2 = module.section2();
		 	Ask.section3 = module.section3();
		 	Ask.section4 = module.section4();
		 });
		botButton()
		chatFlow()
		 

	} else if (URL== "https://chatcv.net/?page_id=193&preview=true") {
		import('./profiles/profile2.js').then(module => {
		 	Ask.section2 = module.section2();
		 	Ask.section3 = module.section3();
		 	Ask.section4 = module.section4();
		 });
		botButton()
		chatFlow()
	
	} else if (URL=="https://chatcv.net/?page_id=194&preview=true") {
		import('./profiles/profile3.js').then(module => {
		 	Ask.section2 = module.section2();
		 	Ask.section3 = module.section3();
		 	Ask.section4 = module.section4();
		 });
		botButton()
		chatFlow()		
		
	// custom thank you page
	} else if (URL== 'https://chatcv.net/?page_id=10988&preview=true') {
		botButton()
		addChatBot();
		
		addBotChat("Selecione um modelo para prosseguir.");
		viewTemplates()
        	removeInput()
		
	}
}