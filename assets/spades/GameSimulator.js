var FindPossiblePlayProbabilities = function(aGame) {

    // Create a game state copy that can be manipulated and restored to simulate outcomes
    var simGame = {};
    simGame.skillLevel = 'Standard';
    simGame.isSpadesBroken = aGame.isSpadesBroken;
    simGame.winningScore = aGame.winningScore;
    simGame.cardsPlayedThisRound = [];
    simGame.trickCards = [];
    simGame.leadIndex = aGame.leadIndex;
    simGame.dealerIndex = aGame.dealerIndex;
    simGame.turnIndex = aGame.turnIndex;
    simGame.players = [];
    var player = new Player();
    player.Initialize('You', true, 'Standard', 'South');
    simGame.players.push(player);
    player = new Player();
    player.Initialize('Player1', false, 'Standard', 'West');
    simGame.players.push(player);
    player = new Player();
    player.Initialize('Player2', false, 'Standard', 'North');
    simGame.players.push(player);
    player = new Player();
    player.Initialize('Player3', false, 'Standard', 'East');
    simGame.players.push(player);
    
    var currentPlayer = aGame.players[aGame.turnIndex%4];
    var currentSimPlayer = simGame.players[aGame.turnIndex%4];
    var possiblePlays = GetLegalCardsForCurrentPlayerTurnInSimulator(aGame);
    var probabilities = [];

    if (aGame.trickCards.length == 3) {
        // Probabilities are known exactly
        for (var i=0; i<possiblePlays.length; i++) {
            simGame.trickCards = [].concat(aGame.trickCards);
            simGame.trickCards.push(possiblePlays[i]);

            var trickResult = {};
            trickResult.highestCard = simGame.trickCards[0];
            trickResult.trickTaker = simGame.players[simGame.leadIndex];
            for (var n=1; n<simGame.trickCards.length; n++) {
                var card = simGame.trickCards[n];
                if ((card.suit === trickResult.highestCard.suit && card.value > trickResult.highestCard.value) ||
                    (card.suit === 'S' && trickResult.highestCard.suit !== 'S')) {
                    trickResult.highestCard = card;
                    trickResult.trickTaker = simGame.players[(simGame.leadIndex + n)%4];
                }
            }
            
            probabilities.push(trickResult.trickTaker == currentSimPlayer ? 1 :0);
        }
    } else {
        // We will simulate a number of card distributions and see how often the player takes the trick
        
        // Create the list of cards remaining in the deck
        var gameCards = aGame.GetCards();
        var cardsRemaining = [];
        for (var i=0; i<gameCards.length; i++) {
            var isAlreadyPlayed = false;
            for (var j=0; j<aGame.cardsPlayedThisRound.length; j++) {
                if (aGame.cardsPlayedThisRound[j].id === gameCards[i].id) {
                    isAlreadyPlayed = true;
                    break;
                }
            }
            if (isAlreadyPlayed) {
                continue;
            }
            for (var j=0; j<currentPlayer.cards.length; j++) {
                if (currentPlayer.cards[j].id === gameCards[i].id) {
                    isAlreadyPlayed = true;
                    break;
                }
            }
            if (isAlreadyPlayed) {
                continue;
            }
            
            cardsRemaining.push(gameCards[i]);
        }

        var simsPerPossiblePlay = 1000;
        for (var i=0; i<possiblePlays.length; i++) {
            var tricksTakenCount = 0;
            for (var simCount = 0; simCount < simsPerPossiblePlay; simCount++) {
                // Reset the sim game state
                for (var k=0; k<4; k++) {
                    var player = aGame.players[k];
                    var simPlayer = simGame.players[k];
                    simPlayer.skillLevel = 'Standard';
                    simPlayer.currentRoundBid = player.currentRoundBid;
                    simPlayer.currentRoundTricksTaken = player.currentRoundTricksTaken;
                    simPlayer.cards = [];
                    simPlayer.isShownVoidInSuit = [player.isShownVoidInSuit[0], player.isShownVoidInSuit[1], player.isShownVoidInSuit[2], player.isShownVoidInSuit[3]];
                }
                simGame.trickCards = [].concat(aGame.trickCards);
                simGame.roundNumber = aGame.roundNumber;
                simGame.leadIndex = aGame.leadIndex;
                simGame.turnIndex = aGame.turnIndex;
                simGame.isSpadesBroken = aGame.isSpadesBroken;

                // Shuffle the deck
                var deckIdx = 0;
                for (var k = cardsRemaining.length - 1; k > 0; k--) {
                    var randIdx = Math.floor(Math.random() * (k + 1));
                    x = cardsRemaining[k];
                    cardsRemaining[k] = cardsRemaining[randIdx];
                    cardsRemaining[randIdx] = x;
                }

                for (var n=0; n<currentPlayer.cards.length; n++) {
                    currentSimPlayer.cards.push(currentPlayer.cards[n]);
                }

                // Play the next possible play card
                var card = possiblePlays[i];
                if (card.suit === 'S') {
                    simGame.isSpadesBroken = true;
                }
                if (simGame.trickCards.length !== 0) {
                    var leadCard = simGame.trickCards[0];
                    if (card.suit !== leadCard.suit) {
                        currentSimPlayer.isShownVoidInSuit[leadCard.suitInt] = true;
                    }
                }
                currentSimPlayer.cards.splice(currentSimPlayer.cards.indexOf(card), 1);
                simGame.trickCards.push(card);
                simGame.turnIndex = simGame.turnIndex + 1;

                // Deal the remaining cards to the rest of the players
                var idx = aGame.turnIndex;
                for (var deckIdx = 0; deckIdx<cardsRemaining.length; deckIdx++) {
                    idx++;
                    var simPlayer = simGame.players[idx%4];
                    if (simPlayer === currentSimPlayer) {
                        deckIdx--;
                        continue;
                    }
                    simPlayer.cards.push(cardsRemaining[deckIdx]);
                }

                // Assure that no player has a card they are supposed to be void
                for (var j=0; j<4; j++) {
                    var simPlayer = simGame.players[j];
                    if (simPlayer.playerPosition === currentSimPlayer.playerPosition) {
                        continue;
                    }
                    for (var k=0; k<simPlayer.cards.length; k++) {
                        var aCard = simPlayer.cards[k];
                        if (simPlayer.isShownVoidInSuit[aCard.suitInt]) {
                            // Swap the card with the first possible neighbor
                            var swapCardFound = false;
                            for (var n=1; n<4; n++) {
                                var neighborPlayer = simGame.players[(j+n)%4];
                                if (neighborPlayer.playerPosition === currentSimPlayer.playerPosition) {
                                    continue;
                                }
                                if (!neighborPlayer.isShownVoidInSuit[aCard.suitInt]) {
                                    for (var m=0; m<neighborPlayer.cards.length; m++) {
                                        var cardToSwap = neighborPlayer.cards[m];
                                        if (!simPlayer.isShownVoidInSuit[cardToSwap.suitInt]) {
                                            swapCardFound = true;
                                            simPlayer.cards.splice(k,1);
                                            simPlayer.cards.push(cardToSwap);
                                            neighborPlayer.cards.splice(m, 1);
                                            neighborPlayer.cards.push(aCard);
                                            break;
                                        }
                                    }
                                }
                                if (swapCardFound) {
                                    break;
                                }
                            }
                        }
                    }
                }

                // Finish the trick
                while (simGame.trickCards.length < 4) {
                    var nextPlayer = simGame.players[simGame.turnIndex%4];
                    var legalPlays = GetLegalCardsForCurrentPlayerTurnInSimulator(simGame);
                    var nextCard = nextPlayer.FindStandardPlayingCard(simGame, legalPlays);
                    // Play the Card
                    if (nextCard.suit === 'S') {
                        simGame.isSpadesBroken = true;
                    }
                    if (simGame.trickCards.length !== 0) {
                        var leadCard = simGame.trickCards[0];
                        if (nextCard.suit !== leadCard.suit) {
                            nextPlayer.isShownVoidInSuit[leadCard.suitInt] = true;
                        }
                    }

                    nextPlayer.cards.splice(nextPlayer.cards.indexOf(nextCard), 1);
                    simGame.trickCards.push(nextCard);
                    simGame.turnIndex = simGame.turnIndex + 1;
                }

                // Get the trick result
                var trickResult = {};
                trickResult.highestCard = simGame.trickCards[0];
                trickResult.trickTaker = simGame.players[simGame.leadIndex];
                for (var n=1; n<simGame.trickCards.length; n++) {
                    var card = simGame.trickCards[n];
                    if ((card.suit === trickResult.highestCard.suit && card.value > trickResult.highestCard.value) ||
                        (card.suit === 'S' && trickResult.highestCard.suit !== 'S')) {
                        trickResult.highestCard = card;
                        trickResult.trickTaker = simGame.players[(simGame.leadIndex + n)%4];
                    }
                }

                if (trickResult.trickTaker.playerPosition == currentSimPlayer.playerPosition) {
                    tricksTakenCount++;
                }
            }

            probabilities.push(tricksTakenCount/simsPerPossiblePlay);
        }
    }

    return probabilities;
}

