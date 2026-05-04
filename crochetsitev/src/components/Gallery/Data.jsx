const images = import.meta.glob('../../assets/gallery-photos/*.{jpg,jpeg,png,webp}', {
  eager: true
});

const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

export const galleryData = shuffleArray(
  Object.entries(images).map(([path, module], index) => ({
    id: index + 1,
    image: module.default,
    alt: path.split('/').pop()
  }))
);