import { MemoryContent, MemoryItem } from '@/store/types';
import { loadIcons } from './loadIcons';
import { shuffleArray } from './shuffleArray';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GridSize, Theme } from '@/shared/types';

export const generateMemoryItems = (theme: Theme, gridSize: GridSize): MemoryItem[] => {
  let memoryContent: MemoryContent[] = [];
  const maxNumber = (gridSize * gridSize) / 2;
  
  if (theme === 'icons') {
    const icons = loadIcons.map((icon) => (<FontAwesomeIcon icon={icon} />));
    icons.length = maxNumber;
    memoryContent = icons;
  } else {
    for (let i=1; i <= maxNumber; i++) {
      memoryContent.push(i);
    }
  }

  const shuffledMemoryItems = [...shuffleArray(memoryContent), ...shuffleArray(memoryContent)].map((content, index) => {
    return {
      id: index,
      content,
      opened: false,
      discovered: false,
    }
  });

  return shuffledMemoryItems;
};