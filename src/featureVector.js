$(function() {
	var sampleDataLength = 10000;
	var dt = 0.01; // Length of time in each sample (s)
	var cutoff = 300; // Hz
	var order = 1; // Order of low pass filter
	var RC = cutoff/6.28;
	var alpha = dt/(RC + dt);
	
	var sampleData = randomArray(sampleDataLength);
	lowPass(sampleData, alpha, order);
	var position = sampleData;
	var velocity = timeDerivative(position, dt);
	var acceleration = timeDerivative(velocity, dt);

	console.log(sampleData);
	console.log(position);
	console.log(velocity);
	console.log(acceleration);
});

function lowPass(array, alpha, order) {
	for (var iterations=0; iterations < order; iterations++) {
		for (var j=1; j < array.length; j++){
			var temp = array[j];
			array[j] = array[j-1] + (alpha*(temp-array[j-1]));
		}
	}
}
function randomArray(size){
	var array = [];
	for (var i=0; i < size; i++) {
		array.push(Math.random());
	}
	return array;
}

function timeDerivative(array, dt) { 
	var derivative = [];
	for (var i=1; i < array.length; i++) {
		derivative.push((array[i]-array[i-1])/dt);
	}
	return derivative;
}

function localMaxima(array){ 
	var maxima = [];
	for (var i=2; i < array.length-2; i++) {
		if (array[i-2] < array[i-1] && array[i-1] < array[i] && array[i] > array[i+1] && array[i+1] > array[i+2]){
			maxima.push(i);
		}
	}
	return maxima;
}

function localMinima(array){
	var minima = [];
	for (var i=2; i < array.length-2; i++) {
		if (array[i-2] > array[i-1] && array[i-1] > array[i] && array[i] < array[i+1] && array[i+1] < array[i+2]) {
			minima.push(i);
		}
	}
	return minima;
}