let sim = {
	size: [ 256, 256 ],
	bodies: [
		{
			circle: { radius: 64, position: [ 192, 192 ] },
			velocity: [ 0.5, 1 ]
		},
		{
			circle: { radius: 32, position: [ 64, 192 ] },
			velocity: [ 2, 1 ]
		},
		{
			circle: { radius: 16, position: [ 192, 64 ] },
			velocity: [ 2, 4 ]
		},
		{
			circle: { radius: 8, position: [ 64, 64 ] },
			velocity: [ 8, 4 ]
		}
	]
}

let canvas = document.createElement("canvas")
let context = canvas.getContext("2d")
canvas.width = width(sim)
canvas.height = height(sim)
document.body.appendChild(canvas)
loop()

function loop() {
	render(sim)
	update(sim)
	requestAnimationFrame(loop)
	// setTimeout(loop, 500)
}

function render(sim) {
	const colors = [ "red", "lime", "blue", "yellow", "cyan", "magenta" ]
	context.fillStyle = "black"
	context.fillRect(0, 0, width(sim), height(sim))
	for (let i = 0; i < sim.bodies.length; i++) {
		let body = sim.bodies[i]
		let circle = body.circle
		context.beginPath()
		context.fillStyle = colors[i]
		context.arc(x(circle), y(circle), radius(circle), 0, 2 * Math.PI)
		context.fill()
	}
}

function update(sim) {
	for (let body of sim.bodies) {
		let circle = body.circle
		circle.position[0] += body.velocity[0]
		circle.position[1] += body.velocity[1]
		if (left(circle) < 0) {
			left(circle, 0)
			body.velocity[0] *= -1
		} else if (right(circle) > width(sim)) {
			right(circle, width(sim))
			body.velocity[0] *= -1
		}
		if (top(circle) < 0) {
			top(circle, 0)
			body.velocity[1] *= -1
		} else if (bottom(circle) > height(sim)) {
			bottom(circle, height(sim))
			body.velocity[1] *= -1
		}
	}
	for (let i = 0; i < sim.bodies.length - 1; i++) {
		let a = sim.bodies[i]
		let y1 = a.circle.position
		let x1 = [
			y1[0] - a.velocity[0],
			y1[1] - a.velocity[1]
		]
		for (let j = i + 1; j < sim.bodies.length; j++) {
			let b = sim.bodies[j]
			let y2 = b.circle.position
			let x2 = [
				y2[0] - b.velocity[0],
				y2[1] - b.velocity[1]
			]
			if (intersects(a, b) && quadrance(y1, y2) < quadrance(x1, x2)) {
				let [ v1, v2 ] = resolve(a, b)
				a.velocity = v1
				b.velocity = v2
			}
		}
	}
}

function mass(body) {
	return body.circle.radius
}

function resolve(a, b) {
	let x1 = a.circle.position
	let x2 = b.circle.position
	let u1 = a.velocity
	let u2 = b.velocity
	let m1 = mass(a)
	let m2 = mass(b)
	let v1 = subtract(u1, scale(subtract(x1, x2),
		((2 * m2) / (m1 + m2))
		* (dot(subtract(u1, u2), subtract(x1, x2)) / Math.pow(magnitude(subtract(x1, x2)), 2))
	))
	let v2 = subtract(u2, scale(subtract(x2, x1),
		((2 * m1) / (m1 + m2))
		* (dot(subtract(u2, u1), subtract(x2, x1)) / Math.pow(magnitude(subtract(x2, x1)), 2))
	))

	return [ v1, v2 ]
}

function normalize(vector) {
	let x = magnitude(vector) || 1
	return [ vector[0] / x, vector[1] / x ]
}

function scale(v, x) {
	return [ v[0] * x, v[1] * x ]
}

function add(a, b) {
	return [ a[0] + b[0], a[1] + b[1] ]
}

function subtract(a, b) {
	return [ a[0] - b[0], a[1] - b[1] ]
}

function dot(a, b) {
	return a[0] * b[0] + a[1] * b[1]
}

function magnitude(vector) {
	return Math.sqrt(Math.pow(vector[0], 2) + Math.pow(vector[1], 2))
}

function intersects(a, b) {
	return quadrance(a.circle.position, b.circle.position) < Math.pow(a.circle.radius + b.circle.radius, 2)
}

function distance(a, b) {
	return Math.sqrt(quadrance(a, b))
}

function quadrance(a, b) {
	return Math.pow(b[0] - a[0], 2) + Math.pow(b[1] - a[1], 2)
}

function width(sim) {
	return sim.size[0]
}

function height(sim) {
	return sim.size[1]
}

function left(circle, value) {
	if (value === undefined) {
		return x(circle) - radius(circle)
	}
	x(circle, value + radius(circle))
}

function right(circle, value) {
	if (value === undefined) {
		return x(circle) + radius(circle)
	}
	x(circle, value - radius(circle))
}

function top(circle, value) {
	if (value === undefined) {
		return y(circle) - radius(circle)
	}
	y(circle, value + radius(circle))
}

function bottom(circle, value) {
	if (value === undefined) {
		return y(circle) + radius(circle)
	}
	y(circle, value - radius(circle))
}

function x(circle, value) {
	if (value === undefined) {
		return circle.position[0]
	}
	circle.position[0] = value
}

function y(circle, value) {
	if (value === undefined) {
		return circle.position[1]
	}
	circle.position[1] = value
}

function radius(circle) {
	return circle.radius
}
