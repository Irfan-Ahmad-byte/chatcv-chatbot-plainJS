import { createInput, addUserChat, Ask, addBotChat, optionsContainer, removeInput } from './chatcvbot.js';



/*
functions to call as final step
*/

export function emailHandle(response){
	/*
	response: str: response from the email API
	*/
	
	Ask.asked = response;
	
	if (response=="Your email has been sent"){
		addBotChat("Seu currículo foi enviado para seu e-mail.")
	} else if (response=='something went wrong') {
		addBotChat('algo deu errado')
		optionsContainer([["Tente novamente"], false], [], "auto")
	}
	addBotChat("Pode também baixá-lo, clicando <Baixar>.")
	addBotChat("Fechando esta janela seus dados são apagados.")
	optionsContainer([["Fechar janela"], false], [], "auto")
}