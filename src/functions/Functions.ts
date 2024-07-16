const dateMf =  ()=> {
    const formatDate = (date: Date): string => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
    
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };
    const now = new Date();
    const formattedDate = formatDate(now);

    return formattedDate
}

const redirectFunction = (url:string) => {
    window.location.href = url;
};

const formatDateDMY = (dateToFormat: any): string => {
    const date = new Date(dateToFormat);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
}

const formatGender = (genderValue : string): string => {
    switch (genderValue) {
      case "Masculino":
        return "M"
      case "Femenino":
        return "F"
      default:
        return ""
    }
}

export {dateMf,redirectFunction,formatDateDMY,formatGender}