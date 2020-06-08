var visibleMenuCards = [];
			
function MenuCardAppear(elementID) {
	var el = document.getElementById(elementID);
	visibleMenuCards.push(elementID);
	with(el.style) {
		WebkitTransition = MozTransition = OTransition = msTransition = "0.8s cubic-bezier(0.175, 0.885, 0.320, 1.275)";
		top = "50%";
		opacity = 1;
		pointerEvents = "auto";
	}
}

function MenuCardPressDown(elementID) {
	var el = document.getElementById(elementID);
	with(el.style) {
		WebkitTransition = MozTransition = OTransition = msTransition = "0.5s ease-out";
		boxShadow = "0px 0px 0px rgba(0,0,0,0.5)";
		transform = "scale(0.93) translate(-54%,-54%)";
		pointerEvents = "none";
	}
}

function MenuCardPopUp(elementID) {
	var el = document.getElementById(elementID);
	with(el.style) {
		WebkitTransition = MozTransition = OTransition = msTransition = "0.5s ease-in-out";
		boxShadow = "30px 30px 0px rgba(0,0,0,0.5)";
		transform = "scale(1) translate(-50%,-50%)";
		pointerEvents = "auto";
	}
}

function MenuCardDisappear(elementID) {
	var el = document.getElementById(elementID);
	with(el.style) {
		WebkitTransition = MozTransition = OTransition = msTransition = "0.4s ease-in";
		top = "100%";
		opacity = 0;
		pointerEvents = "none";
	}
}

function ShowTitle() {
	var el = document.getElementById("game_title");
	with(el.style) {
		WebkitTransition = MozTransition = OTransition = msTransition = "0.8s cubic-bezier(0.175, 0.885, 0.320, 1.275)";
		top = "20%";
		opacity = 1;
	}
}

function HideTitle() {
	var el = document.getElementById("game_title");
	with(el.style) {
		WebkitTransition = MozTransition = OTransition = msTransition = "0.8s cubic-bezier(0.175, 0.885, 0.320, 1.275)";
		top = "0%";
		opacity = 0;
	}
}
function HideMenuButton() {
	var el = document.getElementById('menu_button');
	with(el.style) {
		WebkitTransition = MozTransition = OTransition = msTransition = "0.4s linear";
		opacity = 0;
		pointerEvents = "none";
	}
}

function ShowMenuButton() {
var el = document.getElementById('menu_button');
	with(el.style) {
		WebkitTransition = MozTransition = OTransition = msTransition = "0.4s linear";
		opacity = 1;
		pointerEvents = "auto";
	}
}

function MenuButtonPressed() {
	if (visibleMenuCards.length == 0)
	{
		// Show the close button
		var el = document.getElementById('menu_main_close_button');
		with(el.style) {
			display = 'block';
		}
		
		ShowMainMenu(true);
	}
}

function ShowMainMenu(showCloseButton) {
	if (showCloseButton) {
		var el = document.getElementById('menu_main_close_button');
		with(el.style) {
			display = 'block';
		}
	} else {
		var el = document.getElementById('menu_main_close_button');
		with(el.style) {
			display = 'none';
		}
	}
	MenuCardAppear('menu_main');
	HideMenuButton();
}

function menu_main_close_click() {
	visibleMenuCards = [];
	MenuCardDisappear('menu_main');
	ShowMenuButton();
}

function ShowStartAGameMenu() {
	var menuName = visibleMenuCards[visibleMenuCards.length-1];
	MenuCardPressDown(menuName);
	MenuCardAppear("menu_start_a_game");
}

function menu_card_close_click() {
	var topMenu = visibleMenuCards.pop();
	MenuCardDisappear(topMenu);
	var menuName = visibleMenuCards[visibleMenuCards.length-1];
	MenuCardPopUp(menuName);
}

function menu_start_game_click(difficulty) {
	game.StartAGame(difficulty);
	while (visibleMenuCards.length > 0) {
		var topMenu = visibleMenuCards.pop();
		MenuCardPopUp(topMenu);
		MenuCardDisappear(topMenu);
	}
	HideTitle();
	ShowMenuButton();
}

function ShowDifficultiesExplainedMenu()
{
	var menuName = visibleMenuCards[visibleMenuCards.length-1];
	MenuCardPressDown(menuName);
	MenuCardAppear("menu_difficulties_explained");
}