var FindBidForPlayer = function(aGame, currentPlayer) {
    
    // Create a game state copy that can be manipulated and restored to simulate outcomes
    var simGame = {};
    simGame.skillLevel = 'Standard';
    simGame.isSpadesBroken = aGame.isSpadesBroken;
    simGame.winningScore = aGame.winningScore;
    simGame.cardsPlayedThisRound = [];
    simGame.trickCards = [];
    simGame.leadIndex = aGame.leadIndex;
    simGame.dealerIndex = aGame.dealerIndex;
    simGame.turnIndex = aGame.turnIndex;
    simGame.players = [];
    var player = new Player();
    player.Initialize('You', true, 'Standard', 'South');
    simGame.players.push(player);
    player = new Player();
    player.Initialize('Catalina', false, 'Standard', 'West');
    simGame.players.push(player);
    player = new Player();
    player.Initialize('Amelia', false, 'Standard', 'North');
    simGame.players.push(player);
    player = new Player();
    player.Initialize('Seward', false, 'Standard', 'East');
    simGame.players.push(player);

    var currentSimPlayer = simGame.players[currentPlayer.playerPositionInt];
    
    // Create the list of cards remaining in the deck
    var gameCards = aGame.GetCards();
    var cardsRemaining = [];
    for (var i=0; i<gameCards.length; i++) {
        var isAlreadyPlayed = false;
        for (var j=0; j<currentPlayer.cards.length; j++) {
            if (currentPlayer.cards[j].id === gameCards[i].id) {
                isAlreadyPlayed = true;
                break;
            }
        }
        if (isAlreadyPlayed) {
            continue;
        }
        
        cardsRemaining.push(gameCards[i]);
    }

    var recommendedBid = 1;
    // Loop through possible bids to see how the player fares
    for (var trialBid = 1; trialBid<14; trialBid++) {
        
        var totalTricksTaken = 0;
        var simsCount = 250;
        for (var simIndex = 0; simIndex < simsCount; simIndex++) {
            
            // Reset the sim game state
            for (var k=0; k<4; k++) {
                var player = aGame.players[k];
                var simPlayer = simGame.players[k];
                simPlayer.skillLevel = 'Standard';
                simPlayer.currentRoundBid = player.currentRoundBid;
                simPlayer.currentRoundTricksTaken = 0;
                simPlayer.cards = [];
                simPlayer.isShownVoidInSuit = [false, false, false, false];
            }
            simGame.cardsPlayedThisRound = [];
            simGame.trickCards = [];
            simGame.roundNumber = aGame.roundNumber;
            simGame.dealerIndex = aGame.dealerIndex;
            simGame.leadIndex = aGame.leadIndex;
            simGame.turnIndex = aGame.turnIndex;
            simGame.isSpadesBroken = false;

            // Shuffle the deck
            var deckIdx = 0;
            for (var k = cardsRemaining.length - 1; k > 0; k--) {
                var randIdx = Math.floor(Math.random() * (k + 1));
                x = cardsRemaining[k];
                cardsRemaining[k] = cardsRemaining[randIdx];
                cardsRemaining[randIdx] = x;
            }

            for (var n=0; n<currentPlayer.cards.length; n++) {
                currentSimPlayer.cards.push(currentPlayer.cards[n]);
            }

            // Guess the bids for the unbid players
            currentSimPlayer.currentRoundBid = trialBid;
            var bidsSoFarSum = 0;
            var unBidCount = 0;
            for (var i=0; i<4; i++) {
                var p = simGame.players[i];
                if (p.currentRoundBid >= 0) {
                    bidsSoFarSum += p.currentRoundBid;
                } else {
                    unBidCount++;
                }
            }
            if (unBidCount > 0) {
                var remainder = 13 - bidsSoFarSum;
                var guessBid = Math.ceil(remainder / unBidCount);
                if (guessBid < 2) {
                    guessBid = 2;
                }
                if (guessBid > 5) {
                    guessBid = 5;
                }
                for (var i=0; i<4; i++) {
                    var p = simGame.players[i];
                    if (p.currentRoundBid == -1) {
                        p.currentRoundBid = guessBid;
                    }
                }
            }

            // Deal the remaining cards to the rest of the players
            var idx = aGame.turnIndex;
            for (var deckIdx = 0; deckIdx<cardsRemaining.length; deckIdx++) {
                idx++;
                var simPlayer = simGame.players[idx%4];
                if (simPlayer === currentSimPlayer) {
                    deckIdx--;
                    continue;
                }
                simPlayer.cards.push(cardsRemaining[deckIdx]);
            }

            // Simulate out the whole round with the player being a pro and the rest being standard
            while (currentSimPlayer.cards.length > 0) {
                
                // Finish the trick
                while (simGame.trickCards.length < 4) {
                    var nextPlayer = simGame.players[simGame.turnIndex%4];
                    var legalPlays = GetLegalCardsForCurrentPlayerTurnInSimulator(simGame);
                    var nextCard = nextPlayer.FindStandardPlayingCard(simGame, legalPlays);
                    // Play the Card
                    if (nextCard.suit === 'S') {
                        simGame.isSpadesBroken = true;
                    }
                    if (simGame.trickCards.length !== 0) {
                        var leadCard = simGame.trickCards[0];
                        if (nextCard.suit !== leadCard.suit) {
                            nextPlayer.isShownVoidInSuit[leadCard.suitInt] = true;
                        }
                    }

                    nextPlayer.cards.splice(nextPlayer.cards.indexOf(nextCard), 1);
                    simGame.trickCards.push(nextCard);
                    simGame.turnIndex = simGame.turnIndex + 1;
                }
                
                // Get the trick result
                var trickResult = {};
                trickResult.highestCard = simGame.trickCards[0];
                trickResult.trickTaker = simGame.players[simGame.leadIndex];
                for (var n=1; n<simGame.trickCards.length; n++) {
                    var card = simGame.trickCards[n];
                    if ((card.suit === trickResult.highestCard.suit && card.value > trickResult.highestCard.value) ||
                        (card.suit === 'S' && trickResult.highestCard.suit !== 'S')) {
                        trickResult.highestCard = card;
                        trickResult.trickTaker = simGame.players[(simGame.leadIndex + n)%4];
                    }
                }
                trickResult.trickTaker.currentRoundTricksTaken++;
                simGame.leadIndex = trickResult.trickTaker.playerPositionInt;
                simGame.turnIndex = simGame.leadIndex;
                simGame.trickCards = [];
            }
            
            totalTricksTaken += currentSimPlayer.currentRoundTricksTaken;
        }

        var avgTricksTaken = totalTricksTaken/simsCount;
        //console.log("Bid: " + currentSimPlayer.currentRoundBid + "   Taken: " + avgTricksTaken);
        
        if (avgTricksTaken < trialBid) {
            recommendedBid = trialBid-1;
            break;
        }
        recommendedBid++;
    }
    return recommendedBid;
}

