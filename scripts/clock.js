
var styleVar=navigator.userAgent;
var resetClock=0;

CountClockStyle="counterFontSizeWeb"
if(styleVar.search(/Android/gi)!=-1){
	CountClockStyle="counterFontSizeAndroid1"			
}	

clockBrowser="none";
if(styleVar.search(/MSIE/gi)!=-1){
	clockBrowser="MSIE";			
}	
function clock(){



	var cntr;
	var monIndx=0;
	var sDate="";
	this.resetClock=0,
	this.calendar=[
		{ month:'Jan', days :31},
		{ month:'Feb', days :28},
		{ month:'Mar', days :31},
		{ month:'Apr', days :30},
		{ month:'May', days :31},
		{ month:'Jun', days :30},
		{ month:'Jul', days :31},
		{ month:'Aug', days :31},
		{ month:'Sep', days :30},
		{ month:'Oct', days :31},
		{ month:'Nov', days :30},
		{ month:'Dec', days :31}	
	],

	this.initialize=function(startDate){
		//parameter sent over

		alert("start")
		sDate=startDate;
		var passNDate=startDate.split("/");
		var t_passNDate=passNDate[3].split(":") 
		
		//01/14/2013/03:30:00
		var todaysDate = new Date();
		
		todaysDate = todaysDate + "";
		var pDate = todaysDate.split(" ");
		
		
		for(b=0;b<this.calendar.length;b++){

			if(this.calendar[b].month==pDate[1]){
				
				monIndx=b+1;
			}

		}

	
		if(clockBrowser=="MSIE")
		{
			nSecs=pDate[3].split(":") ;
		}
		else{
				nSecs=pDate[4].split(":") //11:20:50
				// format Mon Jul 15 2013 11:20:50 GMT-0400(EDT)=30 Chrome/Safari
				//             mon Jul 22 08:32:15 EDT 2013 IE
		}
		//todays info
		
		
		
		var formsSeconds;
		var minAdder=0;
		if(parseInt(t_passNDate[2])>=nSecs[2]){
			formsSeconds=parseInt(t_passNDate[2])-parseInt(nSecs[2])
		}
		else
		{
			formsSeconds=60-parseInt(nSecs[2]);
			minAdder=minAdder-1;
		}
		if(parseInt(formsSeconds)<10){
			formsSeconds="0"+formsSeconds;
		}
		



		var formMinutes;
		var hourAdder=0;
		if(parseInt(t_passNDate[1])>=nSecs[1]){
			formMinutes=parseInt(t_passNDate[1])-parseInt(nSecs[1])+minAdder;
			if(formMinutes<0){
				formMinutes=59;
			}
		}
		else
		{
			formMinutes=60-parseInt(nSecs[1])+minAdder;
			hourAdder=hourAdder-1;
		}
		if(parseInt(formMinutes)<10){
			formMinutes="0"+formMinutes;
		};

		var formHours;
		var day_adder=0;
		if(parseInt(t_passNDate[0])>=nSecs[0]){
			formHours=parseInt(t_passNDate[0])-parseInt(nSecs[0])+hourAdder;
			if(formHours<0){
				formHours=59;
			}
		}
		else
		{
			formHours=24-parseInt(nSecs[0])+hourAdder;
			day_adder=day_adder-1;
		}
		if(parseInt(formHours)<10){
			formHours="0"+formHours;
		}



		var formDays;
		var month_adder=0;

		if(parseInt(passNDate[1])>=pDate[2]){
			formDays=parseInt(passNDate[1])-parseInt(pDate[2])+day_adder;
		}
		else
		{
			formDays=this.calendar[monIndx-1].days-parseInt(pDate[2])+day_adder;
			month_adder=month_adder-1;
		}

		

		var formMonths;

		if(parseInt(passNDate[0])>=monIndx){
			formMonths=parseInt(passNDate[0])-parseInt(monIndx)
		}
		else
		{
			formMonths=12-parseInt(monIndx);
		}



		var newDay=0;
		var inx=monIndx;
		for(y=0;y<formMonths;y++){
			
			if(inx>this.calendar.length-1){

				inx=0
				
			};
			newDay=newDay+this.calendar[inx].days;
			inx=inx+1;
		}

		
		var teg=formDays;
		if(newDay!=0)
		{
			teg=newDay-formDays;
		}

		if(parseInt(teg)<10){
			teg="0"+teg;
		}


		this.clockBuilder(formsSeconds,formMinutes,formHours,teg);
		this.startTimer();
		

	},

			this.clockBuilder = function(secs,mins,hrs,days){
				
				document.write("<table align='center' cellspacing='0'>")
					document.write("<tr>");
						document.write("<td class='counterTD'>");
							document.write("<span class='counterRack' >Days</span>");
						document.write("</td>");
						document.write("<td></td>");
						document.write("<td class='counterTD'>");
							document.write("<span class='counterRack'>Hours</span>");
						document.write("</td>");
						document.write("<td></td>");
						document.write("<td class='counterTD'>");
							document.write("<span class='counterRack'>Mins</span></td>");
						document.write("<td></td>");
						document.write("<td class='counterTD'>");
							document.write("<span class='counterRack'>Secs</span>");
						document.write("</td>");
					document.write("</tr>");
					
					
					
					document.write("<tr class='"+CountClockStyle+"'>");
						document.write("<td>");
							document.write("<span id='days' style='display:inline:block'>"+days+"</span>");
						document.write("</td>");
						document.write("<td>:</td>");
						document.write("<td>");
							document.write("<span id='hours' style='display:inline-block'>"+hrs+"</span>");
						document.write("</td>");
						document.write("<td>:</td>");
						document.write("<td>");
							document.write("<span id='minutes' style='display:inline:block'>"+mins+"</span>");
						document.write("</td>");
						document.write("<td>:</td>");
						document.write("<td>");
							document.write("<span id='seconds' style='display:inline-block'>"+secs+"</span>");
						document.write("</td>");
					document.write("</tr>");
				document.write("</table>");
			},

			this.startTimer = function(){
			
				cntr=setInterval(function(){
		
					var sec=document.getElementById("seconds").innerHTML;
					this.resetClock=this.resetClock+1;
					sec=parseInt(sec)-1;
					if(sec<0)
					{
						sec=59;
						var min=document.getElementById("minutes").innerHTML;
						min=parseInt(min)-1;

						if(min<0)
						{
							min=59;
							var hour=document.getElementById("hours").innerHTML;
							hour=parseInt(hour)-1;
							

							if(hour<0){
								hour=23;
								var day=document.getElementById("days").innerHTML;
								day=parseInt(day)-1;
							
								if(day<10)
								{
									day="0"+day;
								}	
								document.getElementById("days").innerHTML=day;
							}

							if(hour<10)
							{
								hour="0"+hour;
							}		
						
							document.getElementById("hours").innerHTML=hour;
						}
					
						if(min<10)
						{
							min="0"+min;		
						}
						document.getElementById("minutes").innerHTML=min;
					}
				
					if(sec<10)
					{
						sec="0"+sec;		
					}
					
					document.getElementById("seconds").innerHTML=sec;


					if(parseInt(this.resetClock)%30==0){
							//alert(34243)
						}

						if(parseInt(this.resetClock)==30){
						

						
						

						this.resetClock=0;
						//alert(444)
						//initialize();
						//alert(6)
					}
				
				},1000);
			}
		}

	var cl = new clock();
	cl.initialize("07/21/2014/10:53:00");
	


