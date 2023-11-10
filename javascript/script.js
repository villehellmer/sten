const imageContainers = document.querySelectorAll('.image-container');

// Function to get a random position within the window's bounds
function getRandomPosition() {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const maxWidth = windowWidth - 200; // Subtract image width
  const maxHeight = windowHeight - 200; // Subtract image height
  const x = Math.floor(Math.random() * maxWidth);
  const y = Math.floor(Math.random() * maxHeight);
  return { x, y };
}

imageContainers.forEach((container) => {
  let isFollowing = false;
  let lastCursorPosition = { x: 0, y: 0 };

  // Set a random initial position for each image container
  const randomPosition = getRandomPosition();
  container.style.transform = `translate(${randomPosition.x}px, ${randomPosition.y}px`;

  container.addEventListener('click', (e) => {
    if (isFollowing) {
      // Release the image at the last cursor position
      container.style.transform = `translate(${lastCursorPosition.x}px, ${lastCursorPosition.y}px)`;
      isFollowing = false;
    } else {
      // Start following the cursor
      container.style.zIndex = 1;
      container.style.cursor = 'grabbing';
      const rect = container.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const offsetY = e.clientY - rect.top;

      const onMouseMove = (e) => {
        const x = e.clientX - offsetX;
        const y = e.clientY - offsetY;
        container.style.transform = `translate(${x}px, ${y}px)`;
        lastCursorPosition = { x, y }; // Store the current cursor position
      };

      const onMouseUp = () => {
        container.style.zIndex = 0;
        container.style.cursor = 'grab';
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
      isFollowing = true;
    }
  });
});