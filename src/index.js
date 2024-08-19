import { drawBot, drawMaze, generateMaze } from './maze.js'

const canvas = document.getElementById('mazeCanvas')
const ctx = canvas.getContext('2d')
const statusDiv = document.getElementById('status')
const newLevelBtn = document.getElementById('newLevelBtn')

let size = 15 // Начальный размер лабиринта
let maze
let botX, botY
let stack

function initializeLevel() {
	maze = generateMaze(size)
	botX = 1
	botY = 1
	stack = [[botX, botY]]

	drawMaze(ctx, maze)
	drawBot(ctx, botX, botY)
	statusDiv.textContent = `Level size: ${size}`
	moveBot()
}

function moveBot() {
	drawMaze(ctx, maze) // Перерисовываем лабиринт
	drawBot(ctx, botX, botY) // Рисуем бота на новой позиции

	if (stack.length === 0) {
		statusDiv.textContent = 'Bot is stuck!'
		return
	}

	;[botX, botY] = stack.pop() // Получаем текущую позицию из стека

	if (botX === size - 2 && botY === size - 2) {
		statusDiv.textContent = 'Bot has reached the goal!'
		return
	}

	// Возможные направления (вправо, вниз, влево, вверх)
	const directions = [
		[botX + 1, botY], // Right
		[botX, botY + 1], // Down
		[botX - 1, botY], // Left
		[botX, botY - 1], // Up
	]

	for (let [newX, newY] of directions) {
		if (
			newX > 0 &&
			newX < size &&
			newY > 0 &&
			newY < size &&
			maze[newY][newX] === 0
		) {
			stack.push([newX, newY])
			maze[newY][newX] = 2 // Помечаем как посещенное
		}
	}

	setTimeout(moveBot, 10) // Задержка 100 мс между движениями
}

newLevelBtn.addEventListener('click', () => {
	size += 2 // Увеличиваем размер лабиринта на каждом уровне
	initializeLevel()
})

// Инициализация первого уровня
initializeLevel()