function ShowSettingsMenu() {
	InitializeSettingsView();
	var menuName = visibleMenuCards[visibleMenuCards.length-1];
	MenuCardPressDown(menuName);
	MenuCardAppear("menu_settings");
}

function InitializeSettingsView() {
	document.getElementById("setting_hints_checkbox").checked = GetSetting('setting_hints');
	document.getElementById("setting_sandbaggingpenalty_checkbox").checked = GetSetting('setting_sandbaggingpenalty');
	document.getElementById("winning_score_dropdown").value = GetSetting('setting_winning_score');

	var board_color = GetSetting('setting_board_color');
	var allElems = document.getElementsByName('settings_boardbackground_selector');
	for (i = 0; i < allElems.length; i++) {
		if (allElems[i].type == 'radio' && allElems[i].value == board_color) {
			allElems[i].checked = true;
		}
	}
	
	var card_color = GetSetting('setting_card_color');
	var allElems = document.getElementsByName('settings_card_color_selector');
	for (i = 0; i < allElems.length; i++) {
		if (allElems[i].type == 'radio' && allElems[i].value == card_color) {
			allElems[i].checked = true;
		}
	}
}

function SettingHintsClicked(cb) {
	SetSetting('setting_hints', cb.checked);
}

function SettingSandBaggingPenaltyClicked(cb) {
	SetSetting('setting_sandbaggingpenalty', cb.checked);
}

function SettingWinningScoreChanged(winningScoreSelect) {
	SetSetting('setting_winning_score', winningScoreSelect.value);
}

function BoardSelectorClick(radio) {
	SetSetting('setting_board_color', radio.value);
	UpdateBackgroundImageFromSettings();
}

function UpdateBackgroundImageFromSettings() {
	var boardColor = GetSetting('setting_board_color');
	switch (boardColor){
		case 'wood_light':
			document.documentElement.style.backgroundImage = "url(images/woodlightboard.jpg)";
			break;
		case 'wood':
			document.documentElement.style.backgroundImage = "url(images/woodboard.jpg)";
			break;
		case 'wood_dark':
			document.documentElement.style.backgroundImage = "url(images/wooddarkboard.jpg)";
			break;
		case 'wood_gray':
			document.documentElement.style.backgroundImage = "url(images/woodgreyboard.jpg)";
			break;
		case 'green':
			document.documentElement.style.backgroundImage = "none";
			document.documentElement.style.backgroundColor = "#354216";
			break;
		case 'red':
			document.documentElement.style.backgroundImage = "none";
			document.documentElement.style.backgroundColor = "#C20A00";
			break;
		case 'blue':
			document.documentElement.style.backgroundImage = "none";
			document.documentElement.style.backgroundColor = "#071A5F";
			break;
	}
}

function CardSelectorClick(radio) {
	SetSetting('setting_card_color', radio.value);

	var cardBackURI = "url('images/card_back_" + radio.value + ".jpg')";
	var elements = document.getElementsByClassName('cardBack');
	for (var i=0; i<elements.length; i++)
	{
		elements[i].style.backgroundImage = cardBackURI;
	}
}

function ShowStatisticsMenu() {
	var menuName = visibleMenuCards[visibleMenuCards.length-1];
	MenuCardPressDown(menuName);
	InitializeStatisticsView();
	MenuCardAppear("menu_statistics");
}

