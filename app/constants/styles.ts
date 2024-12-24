export const FONT_WEIGHTS = {
  REGULAR: 'Regular',
  MEDIUM: 'Medium',
  SEMIBOLD: 'Semibold',
  BOLD: 'Bold',
} as const;

export const TAB_POSITIONS = ['first', 'second', 'third', 'fourth'] as const;

export const IMAGE_DIMENSIONS = {
  ICON: {
    width: 100,
    height: 100,
  },
  SMALL_ICON: {
    width: 50,
    height: 50,
  },
  THUMBNAIL: {
    width: 32,
    height: 32,
  },
} as const; 