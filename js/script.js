const d = document;

/*** Operaciones para poder realizar la función calcular ***/
const sumar = (num1, num2) => {
  return parseFloat(num1) + parseFloat(num2);
};

const restar = (num1, num2) => {
  return parseFloat(num1) - parseFloat(num2);
};

const multiplicar = (num1, num2) => {
  return parseFloat(num1) * parseFloat(num2);
};

const dividir = (num1, num2) => {
  return num2 === 0
    ? "No se puede dividir por cero"
    : parseFloat(num1) / parseFloat(num2);
};

/** FUNCION CALCULAR:
 * param1: primer numero ingresado
 * param2: operador para realizar el calculo
 * param3: segundo numero ingresado
 ***/
const calcular = (num1, operador, num2) => {
  let resultado = "";

  switch (operador) {
    case "sumar":
      resultado = sumar(num1, num2);
      break;
    case "restar":
      resultado = restar(num1, num2);
      break;
    case "multiplicar":
      resultado = multiplicar(num1, num2);
      break;
    case "dividir":
      resultado = dividir(num1, num2);
      break;
    default:
      resultado = "ERROR";
      break;
  }

  return resultado;
};

d.addEventListener("DOMContentLoaded", function () {
  const calculadora = d.querySelector(".calculator");
  const botones = calculadora.querySelector(".calculator-buttons");
  const display = d.querySelector(".calculator-display");

  //Uso el método .addEventListener y le paso el atributo ONCLICK y otro segundo atributo que es una ARROW FUNCTION
  botones.addEventListener("click", (e) => {
    // e (evento que dispara, al que voy a hacer target, para ver si hay un match de que sea un botón, si no lo es lo ignora)
    if (e.target.matches("button")) {
      const tecla = e.target; //accedo a la tecla para ver que el evento de hacer click sea en un boton
      const accion = tecla.dataset.accion;
      const contenidoDelBoton = tecla.textContent;
      const numeroMostrado = display.textContent;
      const teclaTipeadaAnteriormente =
        calculadora.dataset.teclaTipeadaAnteriormente;

      if (!accion) {
        console.log("NÚMERO!");
        //Para que en el display me muestre los numeros que voy haciendo click
        if (
          numeroMostrado === "0" ||
          teclaTipeadaAnteriormente === "operador"
        ) {
          display.textContent = contenidoDelBoton;
        } else {
          display.textContent = numeroMostrado + contenidoDelBoton;
        }
        calculadora.dataset.teclaTipeadaAnteriormente = "numero";
      }
      if (
        accion === "sumar" ||
        accion === "restar" ||
        accion === "multiplicar" ||
        accion === "dividir"
      ) {
        console.log("OPERACION!");
        //Seteo estados
        calculadora.dataset.teclaTipeadaAnteriormente = "operador";
        calculadora.dataset.primerValor = numeroMostrado;
        calculadora.dataset.operador = accion;
      }
      if (accion === "decimal") {
        console.log("DECIMAL!");
        display.textContent = numeroMostrado + ".";
        calculadora.dataset.teclaTipeadaAnteriormente = "decimal";
      }

      if (accion === "borrar") {
        console.log("BORRANDO!");
        display.textContent = 0;
        //Para des setear que quede el mismo numero y ultimo operador seteado, para que no se repita la ultima operacion
        calculadora.dataset.teclaTipeadaAnteriormente = "";
        calculadora.dataset.primerValor = "";
        calculadora.dataset.operador = "";
      }

      if (accion === "calcular") {
        console.log("boton de igual!");
        display.textContent = calcular(
          calculadora.dataset.primerValor,
          calculadora.dataset.operador,
          numeroMostrado
        );
      }
    }
  });
});
