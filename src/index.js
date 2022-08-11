import { promptQuestion } from '#Lib/promptQuestion.js';

// 1º captura entrada de usuario por consola
(async () => {
    const userAnswer = await promptQuestion('Introduce tu operación: ');
    console.log(userAnswer);
})();
// 2º Validar enrada y separar las partes de la misma en operandos y operaciones
// 3º Realizar la operación
// 4º Mostrar resultado por consola
