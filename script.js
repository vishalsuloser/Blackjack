let blackjackGame = {
    "you": { "scoreSpan": "#your-blackjack-result", "div": "#your-box", "score": 0 },
    "dealer": { "scoreSpan": "#dealer-blackjack-result", "div": "#dealer-box", "score": 0 },
    "cards": ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"],
    "cardsMap": { "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9, "10": 10, "J": 10, "Q": 10, "K": 10, "A": [1, 11] },
    "wins": 0,
    "losses": 0,
    "draw": 0,
};

const YOU = blackjackGame["you"];
const DEALER = blackjackGame["dealer"];
const hitSnd = new Audio("sound/swish.mp3");
const winSnd = new Audio("sound/cash.mp3");
const lostSnd = new Audio("sound/aww.mp3");

let flag = false;

document.querySelector("#blackjack-hit-btn").addEventListener("click", blackjackHit);
document.querySelector("#blackjack-deal-btn").addEventListener("click", blackjackDeal);
document.querySelector("#blackjack-stand-btn").addEventListener("click", dealerLogic);

function blackjackHit() {
    // if(YOU["score"]>)
    if (flag) return;
    let card = randomCard();
    // console.log(card);
    showCard(YOU, card);
    updateScore(card, YOU);
    showScore(YOU);

}
function showCard(activePlayer, card) {
    if (activePlayer["score"] <= 21) {
        let cardImg = document.createElement("img");
        cardImg.src = `img/${card}.png`;
        document.querySelector(activePlayer["div"]).appendChild(cardImg);
        // let img = document.querySelector(activePlayer["div"]).querySelectorAll("img");
        // console.log(img);
        // if(img.length==0){
        //     document.querySelector(activePlayer["div"]).appendChild(cardImg);
        // }else{
        //     let img1=img[0];
        //     document.querySelector(activePlayer["div"]).replaceChild(cardImg, img1);
        //     document.querySelector(activePlayer["div"]).appendChild(img1);
        // }
        hitSnd.play();
    }
}
function blackjackDeal() {
    // console.log(document.getElementById("blackjack-result").innerText);
    if(document.getElementById("blackjack-result").innerHTML==="Let's play"){
        showResult(computeWinner());
        // console.log("here");
    }
    flag = false;
    let yourImg = document.querySelector("#your-box").querySelectorAll("img");
    let dealerImg = document.querySelector("#dealer-box").querySelectorAll("img");
    for (let i = 0; i < yourImg.length; i++)
        yourImg[i].remove();
    for (let i = 0; i < dealerImg.length; i++)
        dealerImg[i].remove();
    document.querySelector("#your-blackjack-result").textContent = 0;
    document.querySelector("#dealer-blackjack-result").textContent = 0;
    YOU["score"] = 0; DEALER["score"] = 0;
    document.querySelector(YOU["scoreSpan"]).style.color = "white";
    document.querySelector(DEALER["scoreSpan"]).style.color = "white";
    document.querySelector("#blackjack-result").textContent = "Let's play";
    document.querySelector("#blackjack-result").style.color = "rgb(10, 97, 10)";
}
function randomCard() {
    let random = Math.floor(Math.random() * 13);
    return blackjackGame["cards"][random];
}
function updateScore(card, activePlayer) {
    if (card === "A") {
        if (activePlayer["score"] + blackjackGame["cardsMap"][card][1] <= 21)
            activePlayer["score"] += blackjackGame["cardsMap"][card][1];
        else
            activePlayer["score"] += blackjackGame["cardsMap"][card][0];
    }
    else
        activePlayer["score"] += blackjackGame["cardsMap"][card];
    // console.log(activePlayer["score"]);
}
function showScore(activePlayer) {
    if (activePlayer["score"] > 21) {
        document.querySelector(activePlayer["scoreSpan"]).textContent = "Busted";
        document.querySelector(activePlayer["scoreSpan"]).style.color = "red";
        return;
    }
    document.querySelector(activePlayer["scoreSpan"]).textContent = activePlayer["score"];
}
function dealerLogic() {
    flag = true;
    let card = randomCard();
    showCard(DEALER, card);
    updateScore(card, DEALER);
    showScore(DEALER);
    if (DEALER["score"] > 21) showResult(computeWinner());
    else if (DEALER["score"] > YOU["score"]) showResult(computeWinner());
    else if (DEALER["score"] == YOU["score"]) showResult(computeWinner());
}
function computeWinner() {
    let winner;
    if (YOU["score"] <= 21) {
        if (YOU["score"] > DEALER["score"] || DEALER["score"] > 21) {
            blackjackGame["wins"]++;
            winner = YOU;
        }
        else if (YOU["score"] < DEALER["score"]) {
            blackjackGame["losses"]++;
            winner = DEALER;
        } else if (YOU["score"] === DEALER["score"])
            blackjackGame["draw"]++;
    } else if (YOU["score"] > 21 && DEALER["score"] <= 21) {
        blackjackGame["losses"]++;
        winner = DEALER;
    } else if (YOU["score"] > 21 && DEALER["score"] > 21)
        blackjackGame["draw"]++;
    console.log(blackjackGame);
    return winner;
}
function showResult(winner) {
    let msg, msgClr;
    console.log(winner);
    if (winner == YOU) {
        document.querySelector("#wins").textContent=blackjackGame["wins"];
        msg = "You Win";
        msgClr = "green";
        winSnd.play();
    } else if (winner == DEALER) {
        document.querySelector("#losses").textContent=blackjackGame["losses"];
        msg = "You Lost";
        msgClr = "red";
        lostSnd.play();
    }
    else {
        document.querySelector("#draws").textContent=blackjackGame["draw"];
        msg = "Draw";
        msgClr = "green";
    }
    document.querySelector("#blackjack-result").textContent = msg;
    document.querySelector("#blackjack-result").style.color = msgClr;
}

function sleep(ms){
    // call -> await sleep(500);
    return new Promise(resolve => setTimeout(resolve, ms));
}