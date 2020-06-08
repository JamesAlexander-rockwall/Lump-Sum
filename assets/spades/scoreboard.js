var Scoreboard = function () {
    
    this.isExpanded = false;
    this.isSlidDown = false;

    this.Initialize = function() {
        var delay = 0;
        if (this.isSlidDown) {
            this.SlideUp();
            delay = 1000;
        }
        setTimeout(function() {
            var difficultyView = document.getElementById('scoreboardDifficulty');
            difficultyView.innerHTML = "Difficulty: " + game.skillLevel;
            for (var i=0; i<game.players.length; i++) {
                var player = game.players[i];
                var playerName = document.getElementById('scoreboardPlayerName' + player.playerPosition);
                if(player.playerPosition != 'South'){
                    playerName.innerHTML = player.name;
                }
                
                var playerBarFill = document.getElementById('scoreboardPlayerBarFill' + player.playerPosition);
                with (playerBarFill.style) {
                    transition = "none";
                    width = "0%";
                }
                var playerScore = document.getElementById('scoreboardPlayerScore' + player.playerPosition);
                playerScore.innerHTML = player.gameScore;
            }    
        }, delay);
    }

    this.OnClick = function() {
        if (this.isExpanded) {
            this.Contract();
        } else {
            this.Expand();
        }
        
    }

    this.Expand = function() {
        if (this.isExpanded) {
            return;
        }

        this.isExpanded = true;

        var scoreboardBackground = document.getElementById('scoreboardBackground');
        var container = document.getElementById('scoreboardRoundScoresRegion');
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }

        var p = [];
        for (var j=0; j<4; j++) {
            p.push(game.players[j]);
        }
        p.sort(function(a,b) { 
            return b.gameScore - a.gameScore;
        });
        
        for (var i=0; i<game.roundScores.length; i++) {
            var roundSeparator = document.createElement('div');
            roundSeparator.className = 'scoreboardRoundEntrySeparator';
            roundSeparator.style.left = i*50 + 'px'
            container.appendChild(roundSeparator);

            for (var j=0; j<4; j++) {
                var curPlayerIndex = p[j].playerPositionInt;
                var roundScore = document.createElement('div');
                roundScore.className = 'scoreboardRoundEntry';
                var score = game.roundScores[i][curPlayerIndex];
                if (score >= 0) {
                    roundScore.innerHTML = "+" + score;    
                } else {
                    roundScore.innerHTML = score; 
                }
                roundScore.style.left = i*50 + 'px';
                roundScore.style.top = 3 + j*38 + 'px';
                container.appendChild(roundScore);

                var roundTricksBid = document.createElement('div');
                roundTricksBid.className = 'scoreboardRoundBidsEntry';
                roundTricksBid.innerHTML = '(' + game.roundTricksTaken[i][curPlayerIndex] + "/" + game.roundBids[i][curPlayerIndex] + ')';
                roundTricksBid.style.left = i*50 + 'px';
                roundTricksBid.style.top = 20 + j*38 + 'px';
                container.appendChild(roundTricksBid);
            }
        }

        var containerWidth = 50*game.roundScores.length;
        container.style.width = containerWidth + "px";
        with (scoreboardBackground.style) {
            transition = "0.3s linear";
            background = "#000000FF";
            width = 200 + containerWidth + "px";
        }

        var scoreboard = document.getElementById('scoreboard');
        scoreboard.style.zIndex = 1000;
    }

    this.Contract = function() {
        if (!this.isExpanded) {
            return;
        }
        this.isExpanded = false;

        var scoreboard = document.getElementById('scoreboard');
        with (scoreboard.style) {
            transition = "0.3s linear";
            zIndex = 999;
        }
        var scoreboardBackground = document.getElementById('scoreboardBackground');
        with (scoreboardBackground.style) {
            transition = "0.3s linear";
            background = "#00000077";
            width = "200px";
        }
    }

    this.SlideDown = function() {
        if (this.isSlidDown) {
            return;
        }

        this.isSlidDown = true;
        var element = document.getElementById('scoreboard');
        with (element.style) {
            transition = "1s ease-in-out";
            top = "0px";
        }
    }

    this.SlideUp = function() {
        if (!this.isSlidDown) {
            return;
        }

        this.isSlidDown = false;
        var element = document.getElementById('scoreboard');
        with (element.style) {
            transition = "1s ease-in-out";
            top = "-152px";
        }

        this.Contract();

        var difficultyView = document.getElementById('scoreboardDifficulty');
        difficultyView.innerHTML = "";
    }

    this.UpdateScores = function(animate) {
        for (var i=0; i<game.players.length; i++) {
            var player = game.players[i];
            var playerBarFill = document.getElementById('scoreboardPlayerBarFill' + player.playerPosition);
            if (animate) {
                playerBarFill.style.transition = "1s linear";
            } else {
                playerBarFill.style.transition = "none";
            }
            var percent = 100 * player.gameScore / game.winningScore;
            if (percent > 100) {
                percent = 100;
            } else if (percent < 0) {
                percent = 0;
            }
            playerBarFill.style.width = percent + "%";

            var playerScore = document.getElementById('scoreboardPlayerScore' + player.playerPosition);
            playerScore.innerHTML = player.gameScore;
        }

        if (animate) {
            setTimeout(function() {
                var p = [];
                for (var j=0; j<4; j++) {
                    p.push(game.players[j]);
                }
                p.sort(function(a,b) { 
                    return b.gameScore - a.gameScore;
                });
                for (var i=0; i<4; i++) {
                    var player = p[i];
                    var elem = document.getElementById('scoreboardPlayerRegion' + player.playerPosition);
                    elem.style.transition = "0.5s ease-in-out";
                    elem.style.top = i*38 + 'px';
                }
            }, 1000);
        } else {
            var p = [];
                for (var j=0; j<4; j++) {
                    p.push(game.players[j]);
                }
                p.sort(function(a,b) { 
                    return b.gameScore - a.gameScore;
                });
                for (var i=0; i<4; i++) {
                    var player = p[i];
                    var elem = document.getElementById('scoreboardPlayerRegion' + player.playerPosition);
                    elem.style.transition = "none";
                    elem.style.top = i*38 + 'px';
                }
        }

        if (animate) {
            setTimeout(function() {
                game.OnFinishedAnimatingUpdateGameScoreboard();
            }, 1500);
        } else {
            game.OnFinishedAnimatingUpdateGameScoreboard();
        }
    }
}