/*
this module is not meant to change at all
*/
import { emailHandle } from '../flow/finalStep.js';
// =======================================================================================

// function to sending emails
export function sendEmail(data){
	axios.post('https://chatcvemail-fgyji.ondigitalocean.app/email/v1/send', data)
	.then(response => {
		emailHandle(response)		
	})
}

// get current URL

export const current_url = () => {
	return window.location.href;
}

// close current window
export const windowClose = () => {
	window.open('','_parent','');
	window.close();
}

/// email validation
export const ValidateEmail = (input) => {

	var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  
	if (input.value.match(validRegex)) {
	  return true;
	}
	return false;
}


/// date validation
export const ValidateDate = (input) => {

	var n = new Date();
	var y = n.getFullYear();
  
	if (input > (y)) {
	  return false;
	}
	return true;
}
  
/// phone validation
export const ValidatePhone = (input) => {
	var phoneno1 = /^\d{14}$/;
	if(Number(input.value)!= NaN && input.value.split('').length <= 15){
		if(input.value.split('').includes("+") && input.value.split('').length <= 15){
			return true;
		} else if (input.value.split('').length <= 14){
			return true;
		}
	} 
	return false;

//  	return re.test(input);
}


// =*=*=*=*=*=*=*=*=*==*=*=*==**==*=*=*=*==*=*=*=*=*=*=*==*=*==*=*=*==*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=

// shuffle
export function shuffle(array) {
	console.log(array)
	const new_arr = [...array]
	new_arr.sort(() => Math.random() - 0.5);
	return new_arr
}


// =*=*=*=*=*=*=*=*=*==*=*=*==**==*=*=*=*==*=*=*=*=*=*=*==*=*==*=*=*==*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=

// download CV
export function downloadCV(content) {
axios.request({url:'/mychatcv', method:'get',baseURL:'https://chatcvemail-fgyji.ondigitalocean.app',params:{CONTENT: content}, responseType:'blob'})
	.then(response => {
    	let link = document.createElement('a');
		link.download = 'MyChatCV.pdf';
    	document.body.append(link);
    	let blob = new Blob([response.data], {type: 'application/pdf'})
        let reader = new FileReader();
		reader.readAsDataURL(blob); // converts the blob to base64 and calls onload
    	
    	reader.onload = function() {
  		link.href = reader.result; // data url
  		link.click();
            };
	})
}
/*<script src="https://chatcv.net/wp-content/themes/twentytwentytwo/assets/js/jsPDF-1.3.2/dist/jspdf.min.js"></script>*/
