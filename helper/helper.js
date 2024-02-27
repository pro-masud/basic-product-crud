// create product id like mongoDB Database
export const generateMongoId =  () => {
    const timestamp = (new Date().getTime() / 1000 | 0).toString(16);
    const machineId = Math.floor(Math.random() * 16777215).toString(16);
    const processId = Math.floor(Math.random() * 65535).toString(16);
    const counter = Math.floor(Math.random() * 16777215).toString(16);
  
    return timestamp + machineId + processId + counter;
  }


    // product slug function
    export const createProductSlug = (title) => {
      return title.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
    }