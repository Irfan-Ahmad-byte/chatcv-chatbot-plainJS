import { createInput, addUserChat, Ask, addBotChat, optionsContainer, removeInput } from './chatcvbot.js';



/*
functions to call as final step
*/

export function emailHandle(response){
	/*
	response: str: response from the email API
	*/
	
	Ask.asked = response;
	
	console.log(response)
	
	if (response['data']=="Your email has been sent"){
		addBotChat("Seu currículo foi enviado para seu e-mail.")
		addBotChat("Se você terminar, não poderá obter outro modelo para o seu currículo ou poderá obter outros modelos clicando nos botões de demonstração.")
		optionsContainer([["Terminar"], false], [], "auto")
		//Ask.email_content = false;
		addBotChat("Obrigado por usar nosso serviço.")
		addBotChat("Agora você pode fechar esta janela.")
	} else if (response['data']=='something went wrong') {
		addBotChat('Algo deu errado.')
		optionsContainer([["Tente novamente"], false], [], "auto")
	}
}
