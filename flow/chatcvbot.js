
import { sendEmail, current_url, ValidateEmail, ValidatePhone, shuffle, downloadCV, } from '../methods/methods.js';
import { createTemplate } from '../templates-script/createTemplates.js';


// close current window
export const windowClose = () => {
	window.open('','_parent','');
	window.close();
}

// =======================================================================================
//    ****************************  DATA variable Definitions  ***********************
// data variables

let about=false, what_asked=false, done=false  // reference for chat
let name=false,address=false,email=false,phone=false;  // variables to store section 1 data
		// section to store data for section 2 to 9
let section2=[], section3=[], section4=[];
let section5={}, section6=[], section7=[], section8=[], section9=[];

let pt_months = [
	'Janeiro',
	'Fevereiro',
	'Março',
	'Abril',
	'Maio',
	'Junho',
	'Julho',
	'Agosto',
	'Setembro',
	'Outubro',
	'Novembro',
	'Dezembro'
	]

section5['company'] = {}	// an initializer for section 5

		// some initializers for section 5

let company_count = 0
let occupation_count = 0
let edu_temp = []


// *=*=*=*=*=*=*==*=*=*=*=*==*===*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=

// function for interactoable and exportable data options
export function Ask(){
	var asked = false;		// reference to for chat floe
	var section2 = false;	// to modify them from other modules i.e main_chatcv.js file profile pages
	var section3 = false;	// to modify them from other modules i.e main_chatcv.js file profile pages
	var section4 = false;	// to modify them from other modules i.e main_chatcv.js file profile pages
	var email_content = false;		// email content to be accessed and modified from other modules to
	var template = 0;		// as a templates reference for different templates i.e. 1, 2, 3, 4 ......
	var edit = false;	// to edit any section

}

// ========================= ADD MONTH INPUT =========================

export function addMonthInput(){
		let input = document.querySelector('.form-input')
		let mnth = document.createElement('select')
		mnth.setAttribute("name",name)
		mnth.classList.add('date-months')
	
		input.appendChild(mnth)
		for (let mn of pt_months) {
			let month = document.createElement('option')
			month.setAttribute("value",mn)
			month.textContent = mn
			mnth.appendChild(month)
		}
		
		let years = document.createElement('select')
		years.setAttribute("name",name)
		years.classList.add('month-years')
		
		input.appendChild(years)
		let pt_years = [];
		const d = new Date();
		let max_year = d.getFullYear();
		let min_year = max_year - 125;
		for (var i = max_year; i >= min_year; i--) {
			pt_years.push(i)
		}
		
		for (let yr of pt_years) {
			let year = document.createElement('option')
			year.setAttribute("value",yr)
			year.textContent = yr
			years.appendChild(year)
		}
}

export function removeMonthInput(){
		document.querySelector('.date-months').remove()
		document.querySelector('.month-years').remove()
}

// ===================================================
export function addChatBot() {
		/* this function starts the chatbot and add it to the webpage */
    
	// chat container
	const chat_bot = document.createElement('div')
	chat_bot.classList.add('chatbot-chat-container', 'fixed', 'w-screen')
	chat_bot.setAttribute("id","chat-bot");
	chat_bot.style.display = 'block';
	chat_bot.style.scrollBehavior= 'smooth';

	// append to main container
	document.body.appendChild(chat_bot)

	// ======================
	// chat header
	const chat_header_container = document.createElement('div')
	chat_header_container.classList.add('chatbot-chat-inner-container-header-container')

	const chat_header = document.createElement('div')
	chat_header.classList.add('chatbot-chat-inner-container-header', 'text-lg', 'sm:text-xl')
	chat_header.textContent = "Escrevendo Currículo";

	// header bot logo
	const bot_logo = document.createElement('img')
	bot_logo.classList.add('chatbot-chat-inner-container-header-logo')
	bot_logo.src = "https://chatcv.net/wp-content/themes/twentytwentytwo/assets/images/LOGO.png"
	bot_logo.alt = "chatbot logo"

	// add the header and bot logo into the header container
	chat_header_container.appendChild(bot_logo)
	chat_header_container.appendChild(chat_header)

	// append this header container to chat inner container
	chat_bot.appendChild(chat_header_container)

	// ======================
	// message container
	const message_container = document.createElement('div')
	message_container.classList.add('chatbot-message-container', 'basis-3/5')

	// append this to chat inner container
	chat_bot.appendChild(message_container)
	createInput()
	
}

export function removeInput(){
	document.querySelector("#chatbot-input-container").remove();
}

/*
 The following function handles all the text input based sections i.e. SECTION 1, SECTION 5- SECTION 9.
 In future if want to add more text input based sections, they will come in here. But a relative
 reference will have to be given
 If a SECTION contains Options and follows/comes after a text input SECTION, then that SECTION will be
 initialized here. Similarly, if a text input SECTION follows/comes after an Options SECTION, then the
 text input section will be initialized in the optionsContainer function.
 In all the cases except the above mentioned, the text input section will be inserted in the createInput
 function and the Options section will be inserted inside the optionsContainer functions.  
 */
