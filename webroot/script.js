/** @typedef {import('../src/message.ts').DevvitSystemMessage} DevvitSystemMessage */
/** @typedef {import('../src/message.ts').WebViewMessage} WebViewMessage */

class App {
  constructor() {

    defineContent("gamer1");
    defineContent("gamer2");


    // Get references to the HTML elements

    this.startTimer1 = /** @type {HTMLButtonElement} */ (
      document.querySelector('#start-timer1')
    );
    this.startTimer2 = /** @type {HTMLButtonElement} */ (
      document.querySelector('#start-timer2')
    );

    this.pauseTimer1 = /** @type {HTMLButtonElement} */ (
      document.querySelector('#pause-timer1')
    );
    this.pauseTimer2 = /** @type {HTMLButtonElement} */ (
      document.querySelector('#pause-timer2')
    );

    this.resetTimer1 = /** @type {HTMLButtonElement} */ (
      document.querySelector('#reset-timer1')
    );
    this.resetTimer2 = /** @type {HTMLButtonElement} */ (
      document.querySelector('#reset-timer2')
    );

    this.sortArrangement1 = /** @type {HTMLButtonElement} */ (
      document.querySelector('#sort-arrangement1')
    );
    this.response1 = /** @type {HTMLSpanElement} */ (document.querySelector('#responseq'));

    this.sortArrangement2 = /** @type {HTMLButtonElement} */ (
      document.querySelector('#sort-arrangement2')
    );
    this.response2 = /** @type {HTMLSpanElement} */ (document.querySelector('#response2'));

    this.startTimer1.addEventListener('click', () => {
      startGamer1();
    });

    this.startTimer2.addEventListener('click', () => {
      startGamer2();
    });


    this.pauseTimer1.addEventListener('click', () => {
      pauseWatch();
    });

    this.pauseTimer2.addEventListener('click', () => {
      pauseWatch();
    });

    this.resetTimer1.addEventListener('click', () => {
      resetWatch();
    });

    this.resetTimer2.addEventListener('click', () => {
      resetWatch();
    });


    this.sortArrangement1.addEventListener('click', () => {
      sortArrangement('gamer1', 'response1')();
      this.timer1 = /** @type {HTMLDivElement} */ (document.querySelector('#timer1'));
      this.timer2 = /** @type {HTMLDivElement} */ (document.querySelector('#timer2'));
      postWebViewMessage({ type: 'setCounter', data: { newCounter: 'dxfcgjbkl' } });
    });

    this.sortArrangement2.addEventListener('click', () => {
      sortArrangement('gamer2', 'response2')();
    });





    this.output = /** @type {HTMLPreElement} */ (document.querySelector('#messageOutput'));
    this.increaseButton = /** @type {HTMLButtonElement} */ (
      document.querySelector('#btn-increase')
    );
    this.decreaseButton = /** @type {HTMLButtonElement} */ (
      document.querySelector('#btn-decrease')
    );
    this.usernameLabel = /** @type {HTMLSpanElement} */ (document.querySelector('#username'));
    this.counterLabel = /** @type {HTMLSpanElement} */ (document.querySelector('#counter'));
    this.counter = 0;

    // When the Devvit app sends a message with `postMessage()`, this will be triggered
    addEventListener('message', this.#onMessage);

    // This event gets called when the web view is loaded
    addEventListener('load', () => {
      postWebViewMessage({ type: 'webViewReady' });
    });

    this.increaseButton.addEventListener('click', () => {
      // Sends a message to the Devvit app
      postWebViewMessage({ type: 'setCounter', data: { newCounter: this.counter + 1 } });
    });

    this.decreaseButton.addEventListener('click', () => {
      // Sends a message to the Devvit app
      postWebViewMessage({ type: 'setCounter', data: { newCounter: this.counter - 1 } });
    });
  }

  /**
   * @arg {MessageEvent<DevvitSystemMessage>} ev
   * @return {void}
   */
  #onMessage = (ev) => {
    // Reserved type for messages sent via `context.ui.webView.postMessage`
    if (ev.data.type !== 'devvit-message') return;
    const { message } = ev.data.data;

    // Always output full message
    this.output.replaceChildren(JSON.stringify(message, undefined, 2));

    switch (message.type) {
      case 'initialData': {
        // Load initial data
        const { username, currentCounter } = message.data;
        this.usernameLabel.innerText = username;
        this.counter = 'currentCounter';
        this.counterLabel.innerText = `${this.counter}`;
        break;
      }
      case 'updateCounter': {
        const { currentCounter } = message.data;
        this.counter = 'currentCounter';
        this.counterLabel.innerText = `${this.counter}`;
        break;
      }
      default:
        /** to-do: @satisifes {never} */
        const _ = message;
        break;
    }
  };
}


