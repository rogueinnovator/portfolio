
/**
 * Function to generate a file name with the current date and time.
 * @param file - The original file.
 * @returns The new file name with a timestamp.
 */
export function renameFile(file: File): string {
  const currentDateTime = new Date()
    .toISOString()
    .replace(/[-:.]/g, '')
    .replace('T', '_')
    .split('.')[0];
  
  const fileExtension = file.name.split('.').pop();
  const newFileName = `${currentDateTime}.${fileExtension}`;
  
  return newFileName;
}

