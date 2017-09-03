/*
 * A Tree is a widely used data structure that simulates a hierarchical tree
 * structure, with a root value and subtrees of children with a parent node.
 */
function Node(text, parent) {
	/* Generate Random number between 1 to 1000 */
	this.id = Math.floor((Math.random() * 1000) + 1);
	this.parentId;
	this.level;
	this.text = text;
	this.children = [];
}

function Tree(container) {
	this.root = null;
	this.container = container;
}

Tree.prototype.createNode = function(parentId, node, callbackSave,
		callbackFailure) {
	/* Generate Random number between 1 to 1000 */
	node.id = Math.floor((Math.random() * 1000) + 1);
	node.children = [];
	var parent = parentId ? this.findBFSWithId(parseInt(parentId)) : null;
	if (parent) {
		node.parentId = parent.id;
		node.level = parent.level + 1;
		parent.children.push(node);
		var parentDiv = $("#" + parent.id);
		var nodeText = levelSpaces(node.level) + node.text + " [ID:" + node.id
				+ "]";
		var item = $("<div>").attr("id", node.id).html(nodeText);
		parentDiv.append(item);
		// Make sure the callback is a function?
		if (callbackSave && typeof callbackSave === "function") {
			callbackSave(node);
		}
	} else {
		if (!this.root) {
			node.parentId = -1;
			node.level = 0;
			this.root = node;
			var list = $("#" + this.container);
			var nodeText = node.text + " [ID:" + node.id + "]";
			var item = $("<div>").attr("id", node.id).html(nodeText);
			list.append(item);
			// Make sure the callback is a function?
			if (callbackSave && typeof callbackSave === "function") {
				callbackSave(node);
			}
		} else {
			if (callbackFailure && typeof callbackFailure === "function") {
				callbackFailure('Parent Not Found and Root node is already assigned.')
			}
			return 'Parent Not Found and Root node is already assigned.';
		}
	}
};

Tree.prototype.add = function(text, toNodeData) {
	var node = new Node(text, toNodeData);
	var parent = toNodeData ? this.findBFS(toNodeData) : null;
	if (parent) {
		node.parentId = parent.id;
		node.level = parent.level + 1;
		parent.children.push(node);
		var parentDiv = $("#" + parent.id);
		var nodeText = levelSpaces(node.level) + node.text + " [ID:" + node.id
				+ "]";
		var item = $("<div>").attr("id", node.id).html(nodeText);
		parentDiv.append(item);
	} else {
		if (!this.root) {
			node.parentId = -1;
			node.level = 0;
			this.root = node;
			var nodeText = node.text + " [ID:" + node.id + "]";
			var item = $("<div>").attr("id", node.id).html(nodeText);
			list.append(item);
		} else {
			return 'Parent Not Found and Root node is already assigned.';
		}
	}
};

Tree.prototype.removeNode = function(id, callbackSave, callbackFailure) {
	if (this.root.id === id) {
		this.root = null;
		$("#" + this.container).html('');
	}
	var nodeToBeRemoved = id ? this.findBFSWithId(parseInt(id)) : null;
	if (nodeToBeRemoved == null) {
		if (callbackFailure && typeof callbackFailure === "function") {
			callbackFailure('Node to be removed not found.')
		}
		return;
	}
	var nodeToBeRemovedParent = nodeToBeRemoved.parentId ? this
			.findBFSWithId(parseInt(nodeToBeRemoved.parentId)) : null;

	if (nodeToBeRemoved && nodeToBeRemoved.children.length > 0) {
		for (x = 0; x < nodeToBeRemoved.children.length; x++) {
			nodeToBeRemoved.children[x].parentId = nodeToBeRemoved.parentId;
			if(nodeToBeRemoved.parentId == -1){
				nodeToBeRemoved.children[x].level = 0;	
			}else{
				nodeToBeRemoved.children[x].level = nodeToBeRemovedParent.level + 1;
			}
		}
	}
	var queue = this.getFlat();
	for (x = 0; x < queue.length; x++) {
		var node = queue[x];
		if (node.id === nodeToBeRemoved.id) {
			queue.splice(x, 1);
		}
	}
	$("#" + this.container).html('');
	this.populatedata("#" + this.container, queue);
	// Make sure the callback is a function?
	if (callbackSave && typeof callbackSave === "function") {
		callbackSave(nodeToBeRemoved);
	}
};

Tree.prototype.removeAll = function(callback) {
	this.root = null;
	$("#" + this.container).html('');
	if (callback && typeof callback === "function") {
		callback();
	}
};

Tree.prototype.remove = function(text) {
	if (this.root.text === text) {
		this.root = null;
	}

	var queue = [ this.root ];
	while (queue.length) {
		var node = queue.shift();
		for (var i = 0; i < node.children.length; i++) {
			if (node.children[i].text === text) {
				node.children.splice(i, 1);
			} else {
				queue.push(node.children[i]);
			}
		}
	}
};

Tree.prototype.contains = function(text) {
	return this.findBFS(text) ? true : false;
};

Tree.prototype.isEmpty = function() {
	var result = (this.root == null) ? true : false;
	return result;
};

