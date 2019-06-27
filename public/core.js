function core() {

		var audio = document.getElementById('audio');

		var socket = io();

		var rendering = false;

		var width = 40;
		var height = 30;

		var width_img = width*10;
		var height_img = height*10;

		var interval = null;
		var movement_done = false;
		var cycleTimer;

		var imageCompare = null;
	
		var oldImage = null;

		var topLeft = [Infinity,Infinity];
		var bottomRight = [0,0];

		var raf = (function(){
			return  window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame ||
			function(anim){
				setTimeout(anim, 1000/60);
			};
		})();

		/*
		 * Initializes the object.
		 *
		 * @return void.
		 *
		 */
		function initialize() { 
			imageCompare = image_compare();

			rendering = true;

			main();
		}

		/*
		 * Compares to images and updates the position
		 * of the motion div.
		 *
		 * @return void.
		 *
		 */
		// var count=0;
		// var render = setInterval(function(){
		// 		if(count == 5) {
		// 			clearInterval(render);
		// 			setTimeout(render, 5000)
		// 		}
		// 		count++;
		// 		console.log('hey')
		// }, 1000);


		function render(){
			// cycleTimer = setInterval(function () {
			oldImage = new Image(width_img, height_img);
			oldImage.src = imageObj.src
			imageObj.src = webcam.toDataURL()
			
			if(!oldImage || !imageObj) {
				return;
			}

			var vals = imageCompare.compare(imageObj, oldImage, width, height);
			topLeft[0] = vals.topLeft[0] * 10;
			topLeft[1] = vals.topLeft[1] * 10;

			bottomRight[0] = vals.bottomRight[0] * 10;
			bottomRight[1] = vals.bottomRight[1] * 10;

			document.getElementById('movement').style.top = topLeft[1] + 'px';
			document.getElementById('movement').style.left = topLeft[0] + 'px';

			document.getElementById('movement').style.width = (bottomRight[0] - topLeft[0]) + 'px';
			document.getElementById('movement').style.height = (bottomRight[1] - topLeft[1]) + 'px';

			width_mvt = bottomRight[0] - topLeft[0]
			height_mvt = bottomRight[1] - topLeft[1]

			x_top_right = points_value.x + points_value.width
			y_bottom_right = points_value.y + points_value.height

			if ( (topLeft[0] >= points_value.x && topLeft[1] >= points_value.y 
					&& topLeft[0] <= x_top_right && topLeft[1] <= y_bottom_right)
				|| 
				(bottomRight[0] >= points_value.x && bottomRight[1] >= points_value.y
					&& bottomRight[0] <= x_top_right && bottomRight[1] <= y_bottom_right)) 
			{

				// var mouse_key = ["mouse_up", "mouse_down"]
				// for (var i = 0; i<mouse_key.length; i++){
				// 	if (key == mouse_key[i]) {

				// 	}
				// }

				socket.emit('click', key);
				socket.on('done', function(msg){
					movement_done = msg
					audio.play();
				})

				// if (movement_done == true){
				// 	console.log(true)
				// 	clearInterval(cycleTimer);
   				// 	setTimeout(render, 5000)
				// }

			}
		// }, 1000);
		}

		/*
		 * The main rendering loop.
		 *
		 * @return void.
		 *
		 */
		function main() {
			try{
				if (Object.keys(points_value).length === 0 && points_value.constructor === Object) {
					// console.log('vide')
				} else {
					render();
				}
			} catch(e) {
				console.log(e);
				return;
			}

			if(rendering == true) {
				var anim = new Konva.Animation(function() {}, layer)
				raf(main.bind(anim.start()))
			}
		}

	initialize();
};
