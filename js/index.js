import game from './game.js'

function main () {
  game.init()
  game.start()
  document.addEventListener("visibilitychange", function () {
    console.log(document.visibilityState)
    if (document.visibilityState === "hidden") {
      game.stop();
      game.paused = true;
    }
  });
}

main()