export function createInput(type=false, placeholder=false, name=false){
    /* this method adds input section into the chatbot and handles flow of the bot
    this method along with optionsContainer method makes the flow of the bot
    it uses 2 non-essential parameters:
    type: to specify the type of the input:
    e.g. date for mm/dd/yyy, text for text input, year for year input, month for month and year input
    placeholder: the text to show when using a text input types
    
    */

	// ======================
	// input container
	const input_container = document.createElement('div')
	input_container.classList.add('chatbot-input-container')
	input_container.setAttribute("id","chatbot-input-container")

	// append this to chat inner container
	document.querySelector('.chatbot-chat-container').appendChild(input_container)

	// input

	let input;
	if (type && type!='month'){
		input = document.createElement('textarea')
		input.setAttribute("type",type)
		
	} else if (type && type=='month') {
		input = document.createElement('div')
		input.style.backgroundColor= '#fff'

	} else {
		input = document.createElement('textarea')
		input.setAttribute("type","text")
		console.log('***********>>>>>>>>>>>>>>>>>>>>>>>>>>')
	}
	input.classList.add('form-input')
	
	input.setAttribute("id","chat-input")
	
	input.addEventListener('focus', () => {
			input_container.style.outline = "1px solid rgb(92, 204, 157)";
		})

	input.autofocus = true
	
	if (placeholder){
		input.setAttribute("placeholder",placeholder)
	}
	
	if (type=="month"){
		let mnth = document.createElement('select')
		mnth.setAttribute("name",name)
		mnth.classList.add('calendar','date-months')
		input.appendChild(mnth)
		for (let mn of pt_months) {
			let month = document.createElement('option')
			month.setAttribute("value",mn)
			month.textContent = mn
			mnth.appendChild(month)
		}
		
		let years = document.createElement('select')
		years.setAttribute("name",name)
		years.classList.add('calendar','month-years')
		
		input.appendChild(years)
		let pt_years = [];
		const d = new Date();
		let max_year = d.getFullYear();
		let min_year = max_year - 125;
		for (var i = max_year; i >= min_year; i--) {
			pt_years.push(i)
		}
		
		for (let yr of pt_years) {
			let year = document.createElement('option')
			year.setAttribute("value",yr)
			year.textContent = yr
			years.appendChild(year)
		}
		
	} else if (type=="tel") {
		input.setAttribute("pattern", "[0-9]{2}-[0-9]{5}-[0-9]{4}")
		input.required = true
		
	} else if (type=="email") {
		input.required = true
		
	}
	
	input_container.appendChild(input)

	// input button
	const input_btn = document.createElement('button')
	input_btn.classList.add('form-input-btn')

	input_btn.addEventListener('click', () => {
			let text = input.value;
			if (text) {
				addUserChat(text)
			} else if (document.querySelector('.date-months')){
				let occ_months = document.querySelector('.date-months')
				let occ_years = document.querySelector('.month-years')
				text = `${occ_months.options[occ_months.selectedIndex].text}, ${occ_years.options[occ_years.selectedIndex].text}`
				addUserChat(text)
			};
			
			/* SECTION 1: data intake STARTS here */

			if (text) {
				
				if (Ask.asked== "Vamos iniciar informando seu Nome Completo?") {
					name=text
					localStorage.setItem('name', text);
					if (!Ask.edit) {
						Ask.asked = "Pode fornecer um endereço para contato?"
						addBotChat(Ask.asked);
					} else {
						removeInput()
						addBotChat('Suas informações foram atualizadas.');
						addBotChat(false, ["Clique no botão de seta de revisão para revisar seu conteúdo. Ou você pode selecionar qualquer uma das opções abaixo.",
						"Continuar - vai levá-lo ao próximo passo.",
						"Sair - todos os seus dados serão perdidos.",
						"Reiniciar - começa uma nova conversa."]);
						
						optionsContainer([["Continuar", "Reiniciar", "Sair"], false], [], "auto auto auto")
					}
					
				} else if (Ask.asked== "Pode fornecer um endereço para contato?") {
					address=text
					localStorage.setItem('address', text);
					removeInput()
					if (!Ask.edit) {
						Ask.asked = "Pode também fornecer um e-mail para contato?"
						addBotChat(Ask.asked, "Por favor usar o mesmo e-mail durante nossa conversa !!!");
						createInput('email', 'seu email')
					} else {
						addBotChat('Suas informações foram atualizadas.');
						addBotChat(false, ["Clique no botão de seta de revisão para revisar seu conteúdo. Ou você pode selecionar qualquer uma das opções abaixo.",
						"Continuar - vai levá-lo ao próximo passo.",
						"Sair - todos os seus dados serão perdidos.",
						"Reiniciar - começa uma nova conversa."]);
						
						optionsContainer([["Continuar", "Reiniciar", "Sair"], false], [], "auto auto auto")
					}
					
				} else if (Ask.asked== "Pode também fornecer um e-mail para contato?" || Ask.asked== "Favor fornecer um e-mail válido.") {
					let valid = ValidateEmail(input)
					if (valid) {
						email = text
						localStorage.setItem('email', text);
						removeInput()
						if (!Ask.edit) {
							Ask.asked = "Pode fornecer um número de telefone para contato?"
							addBotChat(Ask.asked, 'Favor usar somente números!!!');
							createInput('tel', 'seu numero de telefone')
						} else {
							addBotChat('Suas informações foram atualizadas.');
							addBotChat(false, ["Clique no botão de seta de revisão para revisar seu conteúdo. Ou você pode selecionar qualquer uma das opções abaixo.",
							"Continuar - vai levá-lo ao próximo passo.",
							"Sair - todos os seus dados serão perdidos.",
							"Reiniciar - começa uma nova conversa."]);
						
							optionsContainer([["Continuar", "Reiniciar", "Sair"], false], [], "auto auto auto")
						}
						
					} else {
						Ask.asked = "Favor fornecer um e-mail válido."
						addBotChat(Ask.asked);
					}

				} else if (Ask.asked== "Pode fornecer um número de telefone para contato?" || Ask.asked== "Por favor insira um número de telefone válido.") {
					let validate = ValidatePhone(input)
					if (validate){
						phone = text
						localStorage.setItem('phone', text);
						removeInput();
            /* SECTION 1: data intake ENDS here*/   
            /* SECTION 2-4 flow is intialzed here*/
            /* SECTION 2 flow data intake STARTS here*/
            					if (!Ask.edit) {
							optionsContainer(Ask.section2, section2, "auto", "EXPERIÊNCIA", "section2", true, true)
							
						} else {
							addBotChat('Suas informações foram atualizadas.');
							addBotChat(false, ["Clique no botão de seta de revisão para revisar seu conteúdo. Ou você pode selecionar qualquer uma das opções abaixo.",
							"Continuar - vai levá-lo ao próximo passo.",
							"Sair - todos os seus dados serão perdidos.",
							"Reiniciar - começa uma nova conversa."]);
						
							optionsContainer([["Continuar", "Reiniciar", "Sair"], false], [], "auto auto auto")
					}                 
					
					} else {
						Ask.asked = "Por favor insira um número de telefone válido."
						addBotChat(Ask.asked,false, 'Favor não usar símbolos');
					}
				}
                
  
			/* 'Cuz here optionsContaIner has been called, now we should understand that
					the next section is inside the optionsContainer function */

			/* SECTION 2: data intake ENDS here*/
			/* Here SECTION2 is just being referenced and initialized, but being handled by the optionsContainer function */
			/* SECTION 2-4 contain options, therefore they are now handled by optionsContainer function */
			/* SECTION */

				/* SECTION 5 is being handled here */
				 else if (Ask.asked == "Qual o nome da empresa ou empregador? Citar mais recente para mais antiga.") {
					// save company name
					section5['company'][company_count]['name'] = text
					// ask the role in the company
					Ask.asked = "Qual foi a sua ocupação, posição ou função nesta empresa?"
                    			addBotChat(Ask.asked)
					
				// if user entered role in the company
				} else if (Ask.asked == "Qual foi a sua ocupação, posição ou função nesta empresa?") {
					// increase occupation_count by 1
					occupation_count++
					// occupation in the company is also a dictionary
					// containing occupation_count
					section5['company'][company_count]['occupation'][occupation_count] = {}
							// occupation_count is a dictionary
								// containing occupation name, begin, end, roles
								// rols is an Array
				
					// for the company and occupation save the name
					section5['company'][company_count]['occupation'][occupation_count]['name'] = text
					// for the company and the occupation create a roles Array
					section5['company'][company_count]['occupation'][occupation_count]['roles'] = []
					// ask date of start
					Ask.asked = 'Quando você começou?'
					addBotChat(Ask.asked)
					removeInput()
					createInput('month',false,'occupation')
					
				// if user entered start date
				} else if (Ask.asked == 'Quando você começou?') {
					// save start date for the occupation of the company
					section5['company'][company_count]['occupation'][occupation_count]['begin'] = text
					// ask last date of the occupation
					Ask.asked = 'Quando terminou esta ocupação?'
					addBotChat(Ask.asked)
					
				// if user entered last date of the occupation
				} else if (Ask.asked == 'Quando terminou esta ocupação?') {
					// save end date for the occupation of the company
					section5['company'][company_count]['occupation'][occupation_count]['end'] = text
					// ask fot responsibilities under the occupation
					Ask.asked = 'Qual era sua responsabilidade?'
					addBotChat(Ask.asked)
					removeInput()
					createInput()
					
				// if entered the role in the occupation
				} else if (Ask.asked == 'Qual era sua responsabilidade?') {
					// save the role in the roles array of the occupation of the company
					section5['company'][company_count]['occupation'][occupation_count]['roles'].push(text)
					// ask if want to add more responsibility
					// take to under line 184
					removeInput();
					Ask.asked = 'Gostaria de acrescentar mais uma responsabilidade?'
					addBotChat(Ask.asked)
					optionsContainer([["sim", "não"], false], [], "auto auto")
					
			/* SECTION 6 is initiated here */
				// if asked for year of degree completion
				} else if (Ask.asked == 'Qual foi o ano de conclusão?') {
					edu_temp = []
					// save the data
					edu_temp.push(text)
					// ask for name of university
					Ask.asked = 'Insira o nome da universidade, colégio ou escola.'
					addBotChat(Ask.asked)
					removeInput()
					createInput()
					
				// if asked for name of university
				} else if (Ask.asked == 'Insira o nome da universidade, colégio ou escola.') {
					edu_temp.push(text)
					// ask if the user is a graduate
					Ask.asked = 'Qual é a situação do seu diploma?'
					addBotChat(Ask.asked)
					removeInput()
					optionsContainer([["concluído", "em curso"], false], [], "auto auto")
					
				// if asked for location of the school/uni
				} else if (Ask.asked == 'Em qual cidade?') {
					edu_temp.push(text)
					// ask if the user wants to repeat SECTION 6 / add another degree
					section6.push(edu_temp)
					Ask.asked = 'Você quer adicionar outro grau?'
					addBotChat(Ask.asked)
					
					optionsContainer([["sim", "não"], false], [], "auto auto")
					removeInput();
					
			/* SECTION 7 starts here */
				// if asked for course type
				} else if (Ask.asked == 'Qual é o tipo de curso?') {
					edu_temp = []
					edu_temp.push(text)
					// ask institute name
					Ask.asked = 'Quando você concluiu este curso?'
					addBotChat(Ask.asked)
					removeInput()
					createInput('month', false, 'course')
					
					// if asked for institute name
				} else if (Ask.asked == 'Quando você concluiu este curso?') {
					edu_temp.push(text)
					// ask location/city 
					Ask.asked = 'Qual o nome da instituição onde você fez o curso?'
					addBotChat(Ask.asked)
					removeInput()
					createInput('text', false)
					
				// if asked for institute location
				} else if (Ask.asked == 'Qual o nome da instituição onde você fez o curso?') {
					edu_temp.push(text)
					// ask location/city 
					Ask.asked = 'Pode informar onde se localiza essa instituição?'
					addBotChat(Ask.asked)
					
				// if asked for institute location
				} else if (Ask.asked == 'Pode informar onde se localiza essa instituição?') {
					edu_temp.push(text)
					section7.push(edu_temp)
					// ask if user wants to add another course type
					Ask.asked = 'Deseja adicionar curso na seção TREINAMENTOS E/OU ESPECIALIZAÇÕES?'
					addBotChat(Ask.asked)
					optionsContainer([["sim", "não"], false], [], "auto auto")
					removeInput();
					
			/* SECTION 8 starts here */
				// if asked for langauge
				} else if (Ask.asked == 'Qual idioma?') {
					edu_temp = []
					edu_temp.push(text)
					// ask the language proficiency
					Ask.asked = 'Qual é a sua proficiência no idioma?'
					addBotChat(Ask.asked)
					addBotChat(false,['básico: não tem nível para desempenhar trabalho.',
							'intermediário: conduz conversação em diferentes situações e tem proficiência limitada para trabalhar.',
							'avançado: tem habilidade para conversas complexas, fala bem e escreve bem.',
							'proficiente/fluente: capacidade de fluir e dominar fala, leitura e escrita como nativo.'])
                    			
					optionsContainer([["básico", "intermediário", 'avançado', 'proficiente/fluente'], false], [], "auto auto auto auto")
                    			removeInput()
	
			/* SECTION 9 starts here */
				// if asked title of the certificate
				} else if (Ask.asked == 'Qual é o título da bolsa, prêmio, certificado?') {
					edu_temp = []
					edu_temp.push(text)
					// ask name of the institute
					Ask.asked = 'Qual o nome da entidade atribuidora?'
					addBotChat(Ask.asked)
					removeInput()
					createInput()
				
				//  if asked name of the institute
				} else if (Ask.asked == 'Qual o nome da entidade atribuidora?') {
					edu_temp.push(text)
					// ask location/city of the institute
					Ask.asked = 'Onde se localiza essa entidade?'
					addBotChat(Ask.asked)
				
				// if asked name of the institute
				} else if (Ask.asked == 'Onde se localiza essa entidade?') {
					edu_temp.push(text)
					// ask month/year of the certificate
					Ask.asked = 'Quando você conseguiu?'
					addBotChat(Ask.asked)
					removeInput()
					createInput('month', false, 'certificate')
				
				// if asked location/city of the institute
				} else if (Ask.asked == 'Quando você conseguiu?') {
					edu_temp.push(text)
					section9.push(edu_temp)
					// ask if wants to add another cert
					Ask.asked = 'Deseja adicionar outra bolsa, prêmio, certificado?'
					addBotChat(Ask.asked)
				
					optionsContainer([["sim", "não"], false], [], "auto auto")
					removeInput();
	
				}
					
			}
			const message_container = document.querySelector(".chatbot-message-container");
			message_container.scrollTop = message_container.scrollHeight;
			
			input.value = "";
		})


	//==================
	// handle Enter keypress event
	input.addEventListener("keypress", function(event) {
	// If the user presses the "Enter" key on the keyboard
	if (event.key === "Enter") {
		// Cancel the default action, if needed
		event.preventDefault();
		// Trigger the button element with a click
		input_btn.click();
	}
	});
	//==================

	input_container.appendChild(input_btn)

	// svg in button
	const svg2 = document.createElement("img");
	svg2.src = "https://chatcv.net/wp-content/themes/twentytwentytwo/assets/images/send.svg";
	svg2.alt = "send icon";
	svg2.classList.add('chatbot-send-btn-icon')

	input_btn.appendChild(svg2)
}


