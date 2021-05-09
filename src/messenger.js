import { htmlToElement, makeWindow } from "./lib";
import "./messenger.css";
import winkImg from "./img/msnwink.png";
import emoticonImg from "./img/msnemoticon.png";
import voiceImg from "./img/msnvoice.png";
import tiltImg from "./img/msntilt.png";
import gamesImg from "./img/msngames.png";
import blockImg from "./img/msnblock.png";
import musicImg from "./img/msnmusic.png";
import av1 from "./img/msnavatar1.png";
import av2 from "./img/msnavatar2.png";
import av3 from "./img/msnavatar3.png";
import av4 from "./img/msnavatar4.png";
import av5 from "./img/msnavatar5.png";
import av6 from "./img/msnavatar6.png";
import av7 from "./img/msnavatar7.png";
import av8 from "./img/msnavatar8.png";
import av9 from "./img/msnavatar9.png";
import { randItem } from "./util";
import { initChatbot, getResponse } from "./chat";
import { openBrowser } from "./browser";
import niceUrls from "./niceUrls";

function randAvatar() {
  return randItem([
    av1,
    av2,
    av3,
    av4,
    av5,
    av6,
    av7,
    av8,
    av9,
    "https://placekeanu.com/96/96",
    "https://www.placecage.com/96/96",
  ]);
}

const GREETINGS = [
  "hello",
  "Hi",
  "... hi",
  "Hi!",
  "Hello there",
  "Hi?",
  "hey",
  "hey...",
  "Hey!",
  "sup",
  "What's up?",
  "wassuuppp",
  "you good",
  "How you doing?",
  "Que pasa?",
  "Hej",
  "Hallo",
  "oi",
  "Oi!",
];

const USER_NAMES = [
  "arko",
  "omwa",
  "ppat",
  "elfman",
  "curlz",
  "curlyboy",
  "currywurst",
  "magus",
  "cheeseum",
  "lemmy",
  "corn",
  "fleet",
  "pheonix",
  "snn",
  "pteter",
  "petah",
  "alfaromeo",
  "doritody",
  "geno",
  "dark",
  "kphoenix",
  "pac",
  "kieran",
  "mtew",
  "tokyomewmew",
  "mew",
  "owo",
  "jay",
  "vanveen",
  "yasa",
  "yuki",
  "boing",
  "rcfreak",
  "ked",
  "Blathers",
  "nook",
  "Cranny",
  "strawberry",
  "erdbeer",
  "flandre",
  "snowshoe",
  "myname",
  "avionetazo",
  "sigurros",
  "toro",
  "cbund",
  "try_me",
  "kaeruct",
  "webwebYuppie",
  "julio_ganoza",
  "fettucini_alfredo",
  "juanka",
  "AcAcHeTe",
  "dang",
  "bada$$boi_2941",
  "chaca_zulu29",
  "xX_MaxHackerPower_Xx",
  "cool_white_teeth",
  "big_momma88",
  "pianoMaster64",
  "hacker_man",
  "BlueYoshi13",
  "MasterBaiter004",
  "007_undercover",
  "MaxB",
  "WaveG0D_69",
  "GCOC0L0",
];

const SUFFIXES = [
  "",
  "89",
  "1994",
  "25",
  "_hh",
  "xxx",
  "333",
  "41",
  "CA",
  "VVV",
  "0",
];

const DOMAINS = [
  "glitchy.website",
  "msn.com",
  "gmail.com",
  "outlook.com",
  "hotmail.com",
  "gmx.com",
  "apple.com",
  "aol.com",
  "yahoo.com",
  "localhost.local",
];

