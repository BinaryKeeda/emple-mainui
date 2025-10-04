export const calcMarks = (questions) => {
    let sum = 0;
    for (let i = 0; i < questions.length; i++) {
        sum += parseInt(questions[i].marks);
    }
    return sum;
}