// =======================================================================================
// add a bot button in the DOM, below right corner of the window
	// button element
export function botButton() {
		// add a svg to button
			// create svg of button
	const svg = document.createElement("img");
	svg.src = "https://chatcv.net/wp-content/themes/twentytwentytwo/assets/images/chatbot.svg";
	svg.alt = "chatbot icon";
	svg.classList.add('bot-btn-icon', 'object-cover', 'object-cover', 'rounded-full', 'p-3.5', 'h-16', 'w-16', 'bottom-12', 'md:bottom-6','lg:bottom-6','xl:bottom-6', '2xl:bottom-6', 'right-3.5')

	svg.onclick = ()=> {
		const bot_block = document.getElementById("chat-bot");
		if (bot_block) {
			if (bot_block.style.display=="block") {
				bot_block.style.display="none";
			} else {
				bot_block.style.display="block";
			}
		}
	};


	// =======================================================================================
	// insert bot container into body and btn and chat container into container

	//document.body.appendChild(bot_container);
	document.body.appendChild(svg);
}


// =====================================================================================================
// function to toggle review show and hide
export function toggleReview(){
	document.querySelector('.review-container').classList.toggle('show')
	document.querySelector('.hide-btn').classList.toggle('rotate-180')
}

export function removeReview(){
	document.querySelector('.review-container').remove()
	document.querySelector('.hide-btn').remove()
}

// function to add and remove review section
export function Hide() {
	// button to hide review container
	const hide_button = document.createElement("img");
	hide_button.src = "https://chatcv.net/wp-content/themes/twentytwentytwo/assets/images/hide.svg";
	hide_button.alt = "chatbot icon";
	hide_button.classList.add('hide-btn', 'animate-pulse', 'object-cover', 'object-cover', 'rounded-full', 'p-3.5', 'h-16', 'w-16', 'right-3.5', 'top-2/4', 'rotate', 'rotate-180')
	
	hide_button.onclick = () => {
		toggleReview()
	}
	
	document.body.appendChild(hide_button)
}


