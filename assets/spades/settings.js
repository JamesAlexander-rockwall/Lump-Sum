var setting_hints_default = false;
var setting_sandbaggingpenalty_default = true;
var setting_winning_score_default = 500;
var setting_board_color_default = 'wood';
var setting_card_color_default = 'blue';

function GetSetting(setting) {
	switch (setting) {
		case "setting_hints":
			var settingVal = window.localStorage.getItem(setting);
			return settingVal == null ? setting_hints_default : (settingVal == 'true');
			break;
		case "setting_sandbaggingpenalty":
			var settingVal = window.localStorage.getItem(setting);
			return settingVal == null ? setting_sandbaggingpenalty_default : (settingVal == 'true');
			break;
		case "setting_winning_score":
			var settingVal = window.localStorage.getItem(setting);
			return settingVal == null ? setting_winning_score_default : settingVal;
			break;
		case "setting_board_color":
			var settingVal = window.localStorage.getItem(setting);
			return settingVal == null ? setting_board_color_default : settingVal;
			break;
		case "setting_card_color":
			var settingVal = window.localStorage.getItem(setting);
			return settingVal == null ? setting_card_color_default : settingVal;
			break;
	}
}

function SetSetting(setting, val) {
	window.localStorage.setItem(setting, val);
}

function GetStatistic(statistic) {
    var val = window.localStorage.getItem(statistic);
    return val == null ? Number(0) : Number(val);
}

function GetStatisticString(statistic) {
	var val = window.localStorage.getItem(statistic);
	return val == null ? "" : val;
}

function SetStatistic(statistic, value) {
	window.localStorage.setItem(statistic, value);
}

function redirectToAppStore() {
	var userAgent = navigator.userAgent || navigator.vendor || window.opera;
  
	if (/android/i.test(userAgent)) {
		window.location.replace("https://play.google.com/store/apps/details?id=com.gamesbypost.heartscardclassic");
		return true;
	}
  
	if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
		window.location.replace("https://itunes.apple.com/us/app/hearts-card-classic/id1365096468?mt=8");
		return true;
	}
	
	return false;
}