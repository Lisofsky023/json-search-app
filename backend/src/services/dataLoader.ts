import fsPromises from 'fs/promises';
import path from 'path';

export async function loadJsonData() {
  const dataPath = path.join(__dirname, '../data/data.json');
  try {
    const rawData = await fsPromises.readFile(dataPath, 'utf-8');
    return JSON.parse(rawData);
  } catch (error) {
    console.error('Error reading JSON data:', error);
    throw error;
  }
}
