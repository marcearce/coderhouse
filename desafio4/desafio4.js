const { fromEvent, map } = rxjs;

const textBox = document.getElementById("inputText");
const textMirror = document.getElementsByTagName("span")[0];

const textObservable = fromEvent(textBox, "keyup");

const textoInvertido = textObservable.pipe(
  map((event) => {
    if (event.target.value === "error") {
      observer.error("Se desuscribió al observer por escribir ´error´");
    }
    if (event.target.value === "completed") {
      observer.complete();
    }
    let mirror = event.target.value.split("").reverse().join("");
    return mirror;
  })
);

let suscribed = true;

const disableMirror = () => {
  textBox.value = "";
  textBox.setAttribute("disabled", true);
  textMirror.innerHTML = "";
  observer.unsubscribe();
  suscribed = false;
};

//suscribiendose al obs
let observer = textoInvertido.subscribe({
  next: (valor) => {
    textMirror.innerHTML = valor;
  },
  error: (error) => {
    disableMirror();
    console.error(error);
  },
  complete: () => {
    disableMirror();
    console.info("completado desuscripción");
  },
});

//luego de 30 segundos desuscribirse
setTimeout(() => {
  if (suscribed) {
    disableMirror();
    console.log("pasaron 30 segundos, se desuscribió");
  } else {
    console.log("pasaron 30 segundos, pero ya estaba desuscrito");
  }
}, 30000);
