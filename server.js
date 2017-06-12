var schedule = require('node-schedule');
//var Client = require('node-rest-client').Client;
//var client = new Client();

var bookerCtrl = require('./controller/booker.js');

var date;

var rule = new schedule.RecurrenceRule();

rule.minute = new schedule.Range(0, 59, 5);

schedule.scheduleJob(rule, function(){

var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

	
var driver = new webdriver.Builder()
    .forBrowser('phantomjs') //phantomjs or chrome	
    .build();
	
driver.get('https://app.secure-booker.com/App/Admin/Login.aspx');
driver.findElement(By.id('txtAccountName')).sendKeys('unwindwellnesscenter');
driver.findElement(By.id('txtUsername')).sendKeys('unwind.gt@gmail.com');
driver.findElement(By.id('txtPassword')).sendKeys('Whatsshacking?123');
driver.findElement(By.id('btnSubmit')).click();



driver.wait(until.titleIs('Reports'), 10000);
driver.findElement(By.id('mi_spaAdmin_appointments')).click();
driver.get('https://app.secure-booker.com/App/SpaAdmin/Appointments/PrintAllCustomerItinerariesPopup.aspx?AllOnCalendarDate=true');
driver.executeScript("window.print = function() {}");

driver.wait(until.elementLocated(By.id('chunkContainer')), 20000, 'Could not locate the child element within the time specified');

var orderList = [];
var custList = [];
var orders = [];
var inc = 0;
var custStart = false;

var customerName = "";
var createdDate = "";
var orderNo = "";
var type = "";
var orderTotal = "";
var bookingNo = "";
var bookingStatus = "";
var origin = "";

var itHeader = "";
var itTime = "";
var itDate = "";
var itService = "";
var itDuration = "";
var itStaff = "";
var itRoom = "";
var itPrice = "";

var email = "";
var phone = "";

var i = 0;
var orderIncrement = true;

function function2() {
	
	driver.findElement(By.id("chunkContainer")).then(function () {	
		
		orderInfo(i);
		
	});
	
	
}

function orderInfo(i) {
	
		var startFromZero = i < 10 ? "0" + i : i;
		
		driver.findElement(By.id("ctl00_content_rptItem_ctl"+startFromZero+"_lblName")).then(function (webElement) {
			webElement.getText().then(function(text){
				//console.log("Customer Name: "+ text); //this will log the actual text.
				customerName = text;
			});
		}, function(err) {});
		
		var incr = i + 1;
		var startFromOne = incr < 10 ? "0"+incr : incr;
		
		/******* Getting the booking information ***********/
		driver.findElement(By.xpath("//*[@id=\"chunkContainer\"]/div["+startFromOne+"]/table[1]/tbody/tr[1]/td/table/tbody/tr[1]/td[1]/span")).then(function (webElement) {
			webElement.getText().then(function(text){
				//console.log("Created: "+ text); //this will log the actual text.
				createdDate = text;
			});
		}, function(err) {	});
		
		driver.findElement(By.id("ctl00_content_rptItem_ctl"+startFromZero+"_ucViewAppointment_ucAppointmentHeaderBlock_lblOrderNumber")).then(function (webElement) {
			webElement.getText().then(function(text){
				//console.log("Order#: "+text); //this will log the actual text.
				orderNo = text;
			});
		}, function(err) {	});
		
		driver.findElement(By.xpath("//*[@id=\"chunkContainer\"]/div["+startFromOne+"]/table[1]/tbody/tr[1]/td/table/tbody/tr[2]/td[1]/span")).then(function (webElement) {
			webElement.getText().then(function(text){
				//console.log("Type: "+ text); //this will log the actual text.
				type = text;
			});
		}, function(err) {	});
		
		driver.findElement(By.id("ctl00_content_rptItem_ctl"+startFromZero+"_ucViewAppointment_ucAppointmentHeaderBlock_lblOrderTotal")).then(function (webElement) {
			webElement.getText().then(function(text){
				//console.log("Order Total: "+text); //this will log the actual text.
				orderTotal = text;
			});
		}, function(err) {	});
		
		driver.findElement(By.xpath("//*[@id=\"chunkContainer\"]/div["+startFromOne+"]/table[1]/tbody/tr[1]/td/table/tbody/tr[3]/td[1]/span")).then(function (webElement) {
			webElement.getText().then(function(text){
				//console.log("Booking #: "+ text); //this will log the actual text.
				bookingNo = text;
			});
		}, function(err) {	});
		
		driver.findElement(By.xpath("//*[@id=\"chunkContainer\"]/div["+startFromOne+"]/table[1]/tbody/tr[1]/td/table/tbody/tr[3]/td[2]/span")).then(function (webElement) {
			webElement.getText().then(function(text){
				//console.log("Status : "+ text); //this will log the actual text.
				bookingStatus = text;
			});
		}, function(err) {	});
		
		driver.findElement(By.xpath("//*[@id=\"chunkContainer\"]/div["+startFromOne+"]/table[1]/tbody/tr[1]/td/table/tbody/tr[4]/td/span")).then(function (webElement) {
			webElement.getText().then(function(text){
				//console.log("Origin : "+ text); //this will log the actual text.
				origin = text;
			});
		}, function(err) {	});
		
		/*************** END *************/
		
		/******* Getting the ITINERARY information ***********/
		driver.findElement(By.xpath("//*[@id=\"ctl00_content_rptItem_ctl"+startFromZero+"_ucViewAppointment_ucViewScheduleBlock_pnlAppointment\"]/div[1]/span")).then(function (webElement) {
			webElement.getText().then(function(text){
				//console.log("ITINERARY Header: "+ text); //this will log the actual text.
				itHeader = text;
			});
		}, function(err) {	});
		
		driver.findElement(By.xpath("//*[@id=\"ctl00_content_rptItem_ctl"+startFromZero+"_ucViewAppointment_ucViewScheduleBlock_pnlAppointment\"]/table[1]/tbody/tr[2]/td[1]")).then(function (webElement) {
			webElement.getText().then(function(text){
				//console.log("ITINERARY Date: "+ text); //this will log the actual text.
				itDate = text;
			});
		}, function(err) {	});
		
		driver.findElement(By.xpath("//*[@id=\"ctl00_content_rptItem_ctl"+startFromZero+"_ucViewAppointment_ucViewScheduleBlock_pnlAppointment\"]/table[1]/tbody/tr[2]/td[2]")).then(function (webElement) {
			webElement.getText().then(function(text){
				//console.log("ITINERARY Time: "+ text); //this will log the actual text.
				itTime = text;
			});
		}, function(err) {	});
		
		driver.findElement(By.xpath("//*[@id=\"ctl00_content_rptItem_ctl"+startFromZero+"_ucViewAppointment_ucViewScheduleBlock_pnlAppointment\"]/table[1]/tbody/tr[2]/td[3]/strong")).then(function (webElement) {
			webElement.getText().then(function(text){
				//console.log("ITINERARY Service: "+ text); //this will log the actual text.
				itService = text;
			});
		}, function(err) {	});
				
		driver.findElement(By.id("ctl00_content_rptItem_ctl"+startFromZero+"_ucViewAppointment_ucViewScheduleBlock_ucViewScheduleItemsBlock_rptAppointmentTreatments_ctl00_lblDuration")).then(function (webElement) {
			webElement.getText().then(function(text){
				//console.log("ITINERARY Duration: "+text); //this will log the actual text.
				itDuration = text;
			});
		}, function(err) {	});
		
		driver.findElement(By.id("ctl00_content_rptItem_ctl"+startFromZero+"_ucViewAppointment_ucViewScheduleBlock_ucViewScheduleItemsBlock_rptAppointmentTreatments_ctl00_lblEmployeeName")).then(function (webElement) {
			webElement.getText().then(function(text){
				//console.log("ITINERARY Staff: "+text); //this will log the actual text.
				itStaff = text;
			});
		}, function(err) {	});
		
		driver.findElement(By.xpath("//*[@id=\"ctl00_content_rptItem_ctl"+startFromZero+"_ucViewAppointment_ucViewScheduleBlock_ucViewScheduleItemsBlock_rptAppointmentTreatments_ctl00_pnlRoom\"]/span")).then(function (webElement) {
			webElement.getText().then(function(text){
				//console.log("ITINERARY Room: "+ text); //this will log the actual text.
				itRoom = text;
			});
		}, function(err) {	});
		
		driver.findElement(By.xpath("//*[@id=\"ctl00_content_rptItem_ctl"+startFromZero+"_ucViewAppointment_ucViewScheduleBlock_pnlAppointment\"]/table[1]/tbody/tr[2]/td[7]/span[1]")).then(function (webElement) {
			webElement.getText().then(function(text){
				//console.log("ITINERARY Price: "+ text); //this will log the actual text.
				itPrice = text;
				var info = {};
				info.customerName = customerName;
				info.createdDate = createdDate;
				info.orderNo = orderNo;
				info.type = type;
				info.orderTotal = orderTotal;
				info.bookingNo = bookingNo;
				info.bookingStatus = bookingStatus;
				info.origin = origin;
				info.itHeader = itHeader;
				info.itTime = itTime;
				info.itDate = itDate;
				info.itService = itService;
				info.itDuration = itDuration;
				info.itStaff = itStaff;
				info.itRoom = itRoom;
				info.itPrice = itPrice;
				orderList.push(info);
				
				orders.push(orderNo);
				//console.log("order No : " + orders[0]);
				if(orderIncrement) {
					i = i + 1;
					orderInfo(i);
				}
			});
		}, function(err) {	
			
			orderIncrement = false;
			getCustInfo();
			
		});
}

setTimeout(function2, 30000);


function getCustInfo() {
	
	if(!custStart) {
		
		console.log("order No 1 : " + orders[inc]);
		orderPost(orders[inc]);
		custStart = true;
	}
}


	
function orderPost(orderno) {
	
	if(orderno != undefined) {
		//driver.findElement(By.id("ctl00_ctl00_pageTitle_upnlTitle")).then(function (webElement) {
			driver.executeScript("window.onbeforeunload = function() {};");
			driver.get('https://app.secure-booker.com/App/SpaAdmin/Orders/Default.aspx');
			driver.findElement(By.id('ctl00_ctl00_content_content_ucOrderWorkflow_txtFindOrder')).sendKeys(orderno);
			driver.executeScript("window.onbeforeunload = function() {};");
			driver.findElement(By.id('ctl00_ctl00_content_content_ucOrderWorkflow_btnFindOrder')).click();
			driver.executeScript("window.onbeforeunload = function() {};");
			function function2() {
				driver.findElement(By.xpath("//*[@id=\"user-info\"]/div/div[2]")).then(function (webElement) {
					webElement.getText().then(function(text){
						//console.log("Phone: "+ text); //this will log the actual text.
						phone = text;
					});
				}, function(err) {	});

				driver.findElement(By.xpath("//*[@id=\"user-info\"]/div/div[3]")).then(function (webElement) {
					webElement.getText().then(function(text){
						//console.log("Email: "+ text); //this will log the actual text.
						email = text;
						
						var cust = {};
						
						cust.phone = phone;
						cust.email = email;
						cust.orderno = orderno;
						
						custList.push(cust);
						
						if(inc <= orders.length) {
							inc = (inc + 1);
							orderPostHelp(orders[inc]);
						}
					});
				}, function(err) {	});
			}

			setTimeout(function2, 10000);
			
		//}, function(err) {	});
	}
}

function orderPostHelp(orderno) {
	
	if(orderno != undefined) {
		driver.findElement(By.id("ctl00_ctl00_content_content_ucOrderWorkflow_ucHeading_upnlCustomerInfo")).then(function (webElement) {
			driver.executeScript("window.onbeforeunload = function() {};");
			//driver.get('https://app.secure-booker.com/App/SpaAdmin/Orders/Default.aspx');
			driver.findElement(By.id('ctl00_ctl00_content_content_ucOrderWorkflow_txtFindOrder')).sendKeys(orderno);
			driver.executeScript("window.onbeforeunload = function() {};");
			driver.findElement(By.id('ctl00_ctl00_content_content_ucOrderWorkflow_btnFindOrder')).click();
			driver.executeScript("window.onbeforeunload = function() {};");

			function function2() {
				driver.findElement(By.xpath("//*[@id=\"user-info\"]/div/div[2]")).then(function (webElement) {
					webElement.getText().then(function(text){
						//console.log("Email: "+ text); //this will log the actual text.
						phone = text;
					});
				}, function(err) {	});

				driver.findElement(By.xpath("//*[@id=\"user-info\"]/div/div[3]")).then(function (webElement) {
					webElement.getText().then(function(text){
						//console.log("Email: "+ text); //this will log the actual text.
						email = text;
						
						var cust = {};
						cust.phone = phone;
						cust.email = email;
						cust.orderno = orderno;
						
						custList.push(cust);
						
						if(inc <= orders.length) {
							inc = (inc + 1);
							orderPostHelp(orders[inc]);
							
						}
						console.log("orders: " + orders.length + ", inc:" + inc);
						if(orders.length == inc) {
							pushList();
						}
					});
				}, function(err) {	});
			}

			setTimeout(function2, 5000);
			
		}, function(err) {	});	
	}
	
}

function pushList() {
	console.log("Push");
	for(var i=0; i<orderList.length; i++) {
		
		//console.log(orderList[i]);
		console.log("----------------------------");
		console.log(orderList[i].customerName);
		console.log(custList[i].email);
		console.log(custList[i].phone);
		console.log(orderList[i].createdDate);
		console.log(orderList[i].orderNo);
		console.log(orderList[i].type);
		console.log(orderList[i].orderTotal);
		console.log(orderList[i].bookingNo);
		console.log(orderList[i].bookingStatus);
		console.log(orderList[i].origin);
		console.log(orderList[i].itHeader);
		console.log(orderList[i].itTime);
		console.log(orderList[i].itDate);
		console.log(orderList[i].itService);
		console.log(orderList[i].itDuration);
		console.log(orderList[i].itStaff);
		console.log(orderList[i].itRoom);
		console.log(orderList[i].itPrice);
		var obj = {
			customerName : orderList[i].customerName,
			email : custList[i].email,
			phoneNo : custList[i].phone,
			created : orderList[i].createdDate,
			orderNo : orderList[i].orderNo,
			type : orderList[i].type,
			orderTotal : orderList[i].orderTotal,
			bookingNo : orderList[i].bookingNo,
			bookingStatus : orderList[i].bookingStatus,
			serviceStartTime : orderList[i].itTime,
			date : orderList[i].itDate,
			service : orderList[i].itService,
			duration : orderList[i].itDuration,
			staff : orderList[i].itStaff,
			price : orderList[i].itPrice

		};
		bookerCtrl.bookAppointment(obj);
   //       	var req = {
			// data : obj,
   //   			headers : {"Content-Type" : "application/json"}			
   //   		};
   //       	client.post('http://localhost:4200/core/booker', req, function(data,res){
   //       		response.send(data);
   //       	}); 
		console.log("----------------------------");
	}
}


    date = new Date();
    console.log("schedule......",date);
});