Tree.prototype.findBFS = function(text) {
	var queue = [ this.root ];
	while (queue.length) {
		var node = queue.shift();
		if (node.text === text) {
			return node;
		}
		for (var i = 0; i < node.children.length; i++) {
			queue.push(node.children[i]);
		}
	}
	return null;
};

Tree.prototype.findBFSWithId = function(id) {
	if (!this.root) {
		return console.log('No root node found');
	}
	var queue = [ this.root ];
	while (queue.length) {
		var node = queue.shift();
		if (node.id === id) {
			return node;
		}
		for (var i = 0; i < node.children.length; i++) {
			queue.push(node.children[i]);
		}
	}
	return null;
};

Tree.prototype._preOrder = function(node, fn) {
	if (node) {
		if (fn) {
			fn(node);
		}
		for (var i = 0; i < node.children.length; i++) {
			this._preOrder(node.children[i], fn);
		}
	}
};
Tree.prototype._postOrder = function(node, fn) {
	if (node) {
		for (var i = 0; i < node.children.length; i++) {
			this._postOrder(node.children[i], fn);
		}
		if (fn) {
			fn(node);
		}
	}
};
Tree.prototype.traverseDFS = function(fn, method) {
	var current = this.root;
	if (method) {
		this['_' + method](current, fn);
	} else {
		this._preOrder(current, fn);
	}
};
Tree.prototype.traverseBFS = function(fn) {
	var queue = [ this.root ];
	while (queue.length) {
		var node = queue.shift();
		if (fn) {
			fn(node);
		}
		for (var i = 0; i < node.children.length; i++) {
			queue.push(node.children[i]);
		}
	}
};
Tree.prototype.print = function() {
	if (!this.root) {
		return console.log('No root node found');
	}
	var newline = new Node('|');
	var queue = [ this.root, newline ];
	var queue1 = new Array();
	var string = '';
	while (queue.length) {
		var node = queue.shift();
		string += node.text.toString() + ' ';
		queue1.push(node);
		if (node === newline && queue.length) {
			queue.push(newline);
		}
		for (var i = 0; i < node.children.length; i++) {
			queue.push(node.children[i]);
		}
	}
	console.log(string.slice(0, -2).trim());
};

Tree.prototype.getFlat = function() {
	if (!this.root) {
		return console.log('No root node found');
	}
	var queue = [ this.root ];
	var flatQueue = new Array();
	var string = '';
	while (queue.length) {
		var node = queue.shift();
		flatQueue.push(node);
		for (var i = 0; i < node.children.length; i++) {
			queue.push(node.children[i]);
		}
	}
	return flatQueue;
};

Tree.prototype.printByLevel = function() {
	if (!this.root) {
		return console.log('No root node found');
	}
	var newline = new Node('\n');
	var queue = [ this.root, newline ];
	var string = '';
	while (queue.length) {
		var node = queue.shift();
		string += node.text.toString() + (node.text !== '\n' ? ' ' : '');
		if (node === newline && queue.length) {
			queue.push(newline);
		}
		for (var i = 0; i < node.children.length; i++) {
			queue.push(node.children[i]);
		}
	}
	console.log(string.trim());
};

function checkChild(queue, parentId, parent) {
	$.each(queue, function(i, node) {
		if (node.parentId == parentId) {
			var nodeText = levelSpaces(node.level) + node.text + " [ID:"
					+ node.id + "]";
			var item = $("<div>").attr("id", node.id).html(nodeText);
			// var children = $('<div>');
			parent.append(item);
			// item.append(children);
			checkChild(queue, node.id, item);
		} else {
			return;
		}
	});
}

Tree.prototype.populatedata = function(el, data) {
	this.buildroot(data);
	// var queue = this.getFlat();
	var queue = data;
	$.each(queue, function(i, node) {
		if (node.parentId == -1) {
			var nodeText = node.text + " [ID:" + node.id + "]";
			var item = $("<div>").attr("id", node.id).html(nodeText);
			var list = $(el);
			list.append(item);
			var children = $('<div>');
			item.append(children);
			checkChild(queue, node.id, children);
		}
	});
};

Tree.prototype.buildroot = function(data) {
	// Keeps track of nodes using id as key, for fast lookup
	var idToNodeMap = data.reduce(function(map, node) {
		var jsNode = new Node(node.text, node.parentId);
		jsNode.id = node.id;
		jsNode.parentId = node.parentId;
		jsNode.text = node.text;
		jsNode.level = node.level;
		jsNode.children = [];
		map[jsNode.id] = jsNode;
		return map;
	}, {});

	var myRoot = null;
	var queue = data;
	for (i = 0; i < queue.length; i++) {
		var node = queue[i];
		if (node.parentId === -1) {
			myRoot = idToNodeMap[node.id];
		} else {
			parentNode = idToNodeMap[node.parentId];
			var childNode = idToNodeMap[node.id];
			parentNode.children.push(childNode);
		}

	}
	this.root = myRoot;
	console.log(myRoot);
};

function levelSpaces(level) {
	var space = "--";
	for (var i = 0; i < level; i++) {
		space += "--";
	}
	return space;
}