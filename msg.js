var QcloudSms = require("qcloudsms_js");
// 短信应用 SDK AppID
var appid = 1400235725;  // SDK AppID 以1400开头
// 短信应用 SDK AppKey
var appkey = "";
// 需要发送短信的手机号码
var phoneNumbers = ["13436837389", "18610060225"];

// 短信模板 ID，需要在短信控制台中申请
var templateId = 7839;  // NOTE: 这里的模板ID`7839`只是示例，真实的模板 ID 需要在短信控制台中申请
// 签名
var smsSign = "腾讯云";  // NOTE: 签名参数使用的是`签名内容`，而不是`签名ID`。这里的签名"腾讯云"只是示例，真实的签名需要在短信控制台申请
// 实例化 QcloudSms
var qcloudsms = QcloudSms(appid, appkey);
// 设置请求回调处理, 这里只是演示，用户需要自定义相应处理回调
function callback(err, res, resData) {
  if (err) {
      console.log("err: ", err);
  } else {
      console.log("request data: ", res.req);
      console.log("response data: ", resData);
  }
}
let i = 0;
module.exports = {
	send: function(date) {
		if (i > 6) {
			return;
		}
		i++;
		var smsType = 0; // Enum{0: 普通短信, 1: 营销短信}
		var ssender = qcloudsms.SmsSingleSender();
		ssender.send(smsType, 86, phoneNumbers[0],
		`${date}入园体检预约成功`, "", "", callback);
	}
}