function InitializeStatisticsView() {

	var difficulties = ["Easy", "Standard", "Pro"];
	var totalGamesPlayed = 0;
	var totalWins = 0;
	var total2nds = 0;
	var total3rds = 0;
	var total4ths = 0;
	for (var i=0; i<difficulties.length; i++) {
		var curDifficulty = difficulties[i];
		var wins = GetStatistic('stat_wins_' + curDifficulty);
		var stat2nds = GetStatistic('stat_2nd_' + curDifficulty);
		var stat3rds = GetStatistic('stat_3rd_' + curDifficulty);
		var stat4ths = GetStatistic('stat_4th_' + curDifficulty);
		var gamesPlayed = wins + stat2nds + stat3rds + stat4ths;
		var gamesPlayedElement = document.getElementById('menu_stat_games_played_' + curDifficulty);
		var winsElement = document.getElementById('menu_stat_wins_' + curDifficulty);
		var stat2ndsElement = document.getElementById('menu_stat_2nd_' + curDifficulty);
		var stat3rdsElement = document.getElementById('menu_stat_3rd_' + curDifficulty);
		var stat4thsElement = document.getElementById('menu_stat_4th_' + curDifficulty);
		var winPercentElement = document.getElementById('menu_stat_win_percent_' + curDifficulty);
		if (gamesPlayed > 0) {
			gamesPlayedElement.innerText = gamesPlayed;
			winsElement.innerText = wins;
			stat2ndsElement.innerText = stat2nds;
			stat3rdsElement.innerText = stat3rds;
			stat4thsElement.innerText = stat4ths;
			winPercentElement.innerText = parseFloat(100*wins / gamesPlayed).toFixed(0) + "%";
		} else {
			gamesPlayedElement.innerText = "";
			winsElement.innerText = "";
			stat2ndsElement.innerText = "";
			stat3rdsElement.innerText = "";
			stat4thsElement.innerText = "";
			winPercentElement.innerText = "";
		}
		totalGamesPlayed = totalGamesPlayed + gamesPlayed;
		totalWins = totalWins + wins;
		total2nds = total2nds + stat2nds;
		total3rds = total2nds + stat3rds;
		total4ths = total2nds + stat4ths;
	}
	var gamesPlayedElement = document.getElementById('menu_stat_games_played_Total');
	var winsElement = document.getElementById('menu_stat_wins_Total');
	var stat2ndsElement = document.getElementById('menu_stat_2nd_Total');
	var stat3rdsElement = document.getElementById('menu_stat_3rd_Total');
	var stat4thsElement = document.getElementById('menu_stat_4th_Total');
	var winPercentElement = document.getElementById('menu_stat_win_percent_Total');
	if (totalGamesPlayed > 0) {
		gamesPlayedElement.innerText = totalGamesPlayed;
		winsElement.innerText = totalWins;
		stat2ndsElement.innerText = total2nds;
		stat3rdsElement.innerText = total3rds;
		stat4thsElement.innerText = total4ths;
		winPercentElement.innerText = parseFloat(100*totalWins / totalGamesPlayed).toFixed(0) + "%";
	} else {
		gamesPlayedElement.innerText = "0";
		winsElement.innerText = "0";
		stat2ndsElement.innerText = "0";
		stat3rdsElement.innerText = "0";
		stat4thsElement.innerText = "0";
		winPercentElement.innerText = "";
	}
}

function GetTotalGamesPlayed() {
	var difficulties = ["Easy", "Standard", "Pro"];
	var totalGamesPlayed = 0;
	for (var i=0; i<difficulties.length; i++) {
		var curDifficulty = difficulties[i];
		var wins = GetStatistic('stat_wins_' + curDifficulty);
		var stat2nds = GetStatistic('stat_2nd_' + curDifficulty);
		var stat3rds = GetStatistic('stat_3rd_' + curDifficulty);
		var stat4ths = GetStatistic('stat_4th_' + curDifficulty);
		totalGamesPlayed += (wins + stat2nds + stat3rds + stat4ths);
	}
	return totalGamesPlayed;
}

function ResetStatisticsButtonClick() {
	var r = confirm("Are you sure you want to reset your statistics?");
	if (r != true) {
		return;
	}

	var difficulties = ['Easy', 'Standard', 'Pro'];
	var statsToReset = [
		'stat_wins_',
		'stat_2nd_',
		'stat_3rd_',
		'stat_4th_'
	];
	for (var i=0; i<statsToReset.length; i++) {
		for (var j=0; j<difficulties.length; j++) {
			var statName = statsToReset[i] + difficulties[j];
			window.localStorage.removeItem(statName);
		}
	}
	
	InitializeStatisticsView();
}

function ShowTutorialMenu() {
	var menuName = visibleMenuCards[visibleMenuCards.length-1];
	MenuCardPressDown(menuName);
	MenuCardAppear("menu_tutorial");
}

function PlayMoreGamesButtonPressed() {
	var el = document.getElementById('play_more_games_menu');
	with(el.style) {
		WebkitTransition = MozTransition = OTransition = msTransition = "0.8s cubic-bezier(0.175, 0.885, 0.320, 1.275)";
		bottom = '10pt';
		opacity = 1;
		pointerEvents = "auto";
	}
}

function play_more_games_close_click() {
	var el = document.getElementById('play_more_games_menu');
	with(el.style) {
		WebkitTransition = MozTransition = OTransition = msTransition = "0.4s ease-in";
		bottom = "-260px";
		opacity = 0;
		pointerEvents = "none";
	}
}
