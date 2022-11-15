import { operations } from '#Constants/operations';
import { InvalidInputError } from '#Errors/invalidInputError';
import { promptQuestion } from '#Lib/promptQuestion';
import { extractByRegex } from './extractByRegex.js';

export const bootstrap = async () => {
    try {
        // 1º captura entrada de usuario por consola
        const userAnswer = await promptQuestion('Introduce tu operación: ');

        // 2º Validar entrada y separar las partes de la misma en operandos y operaciones
        const standarizeInput = userAnswer.trim().replaceAll(',', '.');
        if (!standarizeInput) throw new InvalidInputError();
        if (standarizeInput === 'exit') {
            return true;
        }
        const [firstOperating, operator, secondOperating] =
            extractByRegex(standarizeInput);
        // 3º Realizar la operación
        const result = operations[operator](firstOperating, secondOperating);

        const roundedResult = Number(Math.round(result + 'e+5') + 'e-5');

        if (isNaN(roundedResult) || !isFinite(roundedResult))
            console.log('operación no válida\n');
        else console.log(`El resultado es: ${roundedResult}\n`);
        // 4º Mostrar resultado por consola
    } catch (error) {
        if (error instanceof InvalidInputError)
            console.log(`${error.message}\n`);
        else
            console.log(
                `Error no esperado: ${error.message}. Stack: ${error.stack}n`
            );
    }
};
