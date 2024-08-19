export function generateMaze(size) {
	let maze = Array(size)
		.fill()
		.map(() => Array(size).fill(1))

	function carvePassage(x, y) {
		const directions = [
			[0, 1], // Right
			[1, 0], // Down
			[0, -1], // Left
			[-1, 0], // Up
		].sort(() => Math.random() - 0.5) // Shuffle directions

		for (let [dx, dy] of directions) {
			const nx = x + dx * 2,
				ny = y + dy * 2
			if (nx >= 0 && ny >= 0 && nx < size && ny < size && maze[ny][nx] === 1) {
				maze[ny - dy][nx - dx] = 0
				maze[ny][nx] = 0
				carvePassage(nx, ny)
			}
		}
	}

	maze[1][1] = 0
	carvePassage(1, 1)
	maze[size - 2][size - 2] = 0 // End point
	return maze
}

export function drawMaze(ctx, maze) {
	const blockSize = 20
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
	ctx.canvas.width = maze.length * blockSize
	ctx.canvas.height = maze.length * blockSize

	for (let y = 0; y < maze.length; y++) {
		for (let x = 0; x < maze[y].length; x++) {
			if (x === 1 && y === 1) {
				ctx.fillStyle = '#0F0' // Start point
			} else if (x === maze.length - 2 && y === maze.length - 2) {
				ctx.fillStyle = '#F00' // End point
			} else {
				ctx.fillStyle = maze[y][x] === 1 ? '#000' : '#FFF'
			}
			ctx.fillRect(x * blockSize, y * blockSize, blockSize, blockSize)
		}
	}
}

export function drawBot(ctx, x, y) {
	const blockSize = 20
	ctx.fillStyle = '#00F' // Цвет бота
	ctx.fillRect(x * blockSize, y * blockSize, blockSize, blockSize)
}
