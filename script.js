document.addEventListener("DOMContentLoaded", () => {
          const puzzleContainer = document.getElementById("puzzle-container");
      
          // Image URL (you can replace this with your own image)
          const imageUrl = "./images/fan_art.jpg"; // Replace with the puzzle image path
      
          // Pieces metadata
          const pieces = [
              { id: 1, x: 0, y: 0 },
              { id: 2, x: -100, y: 0 },
              { id: 3, x: -200, y: 0 },
              { id: 4, x: 0, y: -100 },
              { id: 5, x: -100, y: -100 },
              { id: 6, x: -200, y: -100 },
              { id: 7, x: 0, y: -200 },
              { id: 8, x: -100, y: -200 },
              { id: 9, x: -200, y: -200 }
          ];
      
          // Shuffle and render pieces
          const shuffledPieces = [...pieces].sort(() => Math.random() - 0.5);
          shuffledPieces.forEach((piece) => {
              const div = document.createElement("div");
              div.classList.add("puzzle-piece");
              div.style.backgroundImage = `url(${imageUrl})`;
              div.style.backgroundPosition = `${piece.x}px ${piece.y}px`;
              div.dataset.correctId = piece.id;
              div.dataset.currentId = piece.id;
              div.draggable = true;
              puzzleContainer.appendChild(div);
          });
      
          // Drag-and-drop functionality
          let draggedElement = null;
      
          puzzleContainer.addEventListener("dragstart", (e) => {
              if (e.target.classList.contains("puzzle-piece")) {
                  draggedElement = e.target;
              }
          });
      
          puzzleContainer.addEventListener("dragover", (e) => {
              e.preventDefault();
          });
      
          puzzleContainer.addEventListener("drop", (e) => {
              if (e.target.classList.contains("puzzle-piece") && draggedElement) {
                  const targetId = e.target.dataset.currentId;
                  const draggedId = draggedElement.dataset.currentId;
      
                  // Swap IDs
                  e.target.dataset.currentId = draggedId;
                  draggedElement.dataset.currentId = targetId;
      
                  // Swap positions
                  const draggedStyle = draggedElement.style.cssText;
                  draggedElement.style.cssText = e.target.style.cssText;
                  e.target.style.cssText = draggedStyle;
      
                  // Check if the puzzle is solved
                  const allPieces = document.querySelectorAll(".puzzle-piece");
                  const isSolved = Array.from(allPieces).every(
                      (piece) => piece.dataset.correctId === piece.dataset.currentId
                  );
      
                  if (isSolved) {
                      allPieces.forEach((piece) => piece.classList.add("correct"));
                      alert("Congratulations! You've solved the puzzle!");
                  }
              }
          });
      });