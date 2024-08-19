import * as tf from '@tensorflow/tfjs'

export function createModel(inputSize) {
	const model = tf.sequential()

	model.add(
		tf.layers.dense({ inputShape: [inputSize], units: 24, activation: 'relu' })
	)
	model.add(tf.layers.dense({ units: 24, activation: 'relu' }))
	model.add(tf.layers.dense({ units: 4, activation: 'softmax' })) // 4 possible directions

	model.compile({ optimizer: 'adam', loss: 'categoricalCrossentropy' })

	return model
}

export function trainModel(model, trainingData, labels) {
	const xs = tf.tensor2d(trainingData)
	const ys = tf.tensor2d(labels)

	return model.fit(xs, ys, {
		shuffle: true,
		epochs: 100,
	})
}

export function predictNextMove(model, input) {
	const prediction = model.predict(tf.tensor2d([input]))
	return prediction.argMax(1).dataSync()[0]
}
