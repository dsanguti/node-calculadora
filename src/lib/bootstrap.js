import { operations } from '#Constants/operations';
import { BINARY_OPERATORS } from '#Constants/operators';
import { InvalidInputError } from '#Errors/invalidInputError';
import { getBinaryOperatings, getSingleOperatings } from '#Lib/getOperatings';
import { getOperator } from '#Lib/getOperator';
import { promptQuestion } from '#Lib/promptQuestion';

export const bootstrap = async () => {
    try {
        // 1º captura entrada de usuario por consola
        const userAnswer = await promptQuestion('Introduce tu operación: ');

        // 2º Validar entrada y separar las partes de la misma en operandos y operaciones
        const standarizeInput = userAnswer.trim();
        if (!standarizeInput) throw new InvalidInputError();
        if (standarizeInput === 'exit') {
            return true;
        }
        const operator = getOperator(standarizeInput);

        if (!operator) throw new InvalidInputError();

        const splittedInput = standarizeInput.split(operator);

        let firstOperating, secondOperating;
        if (BINARY_OPERATORS.includes(operator))
            [firstOperating, secondOperating] =
                getBinaryOperatings(splittedInput);
        else [firstOperating] = getSingleOperatings(splittedInput);

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
