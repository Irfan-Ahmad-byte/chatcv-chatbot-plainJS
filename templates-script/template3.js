export const Template = () => {
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
	
	const name = localStorage.getItem('name')
	const address = localStorage.getItem('address')
	const email = localStorage.getItem('email')
	const phone = localStorage.getItem('phone')
	const section2 = JSON.parse(localStorage.getItem('section2'));
	const section3 = JSON.parse(localStorage.getItem('section3'));
	const section4 = JSON.parse(localStorage.getItem('section4'));
	const section5 = JSON.parse(localStorage.getItem('section5'));
	const section6 = JSON.parse(localStorage.getItem('section6'));
	const section7 = JSON.parse(localStorage.getItem('section7'));
	const section8 = JSON.parse(localStorage.getItem('section8'));
	const section9 = JSON.parse(localStorage.getItem('section9'));
	
	let doc = '<!DOCTYPE html><html>' ;
	
		
		doc += `
		<body id='email-template'>
		<div><table style='break-inside:auto'>
	
<tr style=''>
<td style='background-color: #84A9AF; height:auto; width: 20%;'><div style='break-inside:avoid;'></div></td>


<td style='padding: 30px 50px; background-color: #fff; width: 80%;'>
<div style='break-inside:avoid;'>
		`
		
		
		doc += `<h1 style='color:#84A9AF; font-weight: bold;'>${name}</h1>`
		doc += `
			<div style='padding: 10px 0px; color:#595959; font-size:12px;'>
				<div><span>${address}</span></div>
				<div><span>${email}</span></div>
				<div><span>${phone}</span></div>
			</div>
			</div>
			</td>
			</tr></table></div>
		`
		
		
		/*
		<!--SECTION 2
2 empty rows

experience section
EXPERIÊNCIA EM  #595959
1 empty row
phrase  #595959
phrase #D9D9D9
phrase -->*/
		if (section2.length>0) {
		
		doc+= `<div style='padding: 10px;'>

		<div style='padding:  15px 0px;'>
	<div style='padding: 5px 0px; color:#595959; font-weight: bold;'>EXPERIÊNCIA EM</div>
	<ul style='margin-left: 100px; padding: 5px 0px; '>
		
		`
			for (let info of section2){
				doc += `<li style='padding: 5px 0px; font-size:11px;'>${info}</li>`
			}
		doc += `</ul></div>`
			
		}
		
		
		
		/*
		<!--2 empty rows-->

<!--section 3-->
<!--CAPACIDADES E HABILIDADES  #595959-->
<!--1 empty row-->
<!--phrase #D9D9D9 -->
<!--phrase-->*/
	
		
		if (section3.length>0) {
		
		doc+= `

		<div style='padding:  15px 0px;'>
	<div style='padding: 5px 0px; color:#595959; font-weight: bold;'>CAPACIDADES E HABILIDADES</div>
	<ul style='margin-left: 100px; padding: 5px 0px; '>
		
		`
			for (let info of section3){
				doc += `<li style='padding: 5px 0px; font-size:11px;'>${info}</li>`
			}
		doc += `</ul></div>`
			
		}
		
		
		/*
		<!--2 empty rows-->

<!--section 4-->
<!--CONHECIMENTO DE FERRAMENTAS  #595959-->
<!--1 empty row-->
<!--3 columns  #D9D9D9-->
*/

		if (section4.length>0) {
		
		doc+= `

		<div style='padding:  15px 0px;'>
	<div style='padding: 5px 0px; color:#595959; font-weight: bold;'>CONHECIMENTO DE FERRAMENTAS</div>
	<table style='padding: 5px 0px; margin-left: 50px; font-size:11px;'>
		
		`	
			let i=0;
			for (let info of section4){
				i+=1
				if (i==1 || i%3==1){
					doc += `<tr style='padding:20px;'><td>${info}</td>`
				} else if (i%3==0){
					doc += `<td style='padding:20px;'>${info}</td></tr>`
				} else {
					doc += `<td style='padding:20px;'>${info}</td>`
				}
			}
		doc += `</table></div>`
			
		}
		
		
		/*
		<!--2 empty rows-->

<!--section 5
HISTÓRICO PROFISSIONAL  #595959
1 empty row
 - initial - terminus: company       #D9D9D9
			  occupation
			  responsibilities--> */
		
		if (Object.keys(section5['company']).length>0) {
			console.log(section5)
		
		doc+= `

		<div style='padding:  15px 0px;'>
	<div style='padding: 5px 0px; color:#595959; font-weight: bold;'>HISTÓRICO PROFISSIONAL</div>
	<ul style='margin-left: 100px; padding: 5px 0px; font-size:11px;'>
		
		`
			let keys = Object.keys(section5['company'])
			if (keys.length>0){
				for (let info of keys){
					let occ_keys = Object.keys(section5['company'][info]['occupation'])
					
					for(let ok of occ_keys){
						doc += "<li style='padding: 5px 0px;'>"
						doc += `<span>${section5['company'][info]['occupation'][ok]['begin']} - ${section5['company'][info]['occupation'][ok]['end']}</span>`
						doc += "<div>"
						doc += `<span>${section5['company'][info]['occupation'][ok]['name']} – ${section5['company'][info]['name']}</span>`
						doc += "</div>"
						doc += `<div>${section5['company'][info]['occupation'][ok]['roles']}</div>`
						doc += "</li>"
					}
				}
				doc += `</ul></div>`
			}
		}
		
		
		/*
		<!-- 2 empty rows-->

<!-- section 6-->
<!--HISTÓRICO ACADÊMICO E/OU EDUCACIONAL   #595959-->
<!--1 empty row-->
<!-- - graduation year: school name, graduation, location  #D9D9D9-->*/

		
		if (section6.length>0) {
		
			doc+= `

			<div style='padding:  15px 0px;'>
	<div style='padding: 5px 0px; color:#595959 font-weight: bold;'>HISTÓRICO ACADÊMICO E/OU EDUCACIONAL</div>
	<ul style='margin-left: 100px; padding: 5px 0px; font-size:11px;'>
		
			`
			for (let info of section6){
			/*year, name intitutuo, re you graduate, location*/
				doc += `<li style='padding: 5px 0px;'><span>${info[0]}</span>`
				doc += `<div>${info[2]}</div>`
				doc += `<div>${info[1]}</div>`
				doc += `<div>${info[3]}</div></li>`
			}
			doc += `</ul></div>`
			
		}
		
		
		/*
		<!-- 2 empty rows-->

<!--section 7-->
<!--TREINAMENTOS E/OU ESPECIALIZAÇÕES       #595959-->
<!--1 empty row-->
<!-- - year   <tab>	type,year,  institute name, location, course type		 #D9D9D9-->*/

		
		if (section7.length>0) {
		
			doc+= `

			<div style='padding:  15px 0px;'>
	<div style='padding: 5px 0px; color:#595959 font-weight: bold;'>TREINAMENTOS E/OU ESPECIALIZAÇÕES</div>
	<ul style='margin-left: 100px; padding: 5px 0px; font-size:11px;'>
		
			`
			for (let info of section7){
			/*year, name intitutuo, re you graduate, location*/
				doc += `<li style='padding: 5px 0px;'><span>${info[1]}</span>`
				doc += `<div>${info[0]}</div>`
				doc += `<div>${info[2]}</div>`
				doc += `<div>${info[3]}</div></li>`
			}
			doc += `</ul></div>`
			
		}
		
		
		/*
		<!--2 empty rows-->

<!--section 8-->
<!--POFICIÊNCIA EM IDIOMAS	 #595959-->
<!--1 empty row-->
<!--language	proficiency	 #d9d9d9-->*/

		
		if (section8.length>0) {
		
			doc+= `

			<div style='padding:  15px 0px;'>
	<div style='padding: 5px 0px; color:#595959; font-weight: bold;'>PROFICIÊNCIA EM IDIOMAS</div>
	<ul style='margin-left: 100px; padding: 5px 0px; font-size:11px;'>
		
			`
			for (let info of section8){
			/*language, proficiency*/
				doc += `<li style='padding: 5px 0px;'><span>${info[0]}</span>`
				doc += `<div>${info[1]}</div></li>`
			}
			doc += `</ul></div>`
			
		}
		
		
		/*
		<!-- 2 empty rows-->

<!--section 9-->
<!--PRÊMIOS, BOLSAS, CERTIFICAÇÕES E LICENÇAS		 #595959-->
<!--1 empty row-->
<!--year	type, institute name, location	 #d9d9d9-->*/


		
		if (section9.length>0) {
		
			doc+= `

			<div style='padding:  15px 0px;'>
	<div style='padding: 5px 0px; color:#595959; font-weight: bold;'>PRÊMIOS, BOLSAS, CERTIFICAÇÕES E LICENÇAS</div>
	<ul style='margin-left: 100px; padding: 5px 0px; font-size:11px;'>
		
			`
			for (let info of section7){
			/*year, name intitutuo, re you graduate, location*/
				doc += `<li style='padding: 5px 0px;'><span>${info[0]}</span>`
				doc += `<div>${info[1]}</div>`
				doc += `<div>${info[2]}</div>`
				doc += `<div>${info[3]}</div></li>`
			}
			doc += `</ul></div>`
			
		}
		
		
		doc += "</div></body>"
	
	
	doc += '</html>'
	return doc;
}
