var traverseDomAndCollectElements = function (matchFunc, startEl = document.body) { // Definición de una función que recorre el DOM y recopila elementos que coinciden con ciertos criterios.
  var resultSet = [];   // Inicialización de un array para almacenar los elementos que coincidan.



  // recorre el árbol del DOM y recolecta elementos que matchien en resultSet
  // usa matchFunc para identificar elementos que matchien

  // TU CÓDIGO AQUÍ 
  if(matchFunc(startEl)) resultSet.push(startEl); // Verificar si el elemento actual cumple con los criterios de selección.

  for(let i = 0; i < startEl.children.length; i++){  // Iterar a través de los elementos hijos del elemento actual.
    let child = startEl.children[i];
    // Llamada recursiva para buscar elementos en el hijo actual y combinar los resultados.
    let aux = traverseDomAndCollectElements(matchFunc, child);
    resultSet = [...resultSet, ...aux];
  }

  return resultSet; // Devolver el conjunto de elementos que coinciden
};

// Detecta y devuelve el tipo de selector
// devuelve uno de estos tipos: id, class, tag.class, tag

var selectorTypeMatcher = function (selector) { // Función que determina el tipo de selector proporcionado
  // tu código aquí 
  //(# --> ID.)(. --> CLASS)(tag.class --> TAG CLASS) (--> TAG)
  if(selector[0] === "#") return "id"; // Si el selector comienza con '#', es un ID
  if(selector[0] === ".") return "class"; // Si el selector comienza con '.', es una clase
  if(selector.includes(".")) return "tag.class"; // Si contiene '.', es etiqueta y clase

  return "tag"; // Si no cumple con los casos anteriores, se asume que es solo una etiqueta

  
};

// NOTA SOBRE LA FUNCIÓN MATCH
// recuerda, la función matchFunction devuelta toma un elemento como un
// parametro y devuelve true/false dependiendo si el elemento
// matchea el selector.

var matchFunctionMaker = function (selector) { // Función que crea una función de coincidencia para un tipo de selector específico
  var selectorType = selectorTypeMatcher(selector);
  var matchFunction;

  // Según el tipo de selector, se crea una función de coincidencia específica
  if (selectorType === "id") {
    matchFunction = (element) => `#${element.id}` === selector; // Compara el ID del elemento

  } else if (selectorType === "class") {
    matchFunction = (element) => {
      let classes = element.classList;

      return classes.contains(selector.slice(1)); // Comprueba si la clase está presente
    }

  } else if (selectorType === "tag.class") {
    matchFunction = (element) =>{
      const [tag, className] = selector.split(".");

      //return matchFunctionMaker(tagName)(element) && matchFunctionMaker(`.${className}`)(element);

      return element.tagName.toLowerCase() === tag.toLowerCase() && element.classList.contains(className);
      // Compara la etiqueta y la clase
    }


  } else if (selectorType === "tag") {
    matchFunction = (element) => element.tagName === selector.toUpperCase();
  }
  return matchFunction; // Devuelve la función de coincidencia
};

// Función principal que permite seleccionar elementos del DOM
var $ = function (selector) {
  var elements;
  var selectorMatchFunc = matchFunctionMaker(selector);
   // Utiliza la función de coincidencia específica para buscar elementos
  elements = traverseDomAndCollectElements(selectorMatchFunc);
  return elements; // Devuelve el conjunto de elementos encontrados
};
