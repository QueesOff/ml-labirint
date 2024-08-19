const express = require('express')
const { createCanvas } = require('canvas')
const tf = require('@tensorflow/tfjs-node')
const app = express()

app.use(express.static('public'))
app.use(express.json())

let maze = generateMaze(10, 10) // Изначальный размер лабиринта

app.get('/maze', (req, res) => {
	res.json(maze)
})

app.post('/result', (req, res) => {
	const { success } = req.body
	if (success) {
		// Увеличение сложности лабиринта
		const newSize = maze.length + 2
		maze = generateMaze(newSize, newSize)
	}
	res.json({ maze })
})

function generateMaze(width, height) {
	// Пример генерации простого лабиринта
	const maze = Array.from({ length: height }, () => Array(width).fill(0))
	// Простая генерация стен и проходов
	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			maze[y][x] = Math.random() > 0.7 ? 1 : 0 // 1 - стена, 0 - проход
		}
	}
	maze[0][0] = 0 // Начало
	maze[height - 1][width - 1] = 0 // Конец
	return maze
}

app.listen(3000, () => {
	console.log('Server running on http://localhost:3000')
})