const MOODS = [
  "a tree does not believe itself to be a tree. it expresses treeness",
  "go peep my latest gallery",
  "I LOVE BTS",
  "i stan lana forever",
  "MF DOOM forever",
  "mmm... food",
  "meet me at the gate",
  "who even uses Discord anymore?",
  "YOU THOUGHT YOU WERE PRAYING TO THE RESURRECTOR",
  "Check out my tumblr!",
  "DOGE crash!!!",
  "Please help me I am trying to buy Bitcoin",
  "Where can I buy Bitcoin???",
  "selling rhymes like dimes",
  "too thirsty for a cold Corona",
  "free only fans until the end of the month!!!",
  "check me out on Twitch and you may get a free PS5!",
  "please invest on my new startup: Uber for Books",
  "The analysis is severely limited by my lack of understanding of what I'm doing",
  "I WILL NEVER LET HER GO",
  "what was the last time you talked to me? I know you're READING THIS ERIC!!!",
  "An ally of justice",
  "My boss yelled at me :(",
  "You've been scrolling for a while, check on that posture.",
  " Oh and don't forget to drink some water today",
  "Rest your eyes if you've been staring at this screen for a while",
  "Aight cool carry on",
  "i want me a french goth big titty gf",
  "stuck in the PANIC room!",
  "unless???",
  "show me your feet",
  "eminem should be in jail for corrupting our youth",
  "Are you sure you want to quit?",
  "<insert mood here>",
  "There is an ocean of silence between us… and I am drowning in it.",
  "Some things scratch the surface while others strike at your soul.",
  "He was both everything I could ever want… And nothing I could ever have…",
  "سنوات المراهقه في حياة كل انسان (وانسانه) هي سنوات ضائعه لا معنى لها مسروقة من الطفولة والرجولة معا",
  "what german music should I listen?",
  "suspect n*** don't come outside",
  "lemme show you my bionicles",
  "looking for the one....",
  "what time is it?",
  "hat's a real nice pair of underwear I see you've splurged on.",
  "swamp ass gang represent",
  "do NOT trust bill gates and AstraZeneca",
  "pizza pizza PIZZA",
  "hey bro do you listen to tool?",
  "All Rito girls idolize those things!",
  "why is HTML so hard? bbcode is much better",
  "Giving HTML classes, if you're interested hmu",
  "I can help you pimp your myspace page! Just ASK!!",
  "too cool for school",
  "We Will Always Love You",
  "anyone in the mood to have some fun ;)",
  "just kidding. haha, unless??",
  "dreams REALLY come true!!!",
  "je t'aime mon amour",
  "PUT DISPENSER HERE",
  "MEDIC!!!!",
];

function getUser() {
  const name = randItem(USER_NAMES);
  const emailStart = name.replace(/\\_/g, ".").toLowerCase();
  const mood = randItem(MOODS);
  return {
    name: name + randItem(SUFFIXES),
    email: emailStart + randItem(SUFFIXES) + "@" + randItem(DOMAINS),
    mood,
  };
}

const messengerTemplate = `
<div class="messenger-container">
  <div class="bar">
    <div class="bar__top">
      <img class="logo" src="{avatarSmall}">
      <div class="contact">
      <div class="username">
        {username}
      </div>
      <div class="mood">
        {mood} &#60;{email}&#62;
      </div>
      </div>
    </div>
    <div class="bar__bottom">
      <button class="action__button" title="Share some music"><img src="${musicImg}" /></button>
      <button class="action__button" title="Start a game"><img src="${gamesImg}" /></button>
      <button class="action__button block" title="Block user"><img src="${blockImg}" /></button>
    </div>
  </div>
  <div class="container">
    <div class="chat">
        <div class="item conversation">
        </div>
        <div class="item img">
            <div class="img__img">
            <img src="{avatar}">
            </div>
        </div>
    </div>
    <div class="send">
        <div class="item send-message">
            <div class="send-message__buttons">
                <button class="send-message__button" title="Send an emoticon"><img src="${emoticonImg}" /></button>
                <button class="send-message__button" title="Send a wink"><img src="${winkImg}" /></button>
                <button class="send-message__button nudge-button" title="Send a nudge"><img src="${tiltImg}" /></button>
                <button class="send-message__button" title="Send a voice message"><img src="${voiceImg}" /></button>
                </div>
                <div class="send-message__textfield">
                <textarea></textarea>
                <div class="buttons">
                    <button type="submit"><u>S</u>end</button>
                </div>
                </div>
                <div class="send-message__infos"></div>
            </div>
            <div class="item img">
                <div class="img__img">
                <img src="{avatarMe}">
            </div>
        </div>
    </div>
    
    <div class="footer"><a class="advertisement" href="#">Play the new MSN Messenger games</a></div>
  </div>
</div>
`;