// ================================================================================================
// function for review section
export function addReviewSection() {
	// review container
	const review_container = document.createElement('div')
	review_container.classList.add('review-container', 'absolute', 'right-0', 'top-28', 'md:right-10', 'lg:right-10', 'xl:right-10', '2xl:right-10')
	review_container.style.display = 'block'
	review_container.style.transition = ".5s ease-in-out";

	// inner review container
	const review_container_inner = document.createElement('div')
	review_container_inner.classList.add('review-inner-container', 'grid', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-2', 'xl:grid-cols-2', '2xl:grid-cols-2')
	
	const review_header = document.createElement('p')
	review_header.classList.add('review-container-header', 'flex', 'justify-between')
	const head_text = document.createElement('span')
	head_text.classList.add('review-container-header-text')
	head_text.textContent = 'Clique no título da seção para revisar seu conteúdo'
	
	review_header.appendChild(head_text)
	
	
	// left container for view of list
	const elements_left_view = document.createElement('div')
	elements_left_view.classList.add('elements-left-view')
	
	let left_view_text;
	left_view_text = document.createElement('p')
	left_view_text.classList.add('left-review-option-text')
	left_view_text.textContent = 'Selecione uma opção para revisar seu conteúdo.';
	
	// right container for items list
	const elements_right_options = document.createElement('div')
	elements_right_options.classList.add('elements-right-options')
	
	
	const elements_list = document.createElement('ul')
	elements_list.classList.add('review-elements-list')

	const data_info = ['Nome','Endereço','email','Telefone','EXPERIÊNCIA EM','CAPACIDADES E HABILIDADES', 'CONHECIMENTO DE FERRAMENTAS', 'HISTÓRICO PROFISSIONAL', 'HISTÓRICO ACADÊMICO E/OU EDUCACIONAL', 'TREINAMENTOS E/OU ESPECIALIZAÇÕES', 'PROFICIÊNCIA EM IDIOMAS', 'PRÊMIOS, BOLSAS, CERTIFICAÇÕES E LICENÇAS']
	
	let review;
	
	const edit_btn = document.createElement('button')
	edit_btn.classList.add('edit-btn')
	edit_btn.textContent = 'editar'
	edit_btn.onclick = () => {
	
		toggleReview()
		
		if (Ask.edit=="name") {
			localStorage.removeItem('name');
			Ask.asked = "Vamos iniciar informando seu Nome Completo?";
			addBotChat(Ask.asked);
			createInput()
		} else if (Ask.edit=="address") {
			localStorage.removeItem('address');
			Ask.asked = "Pode fornecer um endereço para contato?"
			addBotChat(Ask.asked);
			createInput()
		} else if (Ask.edit=="email") {
			localStorage.removeItem('email');
			Ask.asked = "Pode também fornecer um e-mail para contato?"
			addBotChat(Ask.asked, "Por favor usar o mesmo e-mail durante nossa conversa !!!");
			createInput('email', 'seu email')
		} else if (Ask.edit=="phone") {
			localStorage.removeItem('phone');
			Ask.asked = "Pode fornecer um número de telefone para contato?"
			addBotChat(Ask.asked, 'Favor usar somente números!!!');
			createInput('tel', 'seu numero de telefone')
		} else if (Ask.edit=="section2") {
			localStorage.removeItem('section2');
			optionsContainer(Ask.section2, section2, "auto", "EXPERIÊNCIA", false, true, true)
		} else if (Ask.edit=="section3") {
			localStorage.removeItem('section3');
			optionsContainer(Ask.section3, section3, "auto", "CAPACIDADES E HABILIDADES", false, true, true)
		} else if (Ask.edit=="section4") {
			localStorage.removeItem('section4');
			optionsContainer(Ask.section4, section4, "auto auto auto", "CONHECIMENTO DE FERRAMENTAS", false, true, true)
		} else if (Ask.edit=="section5") {
			section5['company']={}
			localStorage.removeItem('section5');
			Ask.asked = "Qual o nome da empresa ou empregador? Citar mais recente para mais antiga."
                   	addBotChat(Ask.asked)
                   	createInput()
		} else if (Ask.edit=="section6") {
			localStorage.removeItem('section6');
			Ask.asked = 'Qual foi o ano de conclusão?'
			addBotChat(Ask.asked)
			createInput('month', false, false)
		} else if (Ask.edit=="section7") {
			localStorage.removeItem('section7');
			Ask.asked = 'Qual é o tipo de curso?'
			addBotChat(Ask.asked)
			createInput()
		} else if (Ask.edit=="section8") {
			localStorage.removeItem('section8');
			Ask.asked = 'Qual idioma?'
			addBotChat(Ask.asked)
			createInput()
		} else if (Ask.edit=="section9") {
			localStorage.removeItem('section9');
			Ask.asked = 'Qual é o título da bolsa, prêmio, certificado?'
			addBotChat(Ask.asked)
			createInput()
		}
		
	}
	
	for (let point of data_info) {
		const review_list_option = document.createElement('li')
		review_list_option.classList.add('review-list-option')
		review_list_option.textContent = point;

		review_list_option.onclick = () => {
            		
            		left_view_text.remove()
           		
           		const review_container = document.createElement('div')
			review_container.classList.add('review-reviewer')
			
			const option_value = review_list_option.textContent
			
			if ( option_value==data_info[0] ){
				Ask.edit="name"
				review = document.createElement('span')
				review.textContent = localStorage.getItem('name');
				
			} else if ( option_value==data_info[1] ){
				Ask.edit="address"
				review = document.createElement('span')
				review.textContent = address
				
			} else if ( option_value==data_info[2] ){
				Ask.edit="email"
				review = document.createElement('span')
				review.textContent = email

			} else if ( option_value==data_info[3] ){
				Ask.edit="phone"
				review = document.createElement('span')
				review.textContent = phone

			} else if ( option_value==data_info[4] ){
				Ask.edit='section2'
				if (section2.length>0){
					review = document.createElement('ul')
					for(let info of section2){
						let re_review = document.createElement('li')
						re_review.textContent = info
						review.appendChild(re_review)
					}
					
				} else {
					review = document.createElement('span')
					review.textContent = 'Você não inseriu dados nesta seção.'
				}
				
			} else if ( option_value==data_info[5] ){
				Ask.edit='section3'
				if (section3.length>0){
					review = document.createElement('ul')
					for(let info of section3){
						let re_review = document.createElement('li')
						re_review.textContent = info
						review.appendChild(re_review)
					}
					
				} else {
					review = document.createElement('span')
					review.textContent = 'Você não inseriu dados nesta seção.'
				}
				
			} else if ( option_value==data_info[6] ){
				Ask.edit='section4'
				if (section4.length>0){
					review = document.createElement('ul')
					for(let info of section4){
						let re_review = document.createElement('li')
						re_review.textContent = info
						review.appendChild(re_review)
					}
					
				} else {
					review = document.createElement('span')
					review.textContent = 'Você não inseriu dados nesta seção.'
				}
				
			} else if ( option_value==data_info[7] ){
				Ask.edit='section5'
				let keys = Object.keys(section5['company'])
				if (keys.length>0){
					review = document.createElement('ul')
					for(let info of keys){
						let re_review = document.createElement('li')
						let re_review_info = document.createElement("span")
						re_review_info.textContent = section5['company'][info]['name']
						re_review.appendChild(re_review_info)
						
						let occ_keys = Object.keys(section5['company'][info]['occupation'])
						
						let re_review_2 = document.createElement('div')
						for(let ok of occ_keys){
							let re_review_3 = document.createElement('div')
							
							let re_review_4 = document.createElement('span')
							re_review_4.textContent = section5['company'][info]['occupation'][ok]['name'] + ', '
							re_review_3.appendChild(re_review_4)
							
							let re_review_5 = document.createElement('span')
							re_review_5.textContent = section5['company'][info]['occupation'][ok]['begin'] +'  -  '
							re_review_3.appendChild(re_review_5)

							
							let re_review_6 = document.createElement('span')
							re_review_6.textContent = section5['company'][info]['occupation'][ok]['end']
							re_review_3.appendChild(re_review_6)
							
							re_review_2.appendChild(re_review_3)
							
							let re_review_7 = document.createElement('div')
							re_review_7.textContent = section5['company'][info]['occupation'][ok]['roles']
							re_review_2.appendChild(re_review_7)
						}
						
						re_review.appendChild(re_review_2)
						
						review.appendChild(re_review)
					}
					
				} else {
					review = document.createElement('span')
					review.textContent = 'Você não inseriu dados nesta seção.'
				}
				
			} else if ( option_value==data_info[8] ){
				Ask.edit='section6'
				if (section6.length>0){
					review = document.createElement('ul')
					for(let info of section6){
						let re_review = document.createElement('li')
						re_review.textContent = info
						review.appendChild(re_review)
					}
					
				} else {
					review = document.createElement('span')
					review.textContent = 'Você não inseriu dados nesta seção.'
				}
				
			} else if ( option_value==data_info[9] ){
				Ask.edit='section7'
				if (section7.length>0){
					review = document.createElement('ul')
					for(let info of section7){
						let re_review = document.createElement('li')
						re_review.textContent = info
						review.appendChild(re_review)
					}
					
				} else {
					review = document.createElement('span')
					review.textContent = 'Você não inseriu dados nesta seção.'
				}
				
			} else if ( option_value==data_info[10] ){
				Ask.edit='section8'
				if (section8.length>0){
					review = document.createElement('ul')
					for(let info of section8){
						let re_review = document.createElement('li')
						re_review.textContent = info
						review.appendChild(re_review)
					}
					
				} else {
					review = document.createElement('span')
					review.textContent = 'Você não inseriu dados nesta seção.'
				}
				
			} else if ( option_value==data_info[11] ){
				Ask.edit='section9'
				if (section9.length>0){
					review = document.createElement('ul')
					for(let info of section9){
						let re_review = document.createElement('li')
						re_review.textContent = info
						review.appendChild(re_review)
					}
					
				} else {
					review = document.createElement('span')
					review.textContent = 'Você não inseriu dados nesta seção.'
				}
				
			}
            		
            		left_view_text = document.createElement('p')
			left_view_text.classList.add('left-review-option-text')
			left_view_text.appendChild(review)
            		elements_right_options.appendChild(left_view_text)
            		elements_right_options.appendChild(edit_btn)
		}
		
		elements_list.appendChild(review_list_option)
	}
	elements_left_view.appendChild(elements_list)
	review_container_inner.appendChild(elements_left_view)
	elements_right_options.appendChild(left_view_text)
	review_container_inner.appendChild(elements_right_options)
	review_container.appendChild(review_header)
	review_container.appendChild(review_container_inner)

	const message_container = document.querySelector(".chatbot-message-container");
	document.querySelector('.chatbot-chat-container').appendChild(review_container);
	message_container.scrollTop = message_container.scrollHeight;

}
// ()
// ===================================================================================================================================
 
export function addUserChat(text) {
	// function to add user's chat in the message box
	
	// user chat container
	const user_chat_container = document.createElement('div')
	user_chat_container.classList.add('user_chat_container', 'flex', 'justify-end')
    	
    	// user chat message
	const user_chat_message = document.createElement('div')
	user_chat_message.classList.add('user_chat_message', 'text-base')
	user_chat_message.textContent = text;
	
	// message side triangle
	const side = document.createElement('div')
	side.classList.add('user_chat_message_right_triangle')
  	user_chat_message.appendChild(side)
	
	// avatar svg
	const user_avatar_svg = document.createElement('img')
	user_avatar_svg.src = "https://chatcv.net/wp-content/themes/twentytwentytwo/assets/images/user.svg";
	user_avatar_svg.alt = "user avatar";
	user_avatar_svg.classList.add('user_avatar_svg', 'object-cover', 'rounded-full');
	
	// add user chat to user chat container
	user_chat_container.appendChild(user_chat_message)
	
	// add user avatar to user chat container
	user_chat_container.appendChild(user_avatar_svg)
	
	
	// finally add this chat to the message container
	const message_container = document.getElementsByClassName("chatbot-message-container")[0];
	message_container.appendChild(user_chat_container);
	message_container.scrollTop = message_container.scrollHeight;
}

// *************************************



// typing effect
/*let j = 0;
let txt = false
let elem = false
var speed = 50;

function typeWriter() {
  if (j < txt.length) {
    elem.innerHTML += txt.charAt(j);
    j++;
    setTimeout(typeWriter, speed);
  }
}

function addFlag(parent, child, flag){
	if (flag){
		parent.appendChild(child)
		j = 0
		elem = child
		txt = flag
		typeWriter()
	}
	
}


export function addBotChat(text=false, flag=false, flow_chat=false) {*/

	/*set flow_chat= true if bot is messages are being sent in a flow*/
	// function to add bot's chat in the message box
	
	
/*	// bot chat container
	let bot_chat_container = document.createElement('div')
	bot_chat_container.classList.add('bot_chat_container', 'flex', 'justify-start')

	// bot chat message
	const bot_chat_message = document.createElement('div')
	bot_chat_message.classList.add('bot_chat_message','text-base')
	
	// message side triangle
	const left_side = document.createElement('div')
	left_side.classList.add('bot_chat_message_indicator')

	const bot_avatar = document.createElement('img')
	bot_avatar.classList.add('bot_avatar', 'object-cover', 'rounded-full')
	bot_avatar.src = "https://chatcv.net/wp-content/themes/twentytwentytwo/assets/images/chatbot.svg";
    	bot_avatar.alt = "bot avatar";
	
    	if (flow_chat) {
    		bot_chat_message.classList.add('bot_chat_message_followup')
    	}
    	
	// a flag message below original message to show limits or additional note related to the text
    	let note = false;
	if (flag) {
		note = document.createElement('div')
		note.classList.add('bot_chat_message_note')
	}

	bot_chat_message.appendChild(left_side)
	// user avatar
	// add bot avatar to bot chat container
	if (!flow_chat){
		bot_chat_container.appendChild(bot_avatar)
	}
	
	// finally add this chat to the message container
	const message_container = document.querySelector(".chatbot-message-container");

	// add user chat to bot chat container
	bot_chat_container.appendChild(bot_chat_message)
	
	message_container.appendChild(bot_chat_container);
	message_container.scrollTop = message_container.scrollHeight;
	if (text){
		j = 0
		elem = bot_chat_message
		txt = text
		typeWriter()
		setTimeout(addFlag,(text.length+5)*50, bot_chat_message, note, flag)
		
	} else if (!text && flag) {
		addFlag(bot_chat_message, note, flag)
	}
	
	message_container.scrollTop = message_container.scrollHeight;
}*/


export function addBotChat(text=false, flag=false) {

	/*set flow_chat= true if bot is messages are being sent in a flow*/
	// function to add bot's chat in the message box
	
	let text_list;
	if (typeof text === 'string'){
		text_list = [text]
	} else if (text instanceof Array){
		text_list = text
	}
	
	let flag_list;
	if (typeof flag === 'string'){
		flag_list = [flag]
	} else if (flag instanceof Array){
		flag_list = flag
		text = false
	}
	
	
	
	// bot chat container
	function botChatContainer(){
		let bot_chat_container = document.createElement('div')
		bot_chat_container.classList.add('bot_chat_container', 'flex', 'justify-start')
		return bot_chat_container
	}

	// bot chat message
	function botChatMessage(){
		const bot_chat_message = document.createElement('div')
		bot_chat_message.classList.add('bot_chat_message','text-base')
		return bot_chat_message
	}
	
	function Note(){
		let note = document.createElement('div')
		note.classList.add('bot_chat_message_note')
		return note
	}
	
	// message side triangle
	const left_side = document.createElement('div')
	left_side.classList.add('bot_chat_message_indicator')

	const bot_avatar = document.createElement('img')
	bot_avatar.classList.add('bot_avatar', 'object-cover', 'rounded-full')
	bot_avatar.src = "https://chatcv.net/wp-content/themes/twentytwentytwo/assets/images/chatbot.svg";
    	bot_avatar.alt = "bot avatar";
	

	let bot_msgs = [];
    	if (text) {
    		for (let ind in text_list){
    			var bot_chat_message = botChatMessage()
    			if (ind>0){
    				bot_chat_message.classList.add('bot_chat_message','text-base','bot_chat_message_followup')
    			}
    			bot_chat_message.textContent = text_list[ind];
    			
    			if (ind==0){
    				bot_chat_message.appendChild(left_side)
    			}
    			bot_msgs.push(bot_chat_message)
    		}
    	}
    	
    	
    	
    	
	
	// a flag message below original message to show limits or additional note related to the text
	if (flag && !text) {
		for (let ind in flag_list){
    			var bot_chat_message = botChatMessage()
    			if (ind>0){
    				bot_chat_message.classList.add('bot_chat_message','text-base','bot_chat_message_followup')
    			}
    			if (ind==0){
    				bot_chat_message.appendChild(left_side)
    			}
    			var note = Note()
    			note.textContent = flag_list[ind];
    			bot_chat_message.appendChild(note)
    			bot_msgs.push(bot_chat_message)
    		}
    	} else if (flag && text){
    		var note = Note()
    		note.textContent = flag_list[0]
		bot_msgs[bot_msgs.length - 1].appendChild(note)
	}
	
	// finally add this chat to the message container
	const message_container = document.querySelector(".chatbot-message-container");

	for (let ind in bot_msgs){
		// add user chat to bot chat container
		var bot_chat_container = botChatContainer()
		if (ind==0){
			bot_chat_container.appendChild(bot_avatar)
		}
		
		bot_chat_container.appendChild(bot_msgs[ind])
		message_container.appendChild(bot_chat_container);
	}
	
	
	message_container.scrollTop = message_container.scrollHeight;
}


// ================================================================================================
// function to add options
export function optionsContainer(optionsArray, fillData, cols, about=false, what_asked=false, done=false, is_shuffle=false){
	
    let limit = optionsArray[1]
    if (about && limit) {
		addBotChat(`Vamos preencher a seção ${about}.`,`Selecione apenas as opções mais relevantes para a profissão escolhida. Terminando pressione Incluir.`);
	} else if (about && !limit) {
		addBotChat(`Vamos preencher a seção ${about}.`,`Selecione apenas as opções mais relevantes para a profissão escolhida. Terminando pressione Incluir.`);
	}
	
	
	if (what_asked) {
		Ask.asked=what_asked
	}
	
	if (is_shuffle) {
		optionsArray = shuffle(optionsArray[0]) // shuffling the input arrays
	} else {
		optionsArray = optionsArray[0]
	}
	const length = optionsArray.length;
	
	// options container
	const options_container = document.createElement('div');
	options_container.classList.add("options-container");
	
	// options button container
	const buttons_container = document.createElement('div');
	buttons_container.classList.add("options-buttons-container", 'grid', 'auto-cols-auto', 'gap-2','grid-cols-1',`md:grid-cols-${cols.split(" ").length}`, `lg:grid-cols-${cols.split(" ").length}`, `xl:grid-cols-${cols.split(" ").length}`, `2xl:grid-cols-${cols.split(" ").length}`);
	/*buttons_container.style.display = "grid";
	buttons_container.style.gridTemplateColumns= cols;*/
	
	
	options_container.appendChild(buttons_container);
	
	// add items in the grid
	for (let i=0; i<length;i++) {
		const option = document.createElement('div');
		option.classList.add("options-container-item", 'text-base', 'rounded-md');
		option.textContent = optionsArray[i]
		option.style.textAlign = 'center';
		option.onclick = () => {
			if (fillData.includes(option.textContent)) {
				fillData.splice(fillData.indexOf(option.textContent),1)
				option.style.backgroundColor= "#84a9af";
				option.style.color= "#000";
				
			} else if (option.textContent=="Sair" || option.textContent=="Reiniciar" || option.textContent=="Terminar") {
				Ask.edit = false;
				name = "";
				address = "";
				email = "";
				phone = "";
				section2 = [];
				section3 = [];
				section4 = [];
				section5 = {};
				section5['company'] = {};
				section6 = [];
				section7 = [];
				section8 = [];
				section9 = [];
				
				
				localStorage.removeItem('name');
				localStorage.removeItem('email');
				localStorage.removeItem('address');
				localStorage.removeItem('phone');
				localStorage.removeItem('section2');
				localStorage.removeItem('section3');
				localStorage.removeItem('section4');
				localStorage.removeItem('section5');
				localStorage.removeItem('section6');
				localStorage.removeItem('section7');
				localStorage.removeItem('section8');
				localStorage.removeItem('section9');
				localStorage.removeItem('email_content');
				
				if (option.textContent=="Sair"){
					document.getElementById("chat-bot").remove();
					Ask.asked = false;
					window.open("https://chatcv.net", "_self");

				} else if (option.textContent=="Reiniciar") {
					removeReview()
					Ask.asked = "Vamos iniciar informando seu Nome Completo?";
					addBotChat(Ask.asked);
					createInput();
				} else if (option.textContent=="Fechar janela" || option.textContent=="Terminar") {
					cvs = document.getElementsByClassName('cv-template')
					cvs[0].remove()
					cvs[1].remove()
					cvs[2].remove()
					/*window.open('','_parent','');
					window.close();/*
				}
				
			}  /*else if (option.textContent=="Fechar janela" || option.textContent=="Terminar") {
					window.open('','_parent','');
					window.close();
			}*/ else if (option.textContent=="Continuar") {
				Ask.edit = false;
				if (name=="" && email=="") {
					addBotChat(["Desde que você selecionou 'Reiniciar', seus dados devem ser reinseridos.",
							Ask.asked, "Obrigado!"])
				} else {
					window.open("https://mpago.la/1g1HCdD", "_blank");
				}
				
			} else if (option.textContent=="Revisar") {
				addReviewSection()
				Hide()
				addBotChat(false, ["Continuar - vai levá-lo ao próximo passo.", 
							"Sair - todos os seus dados serão perdidos.",
							"Reiniciar - começa uma nova conversa."])
				optionsContainer([["Continuar", "Reiniciar", "Sair"], false], [], "auto auto auto")
				
			} else if (option.textContent=="Baixar") {
				console.log('****************************************************************')
				downloadCV(localStorage.getItem('email_content'))

			// if asked for language proficiency
			} else if (option.textContent=='básico' || option.textContent=='intermediário'
						|| option.textContent=='avançado' || option.textContent=='proficiente/fluente') {
				edu_temp.push(option.textContent)
				// ask if wants to add another language
				section8.push(edu_temp)
				Ask.asked = 'Quer adicionar mais um idioma?'
				addBotChat(Ask.asked)
				
				optionsContainer([["sim", "não"], false], [], "auto auto")

			} else if (option.textContent=="sim") {
				option.backgroundColor = 'rgb(82, 227, 115)';
				// if user said yes to add work history OR if user was asked to add more company
				if (Ask.asked=='Gostaria de adicionar a seção HISTÓRICO PROFISSIONAL?' ||
						Ask.asked=='Deseja adicionar outra empresa?'){
					// for each company name increase company count by 1
					company_count++
					occupation_count = 0
					// each company count is a dictionary
					// containing company name, and occupation
					section5['company'][company_count] = {}
					// occupation in the company is also a dictionary
					section5['company'][company_count]['occupation'] = {}
					// ask company name
					createInput()
					Ask.asked = "Qual o nome da empresa ou empregador? Citar mais recente para mais antiga."
                   			addBotChat(Ask.asked)
					
				// if user was asked to add more responsibility
				} else if (Ask.asked=='Gostaria de acrescentar mais uma responsabilidade?'){
					// ask to add responsibility
					Ask.asked = `Qual era sua responsabilidade?`
					addBotChat(Ask.asked)
					createInput()
					
				// if user was asked to add more occupation
				} else if (Ask.asked=='Gostaria de adicionar outra ocupação?'){
					// increase occupation_count by 1
					/*ask the occupation*/
					occupation_count++
					Ask.asked = "Qual foi a sua ocupação, posição ou função nesta empresa?"
					addBotChat(Ask.asked)
					createInput()

			//  if user was asked to add more degree
				} else if (Ask.asked=='Você quer adicionar outro grau?'){
					// Reiniciar SECTION 6 here
					Ask.asked = 'Qual foi o ano de conclusão?'
					addBotChat(Ask.asked)
					createInput('month', false, false)

					// if asked to confirm if the user is graduate
				} else if (Ask.asked == 'Qual é a situação do seu diploma?') {
					edu_temp.push(text)
					// ask for location of the institute
					Ask.asked = 'Em qual cidade?'
					addBotChat(Ask.asked)
					createInput()

				// if asked to add another course type OR asked to add more other course types
				} else if (Ask.asked=='Deseja adicionar curso na seção TREINAMENTOS E/OU ESPECIALIZAÇÕES?'){
					// Continuar to SECTION 7 here
					createInput()
					Ask.asked = 'Qual é o tipo de curso?'
					addBotChat(Ask.asked)

				// if asked to add language OR another language
				} else if (Ask.asked=='Deseja adicionar proficiência em Idiomas?' ||
							Ask.asked=='Quer adicionar mais um idioma?'){
					// Continuar to SECTION 8 here
					Ask.asked = 'Qual idioma?'
					addBotChat(Ask.asked)
					createInput()

				// if asked to add certificates OR another certificate
				} else if (Ask.asked=='Deseja preencher PRÊMIOS, BOLSAS, CERTIFICAÇÕES E LICENÇAS ?' ||
							Ask.asked=='Deseja adicionar outra bolsa, prêmio, certificado?'){
					// Ask for certificate
					Ask.asked = 'Qual é o título da bolsa, prêmio, certificado?'
					addBotChat(Ask.asked)
					createInput()
				}
				
			} else if (option.textContent=="não") {
				option.backgroundColor = 'rgb(82, 227, 115)';
				
				/* if visitor does not want to Continuar to SECTION 5, will be Continuard to this section */
				/* SECTION 6 initialized here only if replied no for section 5*/
				
				// if user was aked to Continuar to section 5 or to add more company
				if (Ask.asked=='Gostaria de adicionar a seção HISTÓRICO PROFISSIONAL?' ||
					Ask.asked=='Deseja adicionar outra empresa?' ){

					localStorage.setItem('section5', JSON.stringify(section5));
					
					if (!Ask.edit) {
						// start SECTION 6, ask for year of degree completion
						Ask.asked = 'Qual foi o ano de conclusão?'
						addBotChat("Vamos agora preencher seu HISTÓRICO ACADÊMICO/EDUCACIONAL.");
						addBotChat(Ask.asked,
							" Obrigatório em todos currículos. Recomenda-se sempre iniciar pela mais alta formação, adicionando as outras de forma decrescente.");
						createInput('month',false,false)
					}
					
					
				// if user was asked to add more responsibility
				} else if (Ask.asked=='Gostaria de acrescentar mais uma responsabilidade?') {
					// ask if user wants to add more occupation
					Ask.asked = 'Gostaria de adicionar outra ocupação?'
					addBotChat(Ask.asked)
					optionsContainer([["sim", "não"], false], [], "auto auto")

				// if user wasked to add more occupation
				} else if (Ask.asked=='Gostaria de adicionar outra ocupação?') {
					// ask if user wants to add more company
					Ask.asked = 'Deseja adicionar outra empresa?'
					addBotChat(Ask.asked)
					optionsContainer([["sim", "não"], false], [], "auto auto")
				
				// if asked to confirm if the user is graduate
				} else if (Ask.asked == 'Qual é a situação do seu diploma?') {
					edu_temp.push(text)
					// ask for location of the institute
					createInput()
					Ask.asked = 'Em qual cidade?'
					addBotChat(Ask.asked)

				// if user was asked to add another degree
				} else if (Ask.asked=='Você quer adicionar outro grau?'){
					
					localStorage.setItem('section6', JSON.stringify(section6));

					// Start SECTION 7 is initited here here
					
					if (!Ask.edit) {
						Ask.asked = 'Deseja adicionar curso na seção TREINAMENTOS E/OU ESPECIALIZAÇÕES?'
						addBotChat(Ask.asked)
						optionsContainer([["sim", "não"], false], [], "auto auto")
					}

				// if user was asked to Continuar to SECTION 7 to add some other course type
				// OR asked if wants to add more course of other type
				} else if (Ask.asked=='Deseja adicionar curso na seção TREINAMENTOS E/OU ESPECIALIZAÇÕES?'){

					localStorage.setItem('section7', JSON.stringify(section7));

					// Start SECTION 8 is initited here here
					if (!Ask.edit) {
						Ask.asked = 'Deseja adicionar proficiência em Idiomas?'
						addBotChat(Ask.asked)
						optionsContainer([["sim", "não"], false], [], "auto auto")
					}

				// if asked to add more language profieciency OR add another language
				} else if (Ask.asked=='Deseja adicionar proficiência em Idiomas?' ||
							Ask.asked=='Quer adicionar mais um idioma?'){

					localStorage.setItem('section8', JSON.stringify(section8));

					// Start SECTION 9 is initited here here
					if (!Ask.edit) {
						Ask.asked = 'Deseja preencher PRÊMIOS, BOLSAS, CERTIFICAÇÕES E LICENÇAS ?'
						addBotChat(Ask.asked)
						optionsContainer([["sim", "não"], false], [], "auto auto")
					}

				// if asked to add certificates OR another certificate
				} else if (Ask.asked=='Deseja preencher PRÊMIOS, BOLSAS, CERTIFICAÇÕES E LICENÇAS ?' ||
							Ask.asked=='Deseja adicionar outra bolsa, prêmio, certificado?'){

					localStorage.setItem('section9', JSON.stringify(section9));
					
					if (!Ask.edit) {
						// ask how would like to proceed
						addBotChat('Como você gostaria de proceder?')
						// proceed to Review OR Continuar from here
						optionsContainer([["Continuar", "Revisar"], false], [], "auto auto")
					}
				}
				
				if(Ask.edit) {
					addBotChat('Suas informações foram atualizadas.');
					addBotChat(false, ["Clique no botão de seta de revisão para revisar seu conteúdo. Ou você pode selecionar qualquer uma das opções abaixo.",
					"Continuar - vai levá-lo ao próximo passo.",
					"Sair - todos os seus dados serão perdidos.",
					"Reiniciar - começa uma nova conversa."]);
						
					optionsContainer([["Continuar", "Reiniciar", "Sair"], false], [], "auto auto auto")
				} 
//["concuído", "concluído", "em curso"]
			} else if (option.textContent=="concluído" || option.textContent=="concluído" || option.textContent=="em curso" ) {
				edu_temp.push(option.textContent)
				// ask for location of the institute
				createInput()
				Ask.asked = 'Em qual cidade?'
				addBotChat(Ask.asked)
				
			} else if (option.textContent=="Enviar" || option.textContent=='Tente novamente') {
				let email_data = {
					'email':localStorage.getItem('email'),
					'content':localStorage.getItem('email_content')
				}
				
				sendEmail(email_data)
				
			} else {
				if (limit && fillData.length == limit){
					alert(`You can select maximum of ${limit} options.`)
				} else {
					fillData.push(option.textContent);
					option.style.backgroundColor= "rgb(92, 204, 157)";
					option.style.color= "#fff";
				}
			}
		}
		
		// add option to grid
		buttons_container.appendChild(option);
	}
	
	// add a done button only if done parameter is true in the arguments
	if (done) {
		const done_btn_container = document.createElement('button');
		done_btn_container.classList.add("options-buttons-done-container");

		done_btn_container.textContent= "Done";
		done_btn_container.onclick = () => {
		
			done_btn_container.style.backgroundColor= '#52e373';
			done_btn_container.style.boxShadow= '0 5px 15px rgba(145, 92, 182, .5)';
			done_btn_container.style.borderRadius= '0.375rem';

			/* SECTION 2 is saved here and SECTION 3, Options SECTION, is initiated here */
			if (Ask.asked=="section2") {
				localStorage.setItem('section2', JSON.stringify(section2));
				if (!Ask.edit) {
					optionsContainer(Ask.section3, section3, "auto", about="CAPACIDADES E HABILIDADES", what_asked="section3", done=true, is_shuffle=true)
					
				}

			/* SECTION 3 is saved here and SECTION 4, Options SECTION, is initiated here */
			} else if (Ask.asked=="section3") {
				localStorage.setItem('section3', JSON.stringify(section3));
				if (!Ask.edit) {
					optionsContainer(Ask.section4, section4, "auto auto auto", about="CONHECIMENTO DE FERRAMENTAS", what_asked="section4", done=true, is_shuffle=true)
					
				}
				

			/* SECTION 4 is saved here and SECTION 5, text input SECTION, is initiated here */
			} else if (Ask.asked=="section4") {
				localStorage.setItem('section4', JSON.stringify(section4));
			/* SECTION 4 ENDS here  */
			
			/* SECTION 5 is initiated here and handled in createInput function*/
				// ask if the user wants to add work history and go to the createInput function
				
				if (!Ask.edit) {
					Ask.asked = 'Gostaria de adicionar a seção HISTÓRICO PROFISSIONAL?'
					addBotChat(Ask.asked)
					optionsContainer([["sim", "não"], false], [], "auto auto")
				}
			}
			
			if (Ask.edit) {
					addBotChat('Suas informações foram atualizadas.');
					addBotChat(false, ["Clique no botão de seta de revisão para revisar seu conteúdo. Ou você pode selecionar qualquer uma das opções abaixo.",
					"Continuar - vai levá-lo ao próximo passo.",
					"Sair - todos os seus dados serão perdidos.",
					"Reiniciar - começa uma nova conversa."]);
						
					optionsContainer([["Continuar", "Reiniciar", "Sair"], false], [], "auto auto auto")
				} 
		}
		options_container.appendChild(done_btn_container);
	}
	
	
	const message_container = document.querySelector(".chatbot-message-container");
	message_container.appendChild(options_container);
	if (done){
		document.querySelectorAll(".bot_chat_message")[document.querySelectorAll(".bot_chat_message").length-1].scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
	} else {
		document.querySelectorAll(".options-container")[document.querySelectorAll(".options-container").length-1].scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
	}
	
	return options_container
}


// **********************************************************************************

// to add templates in preview
export function viewTemplates(){
	// cv template container
	const templates_container = document.createElement('div')
	templates_container.classList.add('templates-container','container', 'columns-3','md:columns-2','sm:columns-1')
    
    let cvs;
    
	// cv templates
	const template0 = document.createElement('img')
	template0.classList.add('cv-template')
	template0.src = "https://chatcv.net/wp-content/themes/twentytwentytwo/assets/images/template1.png";
	template0.alt = "ChatCV template 1";
	template0.onclick = () => {
		template0.style.border = '1px solid blue';
		localStorage.setItem('template', 1)
		cvs = document.getElementsByClassName('cv-template')
		//cvs[1].remove()
		//cvs[1].remove()
		Ask.email_content = false;
		addBotChat("Para receber clique abaixo.");
		optionsContainer([["Enviar"], false], [], "auto auto auto")
		
		Ask.email_content = createTemplate(localStorage.getItem('template'))
		localStorage.setItem('email_content', Ask.email_content)
		
	}
	
	const template1 = document.createElement('img')
	template1.classList.add('cv-template')
	template1.src = "https://chatcv.net/wp-content/themes/twentytwentytwo/assets/images/template2.png";
	template1.alt = "ChatCV template 2";
	template1.onclick = () => {
		template1.style.border = '1px solid blue';
		localStorage.setItem('template', 2)
		cvs = document.getElementsByClassName('cv-template')
		//cvs[0].remove()
		//cvs[1].remove()
		Ask.email_content = false;
		addBotChat("Para receber clique abaixo.");
		optionsContainer([["Enviar"], false], [], "auto auto auto")
		
		Ask.email_content = createTemplate(localStorage.getItem('template'))
		localStorage.setItem('email_content', Ask.email_content)
		
	}
	
	const template2 = document.createElement('img')
	template2.classList.add('cv-template')
	template2.src = "https://chatcv.net/wp-content/themes/twentytwentytwo/assets/images/template3.png";
	template2.alt = "ChatCV template 3";
	template2.onclick = () => {
		template2.style.border = '1px solid blue';
		localStorage.setItem('template', 3)
		cvs = document.getElementsByClassName('cv-template')
		//cvs[0].remove()
		//cvs[0].remove()
		Ask.email_content = false;
		addBotChat("Para receber clique abaixo.");
		optionsContainer([["Enviar"], false], [], "auto auto auto")
		
		Ask.email_content = createTemplate(localStorage.getItem('template'))
		localStorage.setItem('email_content', Ask.email_content)
		
	}
	
	
	// add templates to templates' container
	templates_container.appendChild(template0)
	templates_container.appendChild(template1)
	templates_container.appendChild(template2)
		
	// finally add this chat to the message container
	const message_container = document.getElementsByClassName("chatbot-message-container")[0];
	message_container.appendChild(templates_container);
	message_container.scrollTop = message_container.scrollHeight;
}
