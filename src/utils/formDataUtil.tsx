export default function createFormData(data: Record<string, any>): FormData {
    const formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
      if (Array.isArray(value)) {
        value.forEach((item) => formData.append(key, item));
      } else if (value !== null && value !== undefined) {
        formData.append(key, value);
      }
    }
    return formData;
  }