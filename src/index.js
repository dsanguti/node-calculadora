import { InvalidInputError } from '#Errors/invalidInputError';
import { getOperator } from '#Lib/getOperator';
import { promptQuestion } from '#Lib/promptQuestion';

(async () => {
    try {
        // 1º captura entrada de usuario por consola
        const userAnswer = await promptQuestion('Introduce tu operación: ');

        // 2º Validar enrada y separar las partes de la misma en operandos y operaciones
        const standarizeInput = userAnswer.trim();
        if (standarizeInput === '') throw new InvalidInputError();

        const operator = getOperator(standarizeInput);

        if (!operator) throw new InvalidInputError();
    } catch (error) {
        if (error instanceof InvalidInputError) console.log(error.message);
        else
            console.log(
                `Error no controlado: ${error.message}. Stack: ${error.stack}`
            );
    }
    // 3º Realizar la operación
    // 4º Mostrar resultado por consola
})();
