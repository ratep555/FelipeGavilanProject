export function toBase64(file: File){
    // promise is a function that will return something in the future
    return new Promise((resolve, reject) => {
        // hover over filereader
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
}
// output is an array of strings
export function parseWebAPIErrors(response: any): string[] {
    const result: string[] = [];

    // ovo je error property, možeš ga vidjeti u konzoli, lekcija 93
    if (response.error){
        if (typeof response.error === 'string'){
            result.push(response.error);
            // ovdje parsiramo greške
        } else if (Array.isArray(response.error)) {
            response.error.forEach(value => result.push(value.description));
        }
        else {
            const mapErrors = response.error.errors;
            // we are transforming object into array
            const entries = Object.entries(mapErrors);
            entries.forEach((arr: any[]) => {
                // first element of the array
                const field = arr[0];
                // second element of the array is the array of errors
                arr[1].forEach(errorMessage => {
                    result.push(`${field}: ${errorMessage}`);
                });
            });
        }
    }

    return result;
}

export function formatDateFormData(date: Date){
    date = new Date(date);
    const format = new Intl.DateTimeFormat('en', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });

    const [
        {value: month}, ,
        {value: day}, ,
        {value: year}
    ] = format.formatToParts(date);

    // now we are transforming date into a string
    // yyyy-MM-dd
    return `${year}-${month}-${day}`;
}
