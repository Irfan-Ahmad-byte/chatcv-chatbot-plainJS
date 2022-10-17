import {Template as template1} from './template1.js';
import {Template as template2} from './template2.js';
import {Template as template3} from './template3.js';


export function createTemplate(template) {
	/*
	
	creates HTML template of the data
	
	Params:
\		template: template tyep: 1/2/3
		
	Returns:
		HTML template
	
	attributes of data:
	data: object
	data.keys = [name,address,emal,phone,section2,section3,section4,section5,section6,section7,section8,section9]
	name:string
	address: string
	email: email
	phone: phone
	section2: array
	section3: array
	section4: array
	section5: object of objects
	section6: array of arrays
	section7: array of arrays
	section8: array of arrays
	section9: array of arrays
	
	*/
	
	let HTMLtemplate;
	
	if (template=='1' || template==1) {
		HTMLtemplate = template1();
		
	} else if (template=='2' || template==2) {
		HTMLtemplate = template2();
		
	} else if (template=='3' || template==3) {
		HTMLtemplate = template3();
	}
    
	return HTMLtemplate
	
}