var FindOptimalPlayForCurrentPlayer = function(aGame) {
    
    var currentPlayer = aGame.players[aGame.turnIndex%4];
    var possiblePlays = GetLegalCardsForCurrentPlayerTurnInSimulator(aGame);
    var playProbabilities = FindPossiblePlayProbabilities(aGame);
    console.log("PROBABILITIES:");
    for (var i=0; i<possiblePlays.length; i++) {
        possiblePlays[i].trickTakingProbability = playProbabilities[i];
        console.log(possiblePlays[i].id + " - " + possiblePlays[i].trickTakingProbability);
    }

    // Sort the possible plays by their probability of taking the trick
    possiblePlays.sort(function(a,b){
        return a.trickTakingProbability - b.trickTakingProbability;
    });

    if (currentPlayer.currentRoundTricksTaken < currentPlayer.currentRoundBid) {
        //
        // Player wants to take a trick
        //
        var highestProbabilityCard = possiblePlays[playProbabilities.length-1];
        
        if (highestProbabilityCard.trickTakingProbability > 0.99 && playProbabilities.length > 1) {
            //
            // If there are multiple cards that are gauranteed then use a different criteria for picking
            //
            var gauranteedPlays = [];
            for (var i=0; i<playProbabilities.length; i++) {
                var card = possiblePlays[i];
                if (card.trickTakingProbability > 0.99) {
                    gauranteedPlays.push(card);
                }
            }
            if (gauranteedPlays.length == 1) {
                return gauranteedPlays[0];
            } else {
                
                gauranteedPlays.sort(function(a,b){
                    return a.value - b.value;
                });
                
                if (currentPlayer.currentRoundBid - currentPlayer.currentRoundTricksTaken > 1) {
                    // Play the lowest gauranteed card
                    return gauranteedPlays[0];
                } else {
                    // Play the highest gauranteed card
                    return gauranteedPlays[gauranteedPlays.length-1];
                }
            }
        } else {
            
            var threshold = 0.5;
            if (highestProbabilityCard.trickTakingProbability < threshold) {
                // Assume we cant take this trick and play the lowest valued card instead
                possiblePlays.sort(function(a,b){
                    a.value - b.value;
                });
                return possiblePlays[0];
            } else {
                return highestProbabilityCard;
            }
        }
    } else {
        // Player does not want to take a trick
        
        var lowestProbabilityCard = possiblePlays[0];
        
        if (lowestProbabilityCard.trickTakingProbability == 0.0 && playProbabilities.length > 1) {
            //
            // If there are multiple cards that are gauranteed then use a different criteria for picking
            //
            var gauranteedPlays = [];
            for (var i=0; i<playProbabilities.length; i++) {
                var card = possiblePlays[i];
                if (card.trickTakingProbability == 0.0) {
                    gauranteedPlays.push(card);
                }
            }
            if (gauranteedPlays.length == 1) {
                return gauranteedPlays[0];
            } else {
                gauranteedPlays.sort(function(a,b){
                    return a.value - b.value;
                });
                
                if (currentPlayer.currentRoundBid - currentPlayer.currentRoundTricksTaken > 1) {
                    // Play the lowest gauranteed card
                    return gauranteedPlays[0];
                } else {
                    // Play the highest gauranteed card
                    return gauranteedPlays[gauranteedPlays.length - 1];
                }
            }
        } else if (lowestProbabilityCard.trickTakingProbability > 0.99 && playProbabilities.length > 1) {
            // All options are gauranteed to take the trick
            // so we might as well waste our highest valued card
            possiblePlays.sort(function(a,b){
                return b.value - a.value;
            });
            
            return possiblePlays[0];
            
        } else {
            return lowestProbabilityCard;
        }
    }
}

var GetLegalCardsForCurrentPlayerTurnInSimulator = function(aGame) {
    var legalCards = [];
    var player = aGame.players[aGame.turnIndex%4];
    if (aGame.trickCards.length === 0) {
        for (var i=0; i<player.cards.length; i++) {
            var card = player.cards[i];
            if (aGame.isSpadesBroken || card.suit != 'S') {
                legalCards.push(card);
            }
        }
    } else {
        var leadCard = aGame.trickCards[0];
        for (var i=0; i<player.cards.length; i++) {
            var card = player.cards[i];
            if (card.suit === leadCard.suit) {
                legalCards.push(card);
            }
        }
    }

    if (legalCards.length === 0) {
        for (var i=0; i<player.cards.length; i++) {
            var card = player.cards[i];
            if (player.cards.length === 13) {
                if (card.suit === 'S') {
                    continue;
                }
            }
            legalCards.push(card);
        }
    }
    return legalCards;
}