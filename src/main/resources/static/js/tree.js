var tree = new Tree('container');
$(document).ready(function() {
	$("#btnAdd").click(function() {
		$("#errParent").hide();
		var parentId = $('#parentNodeId').val();
		var nodeText = $('#nodeTextId').val();
		
		if(nodeText === '' && tree.isEmpty()){
			console.log('Node Text is required to start creating a Tree.');
			return;
		}
		if(!tree.isEmpty() && (parentId === '' || nodeText === '')){
			console.log('Node Text or Parent Id is missing.');
			return;
		}
		tree.createNode(parentId, {
			"text" : nodeText
		}, function(node) {
			if (!tree.isEmpty()) {
				$("#infoEmptyTree").hide();
				$("#parentNodeId").prop('disabled', false);
			}
			var data = JSON.stringify(node);
			$.ajax({
				type : "POST",
				url : "/tree/addNode",
				contentType : 'application/json',
				data : data,
				success : function(data) {
				},
				dataType : "json"
			});
		}, function() {
			console.log('Fail')
			$("#errParent").show();
		});
	});
	
	$("#btnRemove").click(function() {
		$("#errParent").hide();
		if (tree.isEmpty()) {
			console.log("Empty Tree.");
			return;
		}
		var parentId = $('#parentNodeId').val();
		var nodeText = $('#nodeTextId').val();
		tree.removeNode(parentId, function(node) {
			console.log("Node removal..");
			var data = JSON.stringify(node);
			$.ajax({
				type : "POST",
				url : "/tree/removeNode/"+parentId,
				contentType : 'application/json',
				data : data,
				success : function(data) {
				},
				dataType : "json"
			});
		},function(str) {
			console.log(str);
		});
	});
	
	$("#btnClear").click(function() {
		$("#errParent").hide();
		if (tree.isEmpty()) {
			console.log("Empty Tree.");
			return;
		}
		tree.removeAll(function() {
			console.log("Remove all Nodes.");
			$.ajax({
				type : "DELETE",
				url : "/tree/removeAll",
				contentType : 'application/json',
				success : function(data) {
				},
				dataType : "json"
			});
		});
	});

	$("#errParent").hide();

	if (tree.isEmpty()) {
		$("#infoEmptyTree").show();
		$("#parentNodeId").prop('disabled', true);
	}
	// load tree on DOM ready.
	$.ajax({
		type : "GET",
		url : "/tree/allNodes",
		contentType : 'application/json',
		success : function(data) {
			console.log("data from server: " + data);
			if (data) {
				tree.populatedata('#container', data);
				if (!tree.isEmpty()) {
					$("#infoEmptyTree").hide();
					$("#parentNodeId").prop('disabled', false);
				}
			}
		},
		dataType : "json"
	});

});