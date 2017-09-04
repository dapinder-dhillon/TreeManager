/**
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

/**
 * Creating a node for the tree and making changes to the DOM. The method is
 * generic and providing callbacks to the caller to act further when the node is
 * added in the tree. if it's unclear from the name, callback is presumed to be
 * a function, which will be called later by the caller. The caller can do any
 * operation e.g. persist in the database etc. It is having failure callback too
 * to intimate all failures and allows caller to take action too.
 * 
 * It is not painting the entire DOM again rather modifying/adding DOM which is
 * necessary.
 */
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

/**
 * Creating a node for the tree but not making changes to the DOM. Caller can
 * use this method when no DOM manipulation is required.
 */
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

/**
 * Removing the node from the Tree and making changes to the DOM as well. Due to
 * time constraint, the method is supposed to make change to the removed/parent
 * DOM element rather it is painting the entire DOM here. This is a TODO and
 * shall be fixed in further revisions.
 */
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

/**
 * Removing all nodes from the Tree and making changes to the DOM as well.
 */
Tree.prototype.removeAll = function(callback) {
	this.root = null;
	$("#" + this.container).html('');
	if (callback && typeof callback === "function") {
		callback();
	}
};

/**
 * Removing the node from the Tree and NOT making changes to the DOM as well.
 */
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

/** The method that will allow us to search for a particular value in our tree */
Tree.prototype.contains = function(text) {
	return this.findBFS(text) ? true : false;
};

/** The method that will allow us to check whether Tree is empty or not. */
Tree.prototype.isEmpty = function() {
	var result = (this.root == null) ? true : false;
	return result;
};

/**
 * This method finds a node in the tree using node text with breadth-first
 * search to traverse a tree
 */
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

/**
 * This method finds a node in the tree using node ID with breadth-first search
 * to traverse a tree
 */
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

/** This method traverses a tree with depth-first search to traverse a tree. */
Tree.prototype.traverseDFS = function(fn, method) {
	var current = this.root;
	if (method) {
		this['_' + method](current, fn);
	} else {
		this._preOrder(current, fn);
	}
};

/** This method traverses a tree with breadth-first search to traverse a tree. */
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

/** Print the tree on the console. */
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

/** Returning the Flat object from Hierarchical Tree Strcuture. */
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

/** Print the tree By Level on the console. */
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

/**
 * Draws Tree in hierarchical display on the given Element ID. It traverses the
 * tree in a recursive fashion and draw the tree. It uses simple '--' hyphen to
 * represent Parent-Child relationship. Further enhancement can be done to make
 * use of CSS to draw a much better responsive UI.
 */
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

/**
 * Method responsible for building the hierarchical Tree structure from a simple
 * flat JSON/Object expected by treeManager. The algorithm works as follows:
 * <ul>
 * <li>Create a map that maps id's to nodes. This will make it easy to look up
 * nodes. Since we have arbitrary order, we need to initialize idToNodeMap first</li>
 * <li>Loop through the array of nodes</li>
 * <li>For each element:</li>
 * <ul>
 * <li>Does the element have a parent? If not it must be the root, so assign
 * the this element to the root of the tree.</li>
 * <li>This element has a parent, so look up the parent node, and then add this
 * current node as a child of the parent node (add it to the children array).</li>
 * </ul>
 * <li></li>
 * </ul>
 */
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