function escapeHTML(unsafeText) {
  let div = document.createElement("div");
  div.innerText = unsafeText;
  return div.innerHTML;
}

function getResponseLength() {
  return 2 + Math.round(Math.random() * 10);
}

function getResponseDelay() {
  return 500 + Math.random() * 10 * 500;
}

export function openMessenger() {
  return function (opts) {
    const otherUser = getUser();
    const avatar = randAvatar();
    const a = Math.round(94 + Math.random() * 20);
    const avatarMe = `https://www.placecage.com/${a}/${a}?c=${new Date().getTime()}`;

    const win = makeWindow({
      icon: opts.icon,
      className: "no-padding",
      width: 500,
      height: 500,
      title: opts.title,
      content: htmlToElement(
        messengerTemplate
          .replace("{avatar}", avatar)
          .replace("{avatarMe}", avatarMe)
          .replace("{avatarSmall}", avatar)
          .replace("{username}", escapeHTML(otherUser.name))
          .replace("{mood}", escapeHTML(otherUser.mood))
          .replace("{email}", escapeHTML(otherUser.email))
      ),
    });

    const messageInfos = win.body.querySelector(".send-message__infos");
    const nudgeButton = win.body.querySelector(".nudge-button");
    const blockButton = win.body.querySelector(".block");
    const conversation = win.body.querySelector(".conversation");
    const advertisement = win.body.querySelector(".advertisement");

    function addMessage(from, content) {
      const isYou = from === "You say";
      conversation.appendChild(
        htmlToElement(`<div>
              <p class="from${isYou ? "-2" : ""}">${escapeHTML(from)}:</p>
              <p class="message">${escapeHTML(content)}</p>
            </div>`)
      );
      conversation.scrollTop = conversation.scrollHeight;
      if (!isYou) {
        messageInfos.innerText =
          "Last message received at " + new Date().toLocaleString();
      }
    }

    function triggerAnswer() {
      setTimeout(function () {
        addMessage(
          otherUser.name + " says",
          getResponse("wake up!", getResponseLength())
        );
      }, getResponseDelay());
    }

    nudgeButton.addEventListener("click", function () {
      win.element.classList.add("is-nudged");
      conversation.appendChild(
        htmlToElement(`<p class="nudge">You have just sent a nudge.</p>`)
      );
      conversation.scrollTop = conversation.scrollHeight;
      setTimeout(() => win.element.classList.remove("is-nudged"), 400);
      triggerAnswer();
    });

    blockButton.addEventListener("click", function () {
      win.element.classList.add("is-nudged");
      setTimeout(() => win.close(), 400);
    });

    advertisement.addEventListener("click", function (e) {
      e.preventDefault();
      setTimeout(function () {
        openBrowser("Internet Explorer", () => randItem(niceUrls))();
      }, 150);
    });

    win.setTitle("Messenger - " + otherUser.name);

    initChatbot(function () {
      addMessage(otherUser.name + " says", randItem(GREETINGS));

      const buttonSend = win.body.querySelector(
        ".send-message__textfield [type=submit]"
      );
      const textarea = win.body.querySelector(
        ".send-message__textfield textarea"
      );

      function sendMessage() {
        const msg = textarea.value.trim();
        if (!msg) return;
        addMessage("You say", msg);
        textarea.value = "";
        triggerAnswer();
      }

      buttonSend.addEventListener("click", sendMessage);
      textarea.addEventListener("keypress", function (e) {
        if (e.which == 13 || e.keyCode == 13) {
          e.preventDefault();
          sendMessage();
        }
      });
    });
  };
}