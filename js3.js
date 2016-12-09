var fs = require('fs');
var req = require('request');
var moment = require('moment')

var URL = 'https://api.meetup.com/2/concierge?key=5d416692975687ea642e36631792d&sign=true&photo-host=public&country=us&city=Denver&category_id=34&state=CO';

var reg2 = /"address_1":"([\w\ \.\&]+)"/g;
var reg3 = /"name":"([\w\d\ \&\,\@\!\:\-\'\"\+]+)","id":"[\w ]+","time":([\d]+)/g;

var names = [];
var times = [];
var address_1 = [];

req(URL, function (err, res, body) {
    if (err) throw err;

	while ((result = reg3.exec(body)) != null)
	{
		names.push(result[1]);
		times.push(result[2]);
	}
	while ((result = reg2.exec(body)) != null)
		address_1.push(result[1]);
		
var today = Date.now();


fs.writeFileSync('test.html', '<!DOCTYPE html>\n');
fs.appendFileSync('test.txt', '<html><head><meta http-equiv="Content-Type" content="text/html" charset=UTF-8"></head><body>');

var weekdays={0:"Sunday", 1:"Monday",2:"Tuesday",3:"Wednesday",4:"Thursday",5:"Friday",6:"Saturday",7:"Sunday",8:"Monday",9:"Tuesday",10:"Wednesday",11:"Thursday",12:"Friday",13:"Saturday"}
var weekday = new Date().getDay();

var day = moment().startOf('day').unix();
 
console.log(weekday);


fs.readFile("access.html", function(err, data) {

fs.writeFileSync('test.html', '<!DOCTYPE html>\n');
fs.appendFileSync('test.html', '<html><head><meta http-equiv="Content-Type" content="text/html" charset=UTF-8"></head><body>');


for(i=0; i < 7; i++){
	fs.appendFileSync('test.html', (weekdays[weekday+i-1]) +' day: \n<ul>\n');
	for(j=0; j < times.length; j++)	{
		if (((parseInt(times[j])/1000)>=(i*86400+day)) && ((parseInt(times[j])/1000)<=((i+1)*86400+day)))		{
			//console.log(i*86400000+day, parseInt(times[j])/1000, (i+1)*86400000+day )
			var a= new Date(parseInt(times[j])-50400000);
			a = moment(a).format('lll')
			
			fs.appendFileSync('test.html','<li>' + a + ',<br> ' + names[j] + ',<br> ' + address_1[j] + '</li>\n')
		}
	}
	fs.appendFileSync('test.html','</ul>\n');  
}
fs.appendFileSync('test.html','</body></html>'); 
});
});	





















