<!DOCTYPE html>
<html lang="en">

<head>
	<!-- Global site tag (gtag.js) - Google Analytics -->
	<script async src="https://www.googletagmanager.com/gtag/js?id=UA-127156293-1"></script>
	<script>
  		window.dataLayer = window.dataLayer || [];
  		function gtag(){dataLayer.push(arguments);}
  		gtag('js', new Date());
  		gtag('config', 'UA-127156293-1');
	</script>


	<title>Lump Sum</title>
	<meta charset="utf-8">
	<meta name="description" content="Play spades online with this website.  This is the best free spades game online. The site is built with HTML CSS and Javascript">
	<meta name="author" content="Spades Card Classic">

	<meta name="viewport" content="initial-scale=0.5, maximum-scale=0.5, minimum-scale=0.5, user-scalable=no">
	
	<link rel="stylesheet" href="<?php echo base_url()?>assets/spades/menus.css">
	<link rel="stylesheet" href="<?php echo base_url()?>assets/spades/cards.css">
	<link rel="stylesheet" href="<?php echo base_url()?>assets/spades/scoreboard.css">
	<link rel="stylesheet" href="<?php echo base_url()?>assets/spades/game.css">

	<script>
		//
		// Initialize
		//
		var game = null;

		window.onload = function () {
			//if (redirectToAppStore()) {
			//	return;
			//}
			UpdateBackgroundImageFromSettings();
			setTimeout(function () {
				ShowMainMenu(false);
				ShowTitle();
			}, 500);

			game = new Game();

		};

	</script>

	<script type="text/javascript" src="<?php echo base_url()?>assets/spades/menus.js"></script>
	<script type="text/javascript" src="<?php echo base_url()?>assets/spades/settings.js"></script>
	<script type="text/javascript" src="<?php echo base_url()?>assets/spades/game.js"></script>
	<script type="text/javascript" src="<?php echo base_url()?>assets/spades/scoreboard.js"></script>
	<script type="text/javascript" src="<?php echo base_url()?>assets/spades/player.js"></script>
	<script type="text/javascript" src="<?php echo base_url()?>assets/spades/GameSimulator.js"></script>

	<link rel="stylesheet" type="text/css" href="//cdnjs.cloudflare.com/ajax/libs/cookieconsent2/3.1.0/cookieconsent.min.css" />
	<script src="//cdnjs.cloudflare.com/ajax/libs/cookieconsent2/3.1.0/cookieconsent.min.js"></script>
	<script>
	window.addEventListener("load", function(){
	window.cookieconsent.initialise({
		"palette": {
    "popup": {
      "background": "#252e39"
    },
    "button": {
      "background": "#14a7d0"
    }
  },
	"theme": "edgeless",
	"position": "bottom-left",
	"content": {
		"message": "This site uses cookies to analyze traffic and for ad personalization and ad measurement purposes.",
		"dismiss": "OK",
		"link": "Learn more",
		"href": "https://policies.google.com/technologies/cookies"
	}
	})});
	</script>
</head>