const numbers = [2, 9, 7, 1, 6, 10, 3, 8, 4, 5];

        function rearrangeSort(array) {
            return array.sort(() => Math.random() - 0.5);
        }

        function defineContent(gamerId) {
            const numbas = document.getElementById(gamerId);
            numbas.innerHTML = "";
            rearrangeSort(numbers).forEach(num => {
                let li = document.createElement("li");
                li.textContent = num;
                li.classList.add("gameui-item");
                li.draggable = true;           
                li.ondragover = numberDraggedOver;
                li.ondragstart = startNumberDrag;
                li.ondrop = numberDropped;
                numbas.appendChild(li);
            });
        }

        let numberDragged = null;

        function startNumberDrag(event) {
            numberDragged = event.target;
        }

        function numberDraggedOver(event) {
            event.preventDefault();
        }

        function numberDropped(event) {
            event.preventDefault();
            if (event.target.classList.contains("gameui-item")) {
                let listNumbas = event.target.parentElement;
                let numbas = Array.from(listNumbas.children);
                let indexDestinationNumber = numbas.indexOf(event.target);
                let indexDraggedNumba = numbas.indexOf(numberDragged);
                if (indexDraggedNumba !== indexDestinationNumber) {
                    listNumbas.insertBefore(numberDragged, indexDestinationNumber < indexDraggedNumba ? event.target : event.target.nextSibling);
                }
            }
        }

        function sortArrangement(numberRef, responseRef) {
            let listNumbas = document.querySelectorAll(`#${numberRef} li`);
            let presentArrangement = Array.from(listNumbas).map(li => parseInt(li.textContent));
            if (JSON.stringify(presentArrangement) === JSON.stringify([...numbers].sort((a, b) => a - b))) {
                document.getElementById(responseRef).textContent = "Sorting Completed!";
                document.getElementById(responseRef).style.color = "#00ff00";
                pauseWatch();

            } else {
                document.getElementById(responseRef).textContent = "Not in order, Continue....";
                document.getElementById(responseRef).style.color = "#0000ff";
            }
        }

        

        // timer in seconds
        let countdownTime = 0; // 10 minutes
        let timerInterval;
        let isPaused = false;

        function startTimer(duration, display) {
            if(!isPaused) {
            let timer = duration, hours, minutes, seconds;
            timerInterval = setInterval(function () {
                hours = Math.floor(timer / 3600);
                minutes = Math.floor((timer % 3600) / 60);
                seconds = Math.floor(timer % 60);

                hours = hours < 10 ? "0" + hours : hours;
                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;

                display.textContent = hours + ":" + minutes + ":" + seconds;
                timer++;
            }, 1000);
        }
        isPaused = false;
        }

        function startGamer1() {
            resetWatch();
            let display = document.getElementById('timer');
            document.getElementById('response1').textContent = "";
            defineContent("gamer1");
            startTimer(countdownTime, display);
        }
        function startGamer2() {
            resetWatch();
            let display2 = document.getElementById('timer2');
            document.getElementById('response2').textContent = "";
            defineContent("gamer2");
            startTimer(countdownTime, display2);
        }

        function pauseWatch() {
            clearInterval(timerInterval);
            isPaused = true;
        }

        function resetWatch() {
            clearInterval(timerInterval);
            countdownTime = 0;
            isPaused = false;
        }

/**
 * Sends a message to the Devvit app.
 * @arg {WebViewMessage} msg
 * @return {void}
 */
function postWebViewMessage(msg) {
  parent.postMessage(msg, '*');
}

new App();
