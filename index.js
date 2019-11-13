const axios = require('axios');
const chalk = require('chalk');
const msg = require('./msg');

let allDate = ["2019-07-23", "2019-07-24", "2019-07-25", "2019-07-26", "2019-07-29", "2019-07-30", "2019-07-31"];
let index = 0;

function getNextIndex() {
	return allDate[(++index) % allDate.length];
}

axios.defaults.headers.get['Content-Type'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.common['User-Agent'] = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36';

async function runQuery(date) {
	let url = `https://rainbow.arxanfintech.com/book/rainbow/v1/reserve_resource?date=${date}&reserve_type=3&hospital_id=10001&data_type=base%2Cadvance&channel=small&token=c92ec4395b80347b83f440d94deee727`;
	const res = await axios.get(url)
	let freeData = res.data.retbody.advance.filter((item) => item.cost < item.total)
	let tmp = res.data.retbody.advance;
	if (freeData.length > 0) {
		await reserve(date + ` ${freeData[0].start_t}`);
		msg.send(freeData[0].start_t);
	} else {
		console.log(chalk.blue(`${date}无号`));
		setTimeout(async() => {
			await runQuery(getNextIndex());
		}, Math.random() * 1500);
		
	}
}

async function reserve(date) {
	const result = await axios.post('https://rainbow.arxanfintech.com/book/rainbow/v1/reserve', {
	    "hospital_id":"10001",
	    "appoint_date":date,
	    "baby_id":"331",
	    "relate_state":"0",
	    "type":3,
	    "channel":"small",
	    "token":"c92ec4395b80347b83f440d94deee727"
	})
	if (result.data.retcode === 0) {
		console.log(chalk.green(result.data.retbody));
		msg.send(date);
	} else {
		console.log(chalk.red(result.data));
		await runQuery(allDate[0]);	
	}
}


runQuery(allDate[0]);