<body onresize="game.OnResizeWindow()">

	<div id="game_title">
		<center>
			<div class="t1">Lump Sum</div>
		</center>
	</div>

	<div id="below_cards_messages_region">
		<div class="player_name" id="player_name_South">
		<?php 
			$username = $this->session->userdata('user_name');
			echo $username; 
		?>
		</div>
		<div class="player_name" id="player_name_West"></div>
		<div class="player_name" id="player_name_North"></div>
		<div class="player_name" id="player_name_East"></div>
		
		<div class="player_score" id="player_score_South"></div>
		<div class="player_score" id="player_score_West"></div>
		<div class="player_score" id="player_score_North"></div>
		<div class="player_score" id="player_score_East"></div>

		<div id="player_play_prompt">Drop a card here</div>

		<button id="hint_button" onclick="game.OnHintButtonClick()">Hint</button>
		
		<div id="scoreboard">
			<div id="scoreboardBackground" onclick="game.OnScoreboardClick()">
				<div id="scoreboardPlayerRegionSouth" class="scoreboardPlayerRegion">
					<div id="scoreboardPlayerNameSouth" class="scoreboardPlayerName">
					<?php 
						$username = $this->session->userdata('user_name');
						echo $username; 
					?>
					</div>
					<div id="scoreboardPlayerBarSouth" class="scoreboardPlayerBar">
						<div id="scoreboardPlayerBarFillSouth" class="scoreboardPlayerBarFill"></div>
					</div>
					<div id="scoreboardPlayerScoreSouth" class="scoreboardPlayerScore">10</div>
				</div>
				<div id="scoreboardPlayerRegionWest" class="scoreboardPlayerRegion">
					<div id="scoreboardPlayerNameWest" class="scoreboardPlayerName">West</div>
					<div id="scoreboardPlayerBarWest" class="scoreboardPlayerBar">
						<div id="scoreboardPlayerBarFillWest" class="scoreboardPlayerBarFill"></div>
					</div>
					<div id="scoreboardPlayerScoreWest" class="scoreboardPlayerScore">10</div>
				</div>
				<div id="scoreboardPlayerRegionNorth" class="scoreboardPlayerRegion">
					<div id="scoreboardPlayerNameNorth" class="scoreboardPlayerName">North</div>
					<div id="scoreboardPlayerBarNorth" class="scoreboardPlayerBar">
						<div id="scoreboardPlayerBarFillNorth" class="scoreboardPlayerBarFill"></div>
					</div>
					<div id="scoreboardPlayerScoreNorth" class="scoreboardPlayerScore">10</div>
				</div>
				<div id="scoreboardPlayerRegionEast" class="scoreboardPlayerRegion">
					<div id="scoreboardPlayerNameEast" class="scoreboardPlayerName">East</div>
					<div id="scoreboardPlayerBarEast" class="scoreboardPlayerBar">
						<div id="scoreboardPlayerBarFillEast" class="scoreboardPlayerBarFill"></div>
					</div>
					<div id="scoreboardPlayerScoreEast" class="scoreboardPlayerScore">10</div>
				</div>

				<div id="scoreboardRoundScoresRegion"></div>

			</div>
			<div id="scoreboardDifficulty"></div>
		</div>
	</div>

	<div id="cards_region"></div>

	</div>

	<div id="choose_bid_view">
		<div id="choose_bid_title">Choose a bid:</div>
		<div id="choose_bid_row_1">
			<button class="choose_bid_button" id="choose_bid_button_0" onclick="game.OnChooseBidButtonPressed(0)">0</button>
			<button class="choose_bid_button" id="choose_bid_button_1" onclick="game.OnChooseBidButtonPressed(1)">1</button>
			<button class="choose_bid_button" id="choose_bid_button_2" onclick="game.OnChooseBidButtonPressed(2)">2</button>
			<button class="choose_bid_button" id="choose_bid_button_3" onclick="game.OnChooseBidButtonPressed(3)">3</button>
			<button class="choose_bid_button" id="choose_bid_button_4" onclick="game.OnChooseBidButtonPressed(4)">4</button>
		</div>
		<div id="choose_bid_row_2">
			<button class="choose_bid_button" id="choose_bid_button_5" onclick="game.OnChooseBidButtonPressed(5)">5</button>
			<button class="choose_bid_button" id="choose_bid_button_6" onclick="game.OnChooseBidButtonPressed(6)">6</button>
			<button class="choose_bid_button" id="choose_bid_button_7" onclick="game.OnChooseBidButtonPressed(7)">7</button>
			<button class="choose_bid_button" id="choose_bid_button_8" onclick="game.OnChooseBidButtonPressed(8)">8</button>
		</div>
		<div id="choose_bid_row_3">
			<button class="choose_bid_button" id="choose_bid_button_9" onclick="game.OnChooseBidButtonPressed(9)">9</button>
			<button class="choose_bid_button" id="choose_bid_button_10" onclick="game.OnChooseBidButtonPressed(10)">10</button>
			<button class="choose_bid_button" id="choose_bid_button_11" onclick="game.OnChooseBidButtonPressed(11)">11</button>
			<button class="choose_bid_button" id="choose_bid_button_12" onclick="game.OnChooseBidButtonPressed(12)">12</button>
			<button class="choose_bid_button" id="choose_bid_button_13" onclick="game.OnChooseBidButtonPressed(13)">13</button>
		</div>
	</div>
	
	<div id="GameOverView">
		<div id="GameOverResultText">You won!</div>
		<div id="GameOverResultText2">vs the easy players</div>
	</div>

	<a id="menu_button" href="<?php echo base_url()?>user/logout">
		<img src="images/MenuButton.png" ondragstart="return false;" />
	</a>

	<div id="menu_main" class="menu_view">
		<button id="menu_main_close_button" class="close_button" onclick="menu_main_close_click()">X</button>
		<button id="start_game_button" class="menu_button" onclick="ShowStartAGameMenu()">Start A Game</button>
	</div>

	<div id="menu_start_a_game" class="menu_view">
		<div id="menu_start_a_game_title" class="menu_card_title">Choose a difficulty level:</div>
		<button id="menu_start_a_game_close_button" class="close_button" onclick="menu_card_close_click()">X</button>
		<button id="easy_game_button" class="menu_button" onclick="menu_start_game_click('Easy')">Easy</button>
		<button id="standard_game_button" class="menu_button" onclick="menu_start_game_click('Standard')">Standard</button>
		<button id="pro_game_button" class="menu_button" onclick="menu_start_game_click('Pro')">Pro</button>
	</div>

	<div id="menu_difficulties_explained" class="menu_view">
		<div id="menu_difficulties_explained_title" class="menu_card_title">Computer Difficulty Levels Explained</div>
		<button id="menu_difficulties_explained_close_button" class="close_button" onclick="menu_card_close_click()">X</button>
		<div id="menu_difficulties_explained_body">
				For all three difficulty levels the cards are dealt completely at random to you and to the computer players.  Computer players are not given any special advantage and they do not know what cards are in your hand or in any other of the players' hands.  The difference between the easy, standard, and pro players is the strategy used to choose their plays.  If you are finding that the computer is beating you, you will likely benefit from understanding how the computer chooses its next move.
			<br>
			<br>
			<center>
				<div style="font-size:16pt">
					<u>Easy Computer Strategy</u>
				</div>
			</center>
			<table style="width:100%; text-align:left; font-size:12pt;">
				<tr>
					<td valign="top" width="80pt">Bidding:</td>
					<td>Chooses a random bid between 1 and 4</td>
				</tr>
				<tr>
					<td valign="top" width="80pt">Playing:</td>
					<td>Chooses a random valid card</td>
				</tr>
			</table>
			<br>
			<center>
				<div style="font-size:16pt">
					<u>Standard Computer Strategy</u>
				</div>
			</center>
			<table style="width:100%; text-align:left; font-size:12pt;">
				<tr>
					<td valign="top" width="80pt">Bidding:</td>
					<td>The computer determines a bid by simulating, for each possible bid (0 to 13), the outcome of one hundred random deals of the remaining unseen cards.  When running the simulations, each player is assumed to use the 'Standard' playing strategy.  It then chooses the highest bid that resulted in an average number of tricks taken above the bid.</td>
				</tr>
				<tr>
					<td valign="top" width="80pt">Playing:</td>
				<td>When the player has not yet achieved their bid, then they attempt to take the trick by leading with their highest card of the lead suit.  When they have no chance to take the trick, they play their lowest valid card.  When the player has already achieved their bid, they attempt to not take the trick by playing their lowest card.  If they must take the trick, they use their highest card.</td>
				</tr>
			</table>
			<br>
			<center>
				<div style="font-size:16pt">
					<u>Pro Computer Strategy</u>
				</div>
			</center>
			<table style="width:100%; text-align:left; font-size:12pt;">
				<tr>
					<td valign="top" width="80pt">Bidding:</td>
					<td>The computer determines a bid by simulating, for each possible bid (0 to 13), the outcome of one hundred random deals of the remaining unseen cards.  When running the simulations, each player is assumed to use the 'Standard' playing strategy.  It then chooses the highest bid that resulted in an average number of tricks taken above the bid.</td>
				</tr>
				<tr>
					<td valign="top" width="80pt">Playing:</td>
					<td>The computer determines the probability of taking the trick for each valid play in their hand.  Probabilities are determined by simulating 100 possible distributions of the unseen cards and assuming each player will choose their play using the 'Standard' strategy.  If the player has already achieved their bid then they will play the least likely card to take the trick.  And if they have not yet achieved their bid then they will play the card that is most likely to take the trick.  If no card has more than a 50% chance of taking the trick, then the lowest probability card is played.</td>
				</tr>
			</table>
		</div>
	</div>

	<div id="menu_settings" class="menu_view">
		<div id="menu_settings_title" class="menu_card_title">Settings</div>
		<button id="menu_settings_close_button" class="close_button" onclick="menu_card_close_click()">X</button>
		<table style="margin-left:5%; width:95%; margin-top:55pt; margin-bottom: 10px; text-align:left; font-size:16pt;">
			<tr>
				<td>Hint button on all levels:</td>
				<td>
					<label class="switch">
						<input id="setting_hints_checkbox" type="checkbox" onclick="SettingHintsClicked(this)">
						<span class="slider round"></span>
					</label>
				</td>
			</tr>
			<tr>
				<td>Sand bagging penalty:</td>
				<td>
					<label class="switch">
						<input id="setting_sandbaggingpenalty_checkbox" type="checkbox" onclick="SettingSandBaggingPenaltyClicked(this)">
						<span class="slider round"></span>
					</label>
				</td>
			</tr>
			<tr>
				<td>Winning score:</td>
				<td>
					<select id="winning_score_dropdown" name="winning_score_dropdown" onchange="SettingWinningScoreChanged(this)">
						<option value="250">250</option>
						<option value="500">500</option>
						<option value="750">750</option>
						<option value="1000">1000</option>
					</select>
				</td>
			</tr>
		</table>
		<div style="margin-left:5%; width:95%; text-align:left; font-size:16pt;">Board Background:</div>
		<div class="image-selector">
			<input id="wood_light" type="radio" name="settings_boardbackground_selector" value="wood_light" onclick="BoardSelectorClick(this)"
			/>
			<label class="board-selector-item background_wood_light" for="wood_light"></label>
			<input id="wood" type="radio" name="settings_boardbackground_selector" value="wood" onclick="BoardSelectorClick(this)" />
			<label class="board-selector-item background_wood" for="wood"></label>
			<input id="wood_dark" type="radio" name="settings_boardbackground_selector" value="wood_dark" onclick="BoardSelectorClick(this)"
			/>
			<label class="board-selector-item background_wood_dark" for="wood_dark"></label>
			<input id="wood_gray" type="radio" name="settings_boardbackground_selector" value="wood_gray" onclick="BoardSelectorClick(this)"
			/>
			<label class="board-selector-item background_wood_gray" for="wood_gray"></label>
			<input id="green" type="radio" name="settings_boardbackground_selector" value="green" onclick="BoardSelectorClick(this)"
			/>
			<label class="board-selector-item background_green" for="green"></label>
			<input id="red" type="radio" name="settings_boardbackground_selector" value="red" onclick="BoardSelectorClick(this)" />
			<label class="board-selector-item background_red" for="red"></label>
			<input id="blue" type="radio" name="settings_boardbackground_selector" value="blue" onclick="BoardSelectorClick(this)" />
			<label class="board-selector-item background_blue" for="blue"></label>
		</div>

		<div style="margin-left:5%; width:95%; text-align:left; font-size:16pt;">Card Color:</div>
		<div class="image-selector">
			<input id="card_blue" type="radio" name="settings_card_color_selector" value="blue" onclick="CardSelectorClick(this)" />
			<label class="card-selector-item card_back_blue" for="card_blue"></label>
			<input id="card_red" type="radio" name="settings_card_color_selector" value="red" onclick="CardSelectorClick(this)" />
			<label class="card-selector-item card_back_red" for="card_red"></label>
			<input id="card_green" type="radio" name="settings_card_color_selector" value="green" onclick="CardSelectorClick(this)" />
			<label class="card-selector-item card_back_green" for="card_green"></label>
		</div>
	</div>

	<div id="menu_statistics" class="menu_view">
		<div id="menu_statistics_title" class="menu_card_title">Statistics</div>
		<button id="menu_statistics_close_button" class="close_button" onclick="menu_card_close_click()">X</button>

		<table id="menu_statistics_table">
			<tr>
				<td></td>
				<td class="menu_statistics_table_stat">Easy</td>
				<td class="menu_statistics_table_stat">Standard</td>
				<td class="menu_statistics_table_stat">Pro</td>
				<td class="menu_statistics_table_stat_total">Total</td>
			</tr>
			<tr>
				<td class="menu_statistics_table_category">Games Played</td>
				<td class="menu_statistics_table_stat" id="menu_stat_games_played_Easy"></td>
				<td class="menu_statistics_table_stat" id="menu_stat_games_played_Standard"></td>
				<td class="menu_statistics_table_stat" id="menu_stat_games_played_Pro"></td>
				<td class="menu_statistics_table_stat_total" id="menu_stat_games_played_Total">0</td>
			</tr>
			<tr>
				<td class="menu_statistics_table_category">Wins</td>
				<td class="menu_statistics_table_stat" id="menu_stat_wins_Easy"></td>
				<td class="menu_statistics_table_stat" id="menu_stat_wins_Standard"></td>
				<td class="menu_statistics_table_stat" id="menu_stat_wins_Pro"></td>
				<td class="menu_statistics_table_stat_total" id="menu_stat_wins_Total">0</td>
			</tr>
			<tr>
				<td class="menu_statistics_table_category">2nd Places</td>
				<td class="menu_statistics_table_stat" id="menu_stat_2nd_Easy"></td>
				<td class="menu_statistics_table_stat" id="menu_stat_2nd_Standard"></td>
				<td class="menu_statistics_table_stat" id="menu_stat_2nd_Pro"></td>
				<td class="menu_statistics_table_stat_total" id="menu_stat_2nd_Total">0</td>
			</tr>
			<tr>
				<td class="menu_statistics_table_category">3rd Places</td>
				<td class="menu_statistics_table_stat" id="menu_stat_3rd_Easy"></td>
				<td class="menu_statistics_table_stat" id="menu_stat_3rd_Standard"></td>
				<td class="menu_statistics_table_stat" id="menu_stat_3rd_Pro"></td>
				<td class="menu_statistics_table_stat_total" id="menu_stat_3rd_Total">0</td>
			</tr>
			<tr>
				<td class="menu_statistics_table_category">4th Places</td>
				<td class="menu_statistics_table_stat" id="menu_stat_4th_Easy"></td>
				<td class="menu_statistics_table_stat" id="menu_stat_4th_Standard"></td>
				<td class="menu_statistics_table_stat" id="menu_stat_4th_Pro"></td>
				<td class="menu_statistics_table_stat_total" id="menu_stat_4th_Total">0</td>
			</tr>
			<tr>
				<td class="menu_statistics_table_category">Win Percentage</td>
				<td class="menu_statistics_table_stat" id="menu_stat_win_percent_Easy"></td>
				<td class="menu_statistics_table_stat" id="menu_stat_win_percent_Standard"></td>
				<td class="menu_statistics_table_stat" id="menu_stat_win_percent_Pro"></td>
				<td class="menu_statistics_table_stat_total" id="menu_stat_win_percent_Total"></td>
			</tr>
		</table>
		<table id="menu_statistics_buttons_table">
			<tr>
				<td>
					<center>
						<button id="menu_statistics_reset_button" onclick="ResetStatisticsButtonClick()">Reset
							<br>Statistics</button>
					</center>
				</td>
			</tr>
		</table>
	</div>
	
	<div id="menu_tutorial" class="menu_view">
		<div id="menu_tutorial_title" class="menu_card_title">Tutorial</div>
		<button id="menu_tutorial_close_button" class="close_button" onclick="menu_card_close_click()">X</button>
		<div id="menu_tutorial_body">
			Spades is a trick taking card game.  The object of each round is to take at least the number of tricks that you bid before the round begins.  The first player to reach the winning score (default 500) wins the game.  The spade suit is always trump.
			<br>
			<br>
			<center>
				<div style="font-size:16pt">
					<u>Gameplay</u>
				</div>
			</center>
			Each game is played in rounds and each round consists of a dealing stage, a bidding stage, a trick taking stage, and a scoring stage.
			<br>
			<br>
			<center>
				<div style="font-size:16pt">
					<u>Dealing</u>
				</div>
			</center>
			When the game starts, each player is randomly dealt 13 cards.  All cards are dealt to all players completely at random.  No special dealing is used to handicap or improve the hands for the computer players.  You are the first dealer and then the deal moves to the left after each round.
			<br>
			<br>
			<center>
				<div style="font-size:16pt">
					<u>Bidding</u>
				</div>
			</center>
			Starting with the player to the left of the dealer, each player bids on the minimum number of tricks that they expect to take for the round.  A bid of zero is called a 'nil bid' and results in a score of 100 if succesful and a score of -100 if any tricks are taken.
			<br>
			<br>
			<center>
				<div style="font-size:16pt">
					<u>Trick Taking</u>
				</div>
			</center>
			The player on the dealer's left makes the opening lead by playing a single card of their choice.  Players in clockwise fashion then play a card of their choice; they must follow suit if they can, otherwise they may play any card including a trump spade.  A player may not lead spades until a spade has been played to trump another trick.
			<br>
			<br>
			The trick is won or taken by the player who played the highest card of the led suit, or if trumps were played, the highest trump card wins.  The player who wins any given trick leads next.  Play continues until all players have exhausted their hands.
			<br>
			<br>
			<center>
				<div style="font-size:16pt">
					<u>Scoring</u>
				</div>
			</center>
			Once a round is completed, each player is assigned a score based on whether they achieved their bid.  If the player took at least the number of tricks that they bid then they are awarded 10 points for each trick that they bid and 1 point for each trick over their bid.  Tricks taken that are more than the bid are called 'bags'.  If a player does not take at least the number of tricks that they bid then they score zero points.  In the case where a user bid nil, if they take no tricks then they are assigned 100 points, but if they take at least one trick then they lose 100 points.
			<br>
			<br>
			An optional 'bagging' rule is designed to penalize players for underestimating the number of tricks they will take.  When this setting is turned on, players are assigned a 100 point penalty when they accumulate 10 bags.
			<br>
		</div>
	</div>

	<div id="play_more_games_menu">
		<div id="play_more_games_title">Play More<br>Card Classics</div>
		<button id="play_more_games_close_button" class="close_button" onclick="play_more_games_close_click()">X</button>
		<a class="more_games_icon_button" href="http://www.heartscardclassic.com" style="margin-top: 65px">
			<span style="display: block; width:100%; height:100%">
				<div id="more_games_icon_hearts"></div>
				<div class="more_games_icon_title">
					<center>
						<div class="more_games_icon_title1">HEARTS</div>
						<div class="more_games_icon_title2">CARD CLASSIC</div>
					</center>
				</div>
			</span>
		</a>
		<a class="more_games_icon_button" href="http://www.pinochleclassic.com">
			<span style="display: block; width:100%; height:100%">
				<div id="more_games_icon_pinochle"></div>
				<div class="more_games_icon_title">
					<center>
						<div class="more_games_icon_title1">PINOCHLE</div>
						<div class="more_games_icon_title2">CARD CLASSIC</div>
					</center>
				</div>
			</span>
		</a>
		<a class="more_games_icon_button" href="http://www.cribbageclassic.com">
			<span style="display: block; width:100%; height:100%">
				<div id="more_games_icon_cribbage"></div>
				<div class="more_games_icon_title">
					<center>
						<div class="more_games_icon_title1">CRIBBAGE</div>
						<div class="more_games_icon_title2">CLASSIC</div>
					</center>
				</div>
			</span>
		</a>
	</div>
</body>

</html>