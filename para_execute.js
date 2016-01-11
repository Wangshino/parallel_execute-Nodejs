function runAll(taskList, paracount, completed) {
	var result = []
	var working_block = [],len = taskList.length
	function done() {
		if(result.length === len)
			completed(null, result)
		else
			working_block.forEach(function (element, index) {
				if(element.isUsed === 'Yes')
					working_block.splice(index, 1)
					runNext()
				})
	}

	function splic(taskList, paracount) {
		var i = 0
		while(i < paracount && taskList.length > 0){
			working_block[i] = { func : taskList.shift(), isUsed : 'No'}
			i++
		}
	}
	
	function runNext() {
		splic(taskList, paracount)
		working_block.forEach(function (element, index) {
				element.func(function (err, Result) {
					if(err)
						completed(err)
					else if(element.isUsed === 'No')
						result.push(Result)
						element.isUsed = 'Yes'
						done()
				})
		})
	}
	runNext()
}

function t1(callback) {
    setTimeout(function () {callback(null, 't1')}, 5000)
}

function t2(callback) {
    setTimeout(function () {callback(null, 't2')}, 1000)
}

function t3(callback) {
    setTimeout(function () {callback(null, 't3')}, 10)
}

runAll([t1, t2, t3], 2,function (err, result) {
    if (err)
        console.error('Errors', err)
    else
        console.log(result)
    // result should look like in this form [t1Result, t2Result, t3Result]